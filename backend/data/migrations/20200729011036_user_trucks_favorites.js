exports.up = function (knex) {
  return knex.schema.createTable("user_trucks_favorites", (tbl) => {
    tbl
      .integer("truck_id")
      .references("id")
      .inTable("trucks")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user_trucks_favorites");
};
