const jwt = require("jsonwebtoken");
const User = require("../models/User");

const validateToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const tokenFromClient = authorization?.split("Bearer ")[1];
    if (!authorization || !tokenFromClient) {
      return res.status(401).json({ error: "Not Authorized - No token" });
    }
    jwt.verify(tokenFromClient, process.env.SECRET_JWT, undefined, async function (err, decoded) {
      if (err) {
        return res.status(401).json({ error: "Not Authorized - No token" });
      }
      console.log({ decoded });
      const user = await User.findById(decoded.sub);
      if (!user) return res.status(404).json({ error: "User no longer exists" });
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ error: "Server malfunctioning" });
  }
};

module.exports = validateToken;
