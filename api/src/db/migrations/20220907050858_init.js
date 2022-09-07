/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTableIfNotExists('routes', function (table) {
            table.increments('id').primary();
            table.string('name').unique();
            table.integer('direction');
            table.integer('distance');
            table.integer('agencyId').unsigned();
            table.integer('routeCategoryId').unsigned();
            table.integer('vehicleTypeId');

            table.timestamps(true, true);
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
};
