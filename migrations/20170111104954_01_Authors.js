exports.up = function(knex, Promise) {
  return knex.schema.createTable('authors', table =>  {
    table.increments();
    table.text('firstname').notNullable();
    table.text('lastname').notNullable();
    table.text('bio');
    table.text('img');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('authors');
};
