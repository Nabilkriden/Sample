const Users = require("../Models/newUserModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Login

module.exports = login = async (req, res, next) => {
  // Data
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await Users.findOne({ email: email });
    if (!user) {
      res.status(400).send("Email or password is incorrect.");
    }
    if (user) {
      const validPasswords = await bcrypt.compare(password, user.password);
      if (!validPasswords) {
        res.status(400).send("Email or password is incorrect.");
      }
      if (validPasswords) {
        const JWT_KEY = process.env.JWT_KEY;
        const token = jwt.sign(
          { useId: user._id, userName: user.name },
          JWT_KEY
        );
        res
          .status(200)
          .send({ result: "User loged in", user: user, token: token });
      }
    }
  } catch (err) {
    return res.status(500).send(err);
  }
  next();
};
