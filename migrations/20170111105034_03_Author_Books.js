exports.up = function(knex, Promise) {
  return knex.schema.createTable('author_books', table =>  {
    table.increments();
    table.integer('book_id').unsigned();
    table.foreign('book_id').references('book_id');
    table.integer('author_id').unsigned();
    table.foreign('author_id').references('author_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('author_books');
};
