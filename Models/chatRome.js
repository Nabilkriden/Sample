const mongoose = require("mongoose");

const chatRomeSchema = mongoose.Schema(
  {
    romName: String,
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
module.exports = mongoose.model("chatRome", chatRomeSchema);
