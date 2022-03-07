const chatroomSchema = require("../models/chatRoom");
const chatMessageSchema = require("../models/chatMessage");
const Users = require("../Models/newUserModel");
const mailer = require("../Dependencies/mailer");
const mongoose = require("mongoose");

exports.createChatRoom = async (req, res) => {
  try {
    const subAdmin = await Users.findOne({ email: req.body.subAdminEmail });
    const newchatroom = new chatroomSchema({
      roomName: req.body.roomName,
      adminroom: req.userId,
      subAdmin: subAdmin?._id || null,
      assistant: [],
    });
    const createroom = await newchatroom.save();
    await mailer(req.body.subAdminEmail, "Invitation", "you got invitation to chat room");
    res.status(201).json(createroom);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getChatRoom = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.userId);
  try {
    const chatroom = await chatroomSchema.aggregate([
      {
        $match: {
          $or: [{ adminroom: userId }, { subAdmin: userId }, { assistant: userId }],
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
    res.status(201).json(chatroom);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateChatRoom = async (req, res) => {
  try {
    const assistant = await Users.findOne({ email: req.body.assistantEmail });
    if (!assistant) throw "assistant not exist";
    const chatroom = await chatroomSchema.findById(req.body.roomId);
    if (!chatroom) throw "conversation not found";
    if (chatroom.assistant.length >= 2) throw "You can't add more assistant";
    if (chatroom.assistant.includes(assistant._id)) {
      chatroom.assistant.pull(assistant._id);
      await chatroom.save();
      return res.status(200).json("assistant removed froom this room");
    }
    chatroom.assistant.push(assistant._id);
    await chatroom.save();
    return res.status(200).json("assistant add to this room");
  } catch (error) {
    res.status(400).json(error || "error");
  }
};

exports.deleteChatRoom = async (req, res, next) => {
  const roomId = req.params.roomId;
  try {
    const room = await chatroomSchema.findById(roomId);
    if (!room) throw "room not found";
    if (room.adminroom.toString() !== req.userId) throw "request not authorized";
    await chatroomSchema.deleteOne({ _id: roomId });
    await chatMessageSchema.deleteMany({ roomId: roomId });
    res.status(200).json("room deleted");
  } catch (error) {
    res.status(400).json({ error });
  }
};
