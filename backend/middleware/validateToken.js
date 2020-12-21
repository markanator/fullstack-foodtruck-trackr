const jwt = require("jsonwebtoken");
const User = require("../models/User");

const validateToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    jwt.verify(authorization, process.env.SECRET_JWT, async function (
      err,
      decoded
    ) {
      if (err) {
        return res.status(403).json({ error: "Not Authorized - No token" });
      }
      const user = await User.findById(decoded.id);
      if (!user)
        return res.status(400).json({ error: "User no longer exists" });
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ error: "Server malfunctioning" });
  }
};

module.exports = validateToken;
