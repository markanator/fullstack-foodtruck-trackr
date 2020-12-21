const db = require("../data/config");

const find = (truck_id, user_id) => {
  return db("user_trucks_favorites").where({ truck_id, user_id }).first();
};
const findAllByUserId = (user_id) => {
  return db("user_trucks_favorites").where({ user_id });
};
const insert = async (truck_id, user_id) => {
  await db("user_trucks_favorites")
    .insert({ truck_id, user_id })
    .returning("*");
};

const remove = (truck_id, user_id) => {
  return db("user_trucks_favorites").delete().where({ truck_id, user_id });
};

module.exports = {
  insert,
  findAllByUserId,
  find,
  remove,
};
