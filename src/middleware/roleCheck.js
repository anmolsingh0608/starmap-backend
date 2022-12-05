const roleCheck = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(401).json({ error: "Invalid request" });
  }
};

module.exports = roleCheck;
