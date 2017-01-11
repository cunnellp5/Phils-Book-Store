exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', table =>  {
    table.increments();
    table.text('title').notNullable();
    table.text('genera').notNullable();
    table.text('description');
    table.text('img');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('books');
};
