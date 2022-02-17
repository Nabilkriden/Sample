const mongoose = require("mongoose");

var validateEmail = (email) => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

let newUserSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
  },
  password: {
    type: String,
    required: "Password is required",
    minlength: [8, "Password must be at least 8 characters"],
    maxlength: [100, "Password is not allowed to exceed 100 characters"],
  },
  role: {
    type: String,
    required: "Role is required",
  },
  code: {
    type: String,
  },
});

module.exports = mongoose.model("users", newUserSchema);
