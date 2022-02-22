const mongoose = require("mongoose");

const chatRoomSchema = mongoose.Schema(
  {
    romName: {
      type: String,
      unique: true,
    },
    adminRome: {
      type: mongoose.Schema.Types.ObjectId,
    },
    subAdmin: {
      type: mongoose.Schema.Types.ObjectId,
    },
    assistent: {
      type: [mongoose.Schema.Types.ObjectId],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("chatRome", chatRoomSchema);
