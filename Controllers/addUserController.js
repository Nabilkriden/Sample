const Users = require("../Models/newUserModel");
const bcrypt = require("bcrypt");

// Add New User

module.exports = addUser = async (req, res, next) => {
  // hash Pass

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //  User Data
  const name = req.body.name;
  const email = req.body.email;
  const password = hashPassword;
  //  Create User
  try {
    const newUser = await Users.create({
      name: name,
      email: email,
      password: password,
    });
    if (newUser) {
      res
        .send({ result: "user is added successfully", newUser: newUser })
        .status(200);
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
  next();
};
