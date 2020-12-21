exports.up = function (knex) {
  return knex.schema.createTable("truck_ratings", (tbl) => {
    tbl.float("rating").notNullable();
    tbl
      .integer("truck_id")
      .unsigned()
      .references("id")
      .inTable("trucks")
      .notNullable()
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .notNullable()
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("truck_ratings");
};
