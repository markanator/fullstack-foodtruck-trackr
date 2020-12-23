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
    "trucks.id",
    "trucks.name",
    "trucks.slug",
    "trucks.hero_image",
    "trucks.description",
    "trucks.cuisine_type",
    "trucks.price_range",
    "trucks.address",
    "trucks.phone",
    "trucks.views",
    "trucks.arrival_time",
    "trucks.departure_time",
    "trucks.operator_id",
    "users.email as operator_email",
    "users.first_name as operator_first_name",
    "users.last_name as operator_last_name",
    "users.avatar_url as operator_image",
    st.x("trucks.coordinates").as("longitude"),
    st.y("trucks.coordinates").as("latitude"))
    .leftJoin("users", "trucks.operator_id", "users.id" )
    .where( "trucks.id", "=", id )
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
    "views",
    "arrival_time",
    "departure_time",
    "operator_id",
    st.x("coordinates").as("longitude"),
    st.y("coordinates").as("latitude"))
    .orderBy("id", "asc")
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

const addPagevisited = async (truckID) => {
  const truck = await findById(truckID);
  await db("trucks").update({views: truck.views + 1}).where({id: truckID});

  return true;
}

const find = async (params) => {
  const query = db("trucks as t");

  if (params.operatorId) {
    console.log("RUNNING");
    query.where("t.operator_id","=", params.operatorId);
  }

  return query;
}

const SearchByQuery = (searchQ) => {
  console.log("ATTEMPTING SEARCH");
  const query = db("trucks as t").select(
    "id",
    "name",
    "slug",
    "hero_image",
    "description",
    "cuisine_type",
    "price_range",
    "address",
    "views",
    "arrival_time",
    "departure_time",
    "operator_id",
    st.x("coordinates").as("longitude"),
    st.y("coordinates").as("latitude"));

    if (searchQ.category) {
      console.log("🔎 SEARCH FOR:::", searchQ.category);
      query.where("t.cuisine_type","=", searchQ.category)
    }

    if (searchQ.sort && searchQ.sortType) {
      console.log("🔎 SORTED:::", searchQ.sort, searchQ.sortType);
      let searchParam;
      switch(searchQ.sort){
        case "name":
          searchParam = "name"
          break;
        case "id":
          searchParam = "id"
          break;
        default:
          searchParam = "name";
          break
      }
      query.orderBy(`t.${searchParam}`,`${searchQ.sortType}`)
    }

  return query;
};


module.exports = {
  findById,
  SearchByQuery,
  update,
  insert,
  remove,
  fetchAll,
  find,
  addPagevisited,
}
