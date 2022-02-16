const Users = require("../Models/newUserModel");
const bcrypt = require("bcrypt");
const codeGen = require("../Dependencies/codeGenerator");
const mailer = require("../Dependencies/mailer");

// Add New User

module.exports = addUser = async (req, res, next) => {
  // hash Pass
  const passwordGen = codeGen("Char", 12);
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(passwordGen, salt);

  //  User Data
  const email = req.body.email;
  const password = hashPassword;
  const role = req.body.role;
  // send password
  try {
    await mailer(
      email,
      "Your Password",
      `This is your password <br/> ${passwordGen}`
    );
  } catch (e) {
    res.status(500).send({ error: e });
  }

  //  Create User
  try {
    const newUser = await Users.create({
      email: email,
      password: password,
      role: role,
    });
    if (newUser) {
      res
        .send({ result: "user is invited successfully", newUser: newUser })
        .status(200);
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
  next();
};
