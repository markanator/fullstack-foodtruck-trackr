const db = require("../data/config");

const find = (user_id, truck_id) => {
  return db("truck_ratings").where({ user_id, truck_id }).first();
};

const findByTruckId = (truck_id) => {
  return db("truck_ratings").where({ truck_id });
};

const insert = (user_id, truck_id, rating) => {
  return db("truck_ratings")
    .insert({ user_id, truck_id, rating })
    .returning("*");
};

const update = async (user_id, truck_id, rating) => {
  return db("truck_ratings").update({ rating }).where({ user_id, truck_id });
};

module.exports = {
  find,
  findByTruckId,
  insert,
  update,
};
