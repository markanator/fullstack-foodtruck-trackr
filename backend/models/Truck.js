const db = require("../data/config");
const knexPostgis = require('knex-postgis')

knexPostgis(db);
const st = db.postgis;

const insert = async (truckData,{lat,lng}) => {
  const [truck_id] = await db("trucks").insert(
    {
      ...truckData,
      coordinates: st.setSRID(st.makePoint(lng,lat),4326),
    }
  )
  .returning("id");
  return findById(truck_id);
};

const findById = (id) => {
  return db("trucks")
    .select(
      "id",
      "name",
      "slug",
      "hero_image",
      "description",
      "cuisine_type",
      "price_range",
      "address",
      "arrival_time",
      "departure_time",
      "operator_id",
      st.x("coordinates").as("longitude"),
      st.y("coordinates").as("latitude"))
    .where({ id })
    .first();
    // .join("truck_locations as tl", "tl.truck_id", "=", "t.id")
};

const fetchAll = () => {
  return db("trucks as t")
  .select(
    "id",
    "name",
    "slug",
    "hero_image",
    "description",
    "cuisine_type",
    "price_range",
    "address",
    "arrival_time",
    "departure_time",
    "operator_id",
    st.x("coordinates").as("longitude"),
    st.y("coordinates").as("latitude"))
    .limit(9);
}

const remove = (id) => {
  return db("trucks").delete().where({ id });
};

const update = async (id, truckData, {lng, lat}) => {
  await db("trucks").update({...truckData,
    coordinates: st.setSRID(st.makePoint(lng,lat),4326),
  }).where({ id });

  return findById(id);
};


const find = (params) => {
  const query = db("trucks as t");

  if (params.isOpen === "true") {
    const date = new Date();
    const minutes = date.getHours() * 60 + date.getMinutes();
    query
      .where("t.arrival_time", "<", minutes)
      .andWhere("t.departure_time", ">", minutes);
  }
  if (params.operatorId) {
    console.log("TRUCK owner RUNNING");
    query.where("t.operator_id", + params.operatorId);
  }
  return query;
};


module.exports = {
  findById,
  find,
  update,
  insert,
  remove,
  fetchAll
}
