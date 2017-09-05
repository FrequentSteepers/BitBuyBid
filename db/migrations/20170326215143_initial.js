
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
    knex.schema.createTableIfNotExists('addresses', function (table) {
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
      table.bigint('ad-id').unsigned().nullable();
      table.bigint('sku').unsigned().nullable();
      table.bigint('upc').unsigned().nullable();
      table.bigint('catalog_id').unsigned().nullable();
      table.decimal('price').unsigned().nullable();
      table.string('buy_url', 500).nullable();
      table.string('img_url_sm', 500).nullable();
      table.string('img_url_md', 500).nullable();
      table.string('img_url_lg', 500).nullable();
      table.string('type', 20).notNullable();
      table.string('title', 500).notNullable();
      table.string('description', 1000).notNullable();
      table.integer('user_id').references('users.id').onDelete('CASCADE');
      table.integer('category_id').references('categories.id').onDelete('CASCADE');
      table.boolean('in-stock').nullable();
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
    knex.schema.createTableIfNotExists('reviews', function(table) {
      table.increments('id').primary();
    }),
    knex.schema.createTableIfNotExists('tags', function(table) {
      table.increments('id').primary();
    }),
    knex.schema.createTableIfNotExists('recommendations', function(table) {
      table.increments('id').primary();
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
    knex.schema.dropTable('reviews'),
    knex.schema.dropTable('tags'),
    knex.schema.dropTable('recommendations'),
  ]);
};

