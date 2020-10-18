
exports.up = function(knex) {
    return knex.schema.createTable('tokens', table => {
        table.collate('utf8mb4_unicode_ci');
        table.increments('id').primary();
        table.integer('userID').notNullable().unsigned();
        table.text('token', 'mediumtext');
        table.foreign('userID').references('id').inTable('user').onDelete('CASCADE');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('tokens');
  };
  