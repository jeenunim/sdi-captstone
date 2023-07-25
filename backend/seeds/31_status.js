/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('status').del()
  await knex('status').insert([
    {
      status_type_id: 3,
      address: 'Georgia, USA',
      description: 'NSA Georgia'
    }
  ]);
};
