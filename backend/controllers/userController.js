const User = require("../models/User");
const addFavoritesAndOwned = require("../utils/addFavoritesAndOwned");
const createToken = require("../utils/createToken");
// const addTruckRatings = require("../utils/addTruckRatings");
// const addMenuItems = require("../utils/addMenuItems");

const registerUser = async (req, res) => {
  try {
    const user = await User.insert(req.body);
    const token = await createToken(user);
    delete user.password;
    // await addFavoritesAndOwned(user);
    return res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server is malfunctioning" });
  }
};

const loginUser = async (req, res) => {
  try {
    const token = await createToken(req.user);
    delete req.user.password;
    // await addFavoritesAndOwned(req.user);
    return res.status(200).json({ user: req.user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server is malfunctioning" });
  }
};

const getUser = async (req, res) => {
  delete req.user.password;
  await addFavoritesAndOwned(req.user);
  return res.status(200).json(req.user);
};

const editUser = async (req, res) => {
  try {
    const edit = {
      username: req.body.username || req.user.username,
      email: req.body.email || req.user.email,
      first_name: req.body.first_name || req.user.first_name,
      last_name: req.body.last_name || req.user.last_name,
      avatar_url: req.body.avatar_url || req.user.avatar_url,
    };
    const user = await User.update(edit, req.user.id);
    delete user.password;
    await addFavoritesAndOwned(user);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server is malfunctioning" });
  }
};
const deleteUser = async (req, res) => {
  try {
    await User.remove(req.user.id);
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server is malfunctioning" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  editUser,
  deleteUser,
};
