
exports.up = function(knex) {
    return knex.schema.table('orders', table => {
        table.foreign('userID').references('id').inTable('user').onDelete('CASCADE');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('orders', table => {
        table.dropForeign('userID');
    });
  
  };
  