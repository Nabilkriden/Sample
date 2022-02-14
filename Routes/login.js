const express = require("express");
const router = express.Router();

// Login
const loginController = require("../Controllers/loginController");
router.post("/", loginController);

module.exports = router;
