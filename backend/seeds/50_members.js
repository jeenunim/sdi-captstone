/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE member CASCADE');
  await knex('member').del()
  await knex('member').insert([
    {
      first_name: 'Bradley', 
      last_name: 'Saltzman', 
      username: 'bradley.saltzman',
      password: 'password',
      branch_id: 5,
      rank_id: 20, 
      office_symbol: 'SF/OCSO', 
      org_id: 1,
      status_id: 1, 
      is_supervisor: true, 
      is_commander: true 
    },
    {
      first_name: 'John',
      last_name: 'Doe',
      username: 'john.doe',
      password: 'password',
      branch_id: 5,
      rank_id: 5,
      office_symbol: 'USSF/SSC/S2',
      org_id: 2,
      supervisor_id: 1,
      status_id: 2
    }
  ]);
};
