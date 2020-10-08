
exports.up = function(knex) {
    return knex.schema.table('orderitems', table => {
        table.foreign('orderID').references('orderID').inTable('orders').onDelete('CASCADE');
        table.foreign('itemID').references('itemID').inTable('item').onDelete('CASCADE');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('orderitems', table => {
        table.dropForeign('orderID');
        table.dropForeign('itemID');
    });
  
  };
