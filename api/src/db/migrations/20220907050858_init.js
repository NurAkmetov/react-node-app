/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTableIfNotExists('agencies', function (table) {
            table.increments('id').primary();
            table.string('name').unique();
            table.string('region');

            table.timestamps(true, true);
        })

        .createTableIfNotExists('routeCategories', function (table) {
            table.increments('id').primary();
            table.string('name').unique();

            table.timestamps(true, true);
        })

        .createTableIfNotExists('vehicleTypes', function (table) {
            table.increments('id').primary();
            table.string('name').unique();
            table.integer('price');

            table.timestamps(true, true);
        })

        .createTableIfNotExists('routes', function (table) {
            table.increments('id').primary();
            table.string('name').unique();
            table.integer('direction');
            table.integer('distance');
            table.integer('agencyId').unsigned();
            table.foreign('agencyId').references('agencies.id');
            table.integer('routeCategoryId').unsigned();
            table.foreign('routeCategoryId').references('routeCategories.id');
            table.integer('vehicleTypeId').unsigned();
            table.foreign('vehicleTypeId').references('vehicleTypes.id');

            table.timestamps(true, true);
        })

        .createTableIfNotExists('stops', function (table) {
            table.increments('id').primary();
            table.string('name').unique();
            table.integer('latitude');
            table.integer('longitude');
            table.integer('routeId').unsigned();
            table.foreign('routeId').references('routes.id');
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('agencies')
        .dropTable('routeCategories')
        .dropTable('routes')
        .dropTable('vehicleTypes')
        .dropTable('stops')
};
