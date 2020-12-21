const User = require("../models/User");

const editUserRequirements = async (req, res, next) => {
  try {
    if (req.body.username) {
      const user = await User.findByUsername(req.body.username);
      if (user && user.id !== req.user.id)
        return res
          .status(400)
          .json({ error: "User with that username already exist" });
    }
    if (req.body.email) {
      const email = await User.findByEmail(req.body.email);
      if (email && email.id !== req.user.id)
        return res
          .status(400)
          .json({ error: "User with that email already exist" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server malfunctioning" });
  }
};

module.exports = editUserRequirements;
