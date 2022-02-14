const express = require("express");
const router = express.Router();

// Login
const login = require("../Controllers/loginController");
router.post("/", login.login);
// Submite Code
router.post("/verif", login.codeVerif);

module.exports = router;
