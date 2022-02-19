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
    },
    senderImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("Messages", chatMessageSchema);
