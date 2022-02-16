var jwt = require("jsonwebtoken");
require("dotenv").config();

//login validation
exports.verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  const JWT_KEY = process.env.JWT_KEY;
  if (token) {
    try {
      jwt.verify(token, JWT_KEY);
      next();
    } catch {
      return res.status(403).send({ result: "access denied !!!" });
    }
  } else res.status(400).send({ result: "access denied !!!" });
};

//Super Admin
exports.verifySuperAdminToken = async (req, res, next) => {
  const token = req.headers.authorization;
  const JWT_KEY = process.env.JWT_KEY;
  if (token) {
    const user = jwt.decode(token, { comlete: true });
    const userRole = user.role;
    if (userRole === "super_admin") {
      try {
        jwt.verify(token, JWT_KEY);
        next();
      } catch (err) {
        return res.status(403).send({ result: "access denied !!!" });
      }
    } else return res.status(400).send({ result: "access denied !!!" });
  } else return res.status(400).send({ result: "access denied !!!" });
};

// Admin
exports.verifyAdminToken = async (req, res, next) => {
  const token = req.headers.authorization;
  const JWT_KEY = process.env.JWT_KEY;
  if (token) {
    const user = jwt.decode(token, { comlete: true });
    const userRole = user.role;
    if (userRole === "admin") {
      try {
        jwt.verify(token, JWT_KEY);
        next();
      } catch (err) {
        return res.status(403).send({ result: "access denied !!!" });
      }
    } else return res.status(400).send({ result: "access denied !!!" });
  } else return res.status(400).send({ result: "access denied !!!" });
};

// assistant
exports.verifyAssistantToken = async (req, res, next) => {
  const token = req.headers.authorization;
  const JWT_KEY = process.env.JWT_KEY;
  if (token) {
    const user = jwt.decode(token, { comlete: true });
    const userRole = user.role;
    if (userRole === "assistant") {
      try {
        jwt.verify(token, JWT_KEY);
        next();
      } catch (err) {
        return res.status(403).send({ result: "access denied !!!" });
      }
    } else return res.status(400).send({ result: "access denied !!!" });
  } else return res.status(400).send({ result: "access denied !!!" });
};
