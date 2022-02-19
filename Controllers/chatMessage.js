const chatMessageSchema = require("../models/chatMessage");
const chatRoomSchema = require("../models/chatRoom");
const Users = require("../Models/newUserModel");

exports.createChatMessage = async (req, res) => {
  try {
    const room = await chatRoomSchema.findById(req.body.roomId);
    if (!room) throw "conversation not found";
    Users.findById(req.userId).then((user) => {
      const newMessage = new chatMessageSchema({
        roomId: req.body.roomId,
        sender: req.userId,
        msg: req.body.msg,
        senderName: user.userName || "guest",
        senderImage: user.userImage || "",
      });
      newMessage
        .save()
        .then((msg) => {
          res.status(201).json({ msg, message: "Message created" });
        })
        .catch((err) => res.status(400).json({ err }));
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getChatMessage = async (req, res) => {
  try {
    const message = await chatMessageSchema.find({ roomId: req.params.roomId });
    if (!message) throw "conversation not found";
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error });
  }
};
