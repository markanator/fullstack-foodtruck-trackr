exports.up = function (knex) {
  return knex.schema.createTable("trucks", (tbl) => {
    tbl.increments("id");
    tbl.string("name").notNullable();
    tbl.string("slug").notNullable();
    tbl.string("cuisine_type");
    tbl.text("description");
    tbl.string("hero_image");
    tbl.string("price_range");
    tbl.datetime("created_at").notNullable().defaultTo(knex.fn.now());
    tbl.string("address");
    tbl.string("phone");
    tbl.integer("views").defaultTo(0);
    tbl.datetime("arrival_time");
    tbl.datetime("departure_time");
    //! FIRST: CREATE EXTENSION postgis;
    // geolocation storing
    tbl.specificType("coordinates", "geometry(point, 4326)");

    // linked operator
    tbl
      .integer("operator_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .notNullable()
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("trucks");
};
