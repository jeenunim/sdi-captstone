/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('status_type').del()
  await knex('status_type').insert([
    {
      id: 2,
      name: 'Deployed'
    },
    {
      id: 3,
      name: 'Present'
    },
    {
      id: 4,
      name: 'Leave'
    },
    {
      id: 5,
      name: 'Teleworking'
    },
    {
      id: 6,
      name: 'Training'
    },
  ]);
};
