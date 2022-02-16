var jwt = require("jsonwebtoken");
require("dotenv").config();

//Super Admin
exports.verifySuperAdminToken = async (req, res, next) => {
  try {
    var token = req.headers.authorization;
    if (!token) res.status(400).send({ result: "access denied !!!" });
    const user = jwt.decode(token, { comlete: true });
    const userRole = user.role;
    const JWT_KEY = process.env.JWT_KEY;
    if (token && userRole == "super_admin") {
      try {
        jwt.verify(token, JWT_KEY);
        next();
      } catch (err) {
        res.send({ error: err.message }).status(500);
      }
    } else return res.status(400).send({ result: "access denied !!!" });
  } catch {
    return res.status(403).send({ result: "access denied !!!" });
  }
};

// Admin
exports.verifyAdminToken = async (req, res, next) => {
  try {
    var token = req.headers.authorization;
    if (!token) res.status(400).send({ result: "access denied !!!" });
    const user = jwt.decode(token, { comlete: true });
    const userRole = user.role;
    const JWT_KEY = process.env.JWT_KEY;
    if (token && userRole == "admin") {
      try {
        jwt.verify(token, JWT_KEY);
        next();
      } catch (err) {
        res.send({ error: err.message }).status(500);
      }
    } else return res.status(400).send({ result: "access denied !!!" });
  } catch {
    return res.status(403).send({ result: "access denied !!!" });
  }
};

// assistant
exports.verifyAssistantToken = async (req, res, next) => {
  try {
    var token = req.headers.authorization;
    if (!token) res.status(400).send({ result: "access denied !!!" });
    const user = jwt.decode(token, { comlete: true });
    const userRole = user.role;
    const JWT_KEY = process.env.JWT_KEY;
    if (token && userRole == "assistant") {
      try {
        jwt.verify(token, JWT_KEY);
        next();
      } catch (err) {
        res.send({ error: err.message }).status(500);
      }
    } else return res.status(400).send({ result: "access denied !!!" });
  } catch {
    return res.status(403).send({ result: "access denied !!!" });
  }
};
