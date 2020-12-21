exports.up = function (knex) {
  return knex.schema.createTable("menu_item", (tbl) => {
    tbl.increments("id");
    tbl.string("item_name").notNullable();
    tbl.string("item_description");
    tbl.string("item_photo");
    tbl.float("item_price");
    tbl
      .integer("truck_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("trucks")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("menu_item");
};
