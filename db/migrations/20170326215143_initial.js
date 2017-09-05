
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', function (table) {
      table.increments('id').unsigned().primary();
      table.string('first', 100).notNullable();
      table.string('last', 100).notNullable();
      table.string('username', 100).notNullable();
      table.string('email', 100).nullable().unique();
      table.string('phone', 100).nullable();
      table.boolean('isMerchant').notNullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('address', function (table) {
      table.increments('id').unsigned().primary();
      table.string('line1', 100).notNullable();
      table.string('line2', 100).notNullable();
      table.string('city', 100).notNullable();
      table.string('stateOrProvince', 100).notNullable();
      table.integer('postalCode');
    }),
    knex.schema.createTableIfNotExists('auths', function(table) {
      table.increments('id').unsigned().primary();
      table.string('type', 8).notNullable();
      table.string('oauth_id', 30).nullable();
      table.string('password', 100).nullable();
      table.string('salt', 100).nullable();
      table.integer('user_id').references('users.id').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('products', function(table) {
      table.increments('id').unsigned().primary();
      table.string('type', 8).notNullable();
      table.string('title', 16).notNullable();
      table.string('description', 100).notNullable();
      table.integer('user_id').references('users.id').onDelete('CASCADE');
      table.integer('category_id').references('categories.id').onDelete('CASCADE');
      table.integer('quantity').nullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('categories', function(table) {
      table.increments('id').unsigned().primary();
      table.string('category').notNullable();
    }),
    knex.schema.createTableIfNotExists('transactions', function(table) {
      table.increments('id').unsigned().primary();
      table.string('status', 8).notNullable();
      table.integer('buyer_id').references('users.id').onDelete('CASCADE');
      table.integer('seller_id').references('users.id').onDelete('CASCADE');
      table.integer('session');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('auths'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('products'),
    knex.schema.dropTable('transactions'),
    knex.schema.dropTable('categories'),
    knex.schema.dropTable('address'),
  ]);
};

