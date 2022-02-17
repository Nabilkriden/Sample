const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let decodedToken = jwt.verify(token, process.env.TOKEN);
    let userId = decodedToken.userId;
    let userRole = decodedToken.role;

    req.userId = userId;
    req.userRole = userRole;
    next();
  } catch (error) {
    res.status(403).json({
      error: error | "request not authentication !",
      msg: "request not authentication",
    });
  }
};
