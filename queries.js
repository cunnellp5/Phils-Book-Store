const knex = require('./db/knex');

module.exports = {
  getAuthors: function(){
    return knex.select().from('authors');
  },

  getBooks: function(){
      // Return a promise that gets all books
      return knex.select().from('books');
  },
  newBook: function(obj){
      return knex('books').returning('id').insert(obj);
  },
  deleteBook: function(id){
    knex('books').where('id', id).first().del();
  },
  editBook: function(obj, id){
    return knex('books').where('id', id).update(obj);
  },
  getOneBook: function(id)   {
    return knex('books').where("id", id).select('*').first();
  },

};
