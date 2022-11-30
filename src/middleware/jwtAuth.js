const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    if (token === null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json(err);

      req.user = user;

      next();
    });
  } else {
    res.status(401).json({ error: "Invalid request" });
  }
};

module.exports = auth;
