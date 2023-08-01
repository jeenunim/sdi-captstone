/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('org').del()
  await knex('org').insert([
    {
      name: 'Office of the Chief of Space Operations (OCSO)',
      commander_id: 1
    },
    {
      name: 'Space Systems Command'
    },
    {
      name: 'United Nations Space Command'
    },
    {
      name: 'National Aeronautical and Space Administration'
    },
    {
      name: 'Starfleet',
      commander_id: 6
    }
  ])
};
