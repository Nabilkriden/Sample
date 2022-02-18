const chatMessageSchema = require("../models/chatMessage");
const userSchema = require("../models/newUserModel");
const chatRoomSchema = require("../models/chatRoom");

exports.createChatMessage = async (req, res) => {
  try {
    const room = await chatRoomSchema.findById(req.body.roomId);
    !room && res.status(400).json("conversation not found");
    room &&
      userSchema.findById(req.userId).then((user) => {
        const newMessage = new chatMessageSchema({
          roomId: req.body.roomId,
          sender: req.userId,
          msg: req.body.msg,
          senderName: `${user.userFirstName} ${user.userLastName}` || "guest",
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
    res.status(500).json({ error });
  }
};

exports.getChatMessage = async (req, res) => {
  try {
    const message = await chatMessageSchema.find({ roomId: req.params.roomId });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ err });
  }
};
