const knex = require('./db/knex');

module.exports = {
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
//     getBrewery: function(brewery_id){
//         // Return a promise that gets one brewery that matches the id
//         return knex.select().from('brewery').where('id', brewery_id);
//     },
//     getBeers: function(){
//         // Return a promise that gets all beers where the beer name is set to the property beer_name
//         // Each beer should also have a property with the name of it's brewery called brewery_name
//         return knex.select('beer.name as beer_name', 'brewery.name as brewery_name', 'abv')
//         .from('beer')
//         .join('brewery', 'brewery_id', 'brewery.id');
// },
//     getBeersByBrewery: function(brewery_id){
//         // Return a promise that gets all beers for a single brewery
//         // Where the beer name is set to the property beer_name
//         // Each beer should also have a property with the name of it's brewery called brewery_name
//         return knex.select('beer.name as beer_name', 'brewery.name as brewery_name', 'abv')
//         .from('beer')
//         .join('brewery', 'brewery_id', 'brewery.id')
//         .where('brewery.id', brewery_id);
//     }
};
