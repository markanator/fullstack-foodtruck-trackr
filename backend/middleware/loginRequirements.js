const User = require("../models/User");
const bcrypt = require("bcrypt");

const loginRequirements = async (req, res, next) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).json({ error: "Missing email or password" });

  const user = await User.findByEmail(req.body.email);
  if (!user) return res.status(401).json({ error: "No user with this email" });
  req.user = user;
  const result = bcrypt.compare(req.body.password, user.password);
  if (!result)
    return res.status(401).json({ error: "Wrong email or password" });
  next();
};
module.exports = loginRequirements;
