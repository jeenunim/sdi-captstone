/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE status CASCADE');
  await knex('status').del()
  await knex('status').insert([
    {
      status_type_id: 3,
      address: 'Georgia, USA',
      description: 'NSA Georgia'
    },
    {
      status_type_id: 4,
      address: 'Hollywood Blvd, Los Angeles, CA',
      description: 'Local Leave'
    },
    {
      status_type_id: 2,
      address: 'Kenya',
      description: 'Deployed fighting the Covenant'
    },
    {
      status_type_id: 5,
      address: 'Decatur, TX',
      description: 'barber'
    },
    {
      status_type_id: 2,
      address: 'Hawaii',
      description: 'Serving on the USS Enterprise'
    },
    {
      status_type_id: 3,
      address: 'Kennedy Space Center',
      description: 'Serving a tour with NASA'
    },
    {
      status_type_id: 6,
      address: 'Keesler AFB',
      description: 'Tech School'
    }


  ]);
};
