
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('item').del()
    .then(function () {
      // Inserts seed entries
      return knex('item').insert([
        {itemName: 'item1', price: 300},
        {itemName: 'item2', price: 250},
        {itemName: 'item3', price: 200},
      ]);
    });
};
