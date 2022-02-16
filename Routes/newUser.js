const express = require("express");
const router = express.Router();
const { verifySuperAdminToken } = require("../Dependencies/authorization");

// Add User
const newUserController = require("../Controllers/addUserController");
router.post("/", verifySuperAdminToken, newUserController);
module.exports = router;
