
exports.up = function(knex) {
    return knex.schema.createTable('orders', table => {
        table.collate('utf8mb4_unicode_ci');
        table.increments('orderID').primary();
        table.integer('userID').notNullable().unsigned();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('orders');
  };