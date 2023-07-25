/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('member', table => {
        table.increments('id');
        table.string('first_name');
        table.string('last_name');
        table.string('username');
        table.string('password');
        table.integer('branch_id');
        table.foreign('branch_id').references('branch.id')
        table.integer('rank_id');
        table.foreign('rank_id').references('rank.id');
        table.string('office_symbol');
        table.integer('org_id');
        table.foreign('org_id').references('org.id');
        table.integer('supervisor_id');
        table.integer('location_id');
        table.foreign('location_id').references('location.id');
        table.string('status');
        table.boolean('is_supervisor');
        table.boolean('is_commander')
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
        table.dropForeign('location_id');
    })
    .then(function() {
        return knex.schema.dropTableIfExists('member');
    })
  
};
