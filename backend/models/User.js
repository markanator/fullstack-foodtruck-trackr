const db = require("../data/config");

const findById = (id) => {
  console.log({ id });
  return db("users").where({ id }).first();
};

const findByEmail = (email) => {
  return db("users").where({ email }).first();
};
const findByUsername = (username) => {
  return db("users").where({ username }).first();
};

const insert = async (user) => {
  try {
    const [{ id }] = await db("users").insert(user).returning("id");
    console.log("RESSS", id);
    return findById(id);
  } catch (error) {
    console.log(error);
  }
};

const update = async (user, id) => {
  await db("users").update(user).where({ id }).select("*");
  return findById(id);
};

const remove = (id) => {
  return db("users").delete().where({ id });
};

module.exports = {
  findById,
  findByEmail,
  findByUsername,
  insert,
  update,
  remove,
};
