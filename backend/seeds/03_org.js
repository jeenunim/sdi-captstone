/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('org').del()
  await knex('org').insert([
    {
      name: 'Office of the Chief of Spacae Operations (OCSO)'
    }
  ])
};
