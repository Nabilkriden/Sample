module.exports = (permission) => {
  return (req, res, next) => {
    const userRole = req.userRole;
    if (!permission.includes(userRole)) return res.status(403).json({ msg: "You don't have permission" });
    next();
  };
};
