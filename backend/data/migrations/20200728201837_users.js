exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments("id");
    tbl.string("email").unique().notNullable();
    tbl.string("username").unique().notNullable();
    tbl.string("password").notNullable();
    tbl.string("first_name");
    tbl.string("last_name");
    tbl.string("user_role").notNullable();
    tbl.string("avatar_url");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
