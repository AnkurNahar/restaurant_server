
exports.up = function(knex) {
    return knex.schema.createTable('item', table => {
        table.collate('utf8mb4_unicode_ci');
        table.increments('itemID').primary();
        table.string('itemName', 155).notNullable();
        table.double('price',6,2).notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('item');
  };