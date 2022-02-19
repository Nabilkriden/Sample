const chatRomeSchema = require("../models/chatRoom");
const chatMessageSchema = require("../models/chatMessage");
const Users = require("../Models/newUserModel");
const mailer = require("../Dependencies/mailer");
const mongoose = require("mongoose");

exports.createChatRoom = async (req, res) => {
  try {
    const subAdmin = await Users.findOne({ email: req.body.subAdminEmail });
    if (!subAdmin) throw "wrong Email";
    const newchatRome = new chatRomeSchema({
      romName: req.body.romName,
      adminRome: req.userId,
      subAdmin: subAdmin?._id || "",
      assistent: [],
    });
    const createRome = await newchatRome.save();
    mailer(req.body.subAdminEmail, "Invitation", "you got invitation to chat room");
    res.status(201).json(createRome);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getChatRoom = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.userId);
  try {
    const chatRome = await chatRomeSchema.aggregate([
      {
        $match: {
          $or: [{ adminRome: userId }, { subAdmin: userId }, { assistent: userId }],
        },
      },
      {
        $project: {
          password: 0,
          __v: 0,
          role: 0,
          code: 0,
        },
      },
    ]);
    res.status(201).json(chatRome);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateChatRoom = async (req, res) => {
  try {
    const assistent = await Users.findOne({ email: req.body.assistentEmail });
    if (!assistent) throw "assistent not exist";
    const chatRome = await chatRomeSchema.findById(req.body.roomId);
    if (!chatRome) throw "conversation not found";
    if (chatRome.assistent.length >= 2) throw "You can't add more assistent";
    if (chatRome.assistent.includes(assistent._id)) {
      chatRome.assistent.pull(assistent._id);
      await chatRome.save();
      return res.status(200).json("assistent removed from this room");
    }
    chatRome.assistent.push(assistent._id);
    await chatRome.save();
    return res.status(200).json("assistent add to this room");
  } catch (error) {
    res.status(400).json(error || "error");
  }
};

exports.deleteChatRoom = async (req, res, next) => {
  const roomId = req.params.roomId;
  try {
    const room = await chatRomeSchema.findById(roomId);
    if (!room) throw "room not found";
    if (room.adminRome.toString() !== req.userId) throw "request not authorized";
    await chatRomeSchema.deleteOne({ _id: roomId });
    await chatMessageSchema.deleteMany({ roomId: roomId });
    res.status(200).json("room deleted");
  } catch (error) {
    res.status(400).json({ error });
  }
};
