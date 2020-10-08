
exports.up = function(knex) {
    return knex.schema.createTable('user', table => {
        table.collate('utf8mb4_unicode_ci');
        table.increments('id').primary();
        table.string('userName', 155).notNullable();
        table.string('email', 255).notNullable().unique();
        table.text('password', 'mediumtext').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('user');
  };
  