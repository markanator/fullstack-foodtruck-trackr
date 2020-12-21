const db = require("../data/config");

const findById = (id) => {
  return db("menu_item").where({ id }).first();
};

const findAllByTruckId = (truck_id) => {
  return db("menu_item").where({ truck_id });
};

const insert = async (food) => {
  const [id] = await db("menu_item").insert(food).returning("id");
  return findById(id);
};
const update = async (food, id) => {
  await db("menu_item").update(food).where({ id });
  return findById(id);
};

const remove = (id) => {
  return db("menu_item").delete().where({ id });
};

module.exports = {
  findById,
  findAllByTruckId,
  insert,
  update,
  remove,
};
