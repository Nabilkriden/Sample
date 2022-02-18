const mongoose = require("mongoose");

const chatMessageSchema = mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chatRome",
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    msg: {
      type: String,
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    senderImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("Messages", chatMessageSchema);
