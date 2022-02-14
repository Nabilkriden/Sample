const Users = require("../Models/newUserModel");
const codeGen = require("../Dependencies/codeGenerator");

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
        const code = codeGen("Num", 8);
        try {
          const addCode = await Users.findOneAndUpdate(
            { email: email },
            { code: code }
          );
          if (addCode) {
            res.status(200).send({
              result: "Code added successfully",
              code: code,
            });
          }
        } catch (err) {
          return res.status(500).send(err);
        }
        // const JWT_KEY = process.env.JWT_KEY;
        // const token = jwt.sign(
        //   { useId: user._id, userName: user.name },
        //   JWT_KEY
        // );
        // res
        //   .status(200)
        //   .send({ result: "User loged in", user: user, token: token });
      }
    }
  } catch (err) {
    return res.status(500).send(err);
  }
  next();
};
