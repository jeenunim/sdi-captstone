/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('member').del()
  await knex('member').insert([
    {
      first_name: 'Bradley', 
      last_name: 'Saltzman', 
      rank: 'General', 
      office_symbol: 'SF/CSO', 
      org_id: 1, 
      supervisor_id: 1, 
      location_id: 1, 
      status: 'telework', 
      is_supervisor: true, 
      is_commander: true 
    },
  ]);
};
