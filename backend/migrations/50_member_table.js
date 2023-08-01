/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('member', table => {
        table.increments('id');
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.integer('branch_id').notNullable().defaultTo(5);
        table.foreign('branch_id').references('branch.id')
        table.integer('rank_id').notNullable().defaultTo(1);
        table.foreign('rank_id').references('rank.id');
        table.string('office_symbol');
        table.integer('org_id');
        table.foreign('org_id').references('org.id');
        table.integer('supervisor_id');
        table.integer('status_id');
        table.foreign('status_id').references('status.id');
        table.boolean('is_supervisor').notNullable().defaultTo(false);
        table.boolean('is_commander').notNullable().defaultTo(false);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('member', table => {
        table.dropForeign('branch_id')
        table.dropForeign('rank_id');
        table.dropForeign('org_id');
        table.dropForeign('status_id');
    })
    .then(function() {
        return knex.schema.dropTableIfExists('member');
    })
};
