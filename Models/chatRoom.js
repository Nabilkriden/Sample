const mongoose = require("mongoose");

const chatRoomSchema = mongoose.Schema(
  {
    roomName: {
      type: String,
      unique: true,
    },
    adminroom: {
      type: mongoose.Schema.Types.ObjectId,
    },
    subAdmin: {
      type: mongoose.Schema.Types.ObjectId,
    },
    assistant: {
      type: [mongoose.Schema.Types.ObjectId],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("chatroom", chatRoomSchema);
