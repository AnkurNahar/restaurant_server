
exports.up = function(knex) {
    return knex.schema.createTable('orderitems', table => {
        table.collate('utf8mb4_unicode_ci');
        table.integer('orderID').notNullable().unsigned();
        table.integer('itemID').notNullable().unsigned();
        table.integer('quantity').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('orderitems');
  };