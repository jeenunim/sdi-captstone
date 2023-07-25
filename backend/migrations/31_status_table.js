/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('status', table => {
        table.increments('id');
        table.integer('status_type_id').notNullable();
        table.foreign('status_type_id').references('status_type.id');
        table.string('address');
        table.string('description');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('status', table => {
        table.dropForeign('status_type_id')
    })
    .then(function() {
        return knex.schema.dropTableIfExists('status');
    })
};
