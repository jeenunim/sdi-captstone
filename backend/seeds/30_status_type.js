/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('status_type').del()
  await knex('status_type').insert([
    {
      name: 'Custom'
    },
    {
      name: 'Deployed'
    },
    {
      name: 'Present'
    },
    {
      name: 'Leave'
    },
    {
      name: 'Teleworking'
    },
    {
      name: 'Training'
    },
  ]);
};
