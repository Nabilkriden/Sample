const chatRomeSchema = require("../models/chatRome");
const userSchema = require("../models/newUserModel");

exports.createChatRome = async (req, res) => {
  if (req.userRole !== "admin") return res.status(400).json({ message: "You need to be admin" });
  try {
    const subAdmin = await userSchema.findOne({ email: req.body.subAdminEmail });
    if (!subAdmin) throw "wrong Email";
    const newchatRome = new chatRomeSchema({
      romName: req.body.romName,
      adminRome: req.userId,
      subAdmin: subAdmin?.email || "",
      assistent: [req.body.subAdmin] || [],
    });
    const createRome = await newchatRome.save();
    res.status(201).json(createRome);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getChatRome = async (req, res) => {
  try {
    const chatRome = await chatRomeSchema.aggregate([
      {
        $match: {
          $or: [{ adminRome: req.userId }, { subAdmin: req.userId }, { assistent: req.userId }],
        },
      },
      {
        $project: {
          password: 0,
          __v: 0,
          role,
          code,
        },
      },
    ]);
    res.status(201).json(chatRome);
  } catch (error) {
    res.status(500).json(error);
  }
};
