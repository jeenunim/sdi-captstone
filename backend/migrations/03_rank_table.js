/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('rank', table => {
        table.increments('id');
        table.string('pay_grade');
        table.string('title');
        table.string('abbreviation');
        table.integer('branch_id');
        table.foreign('branch_id').references('branch.id');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('rank', table => {
        table.dropForeign('branch_id');
    })
    .then(function() {
        return knex.schema.dropTableIfExists('rank');
    })
  
};
