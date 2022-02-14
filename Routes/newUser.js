const express = require("express");
const router = express.Router();

// Add User
const newUserController = require("../Controllers/addUserController");
router.post("/", newUserController);
module.exports = router;
