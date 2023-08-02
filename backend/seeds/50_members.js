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
      rank_id: 19, 
      office_symbol: 'SF/OCSO', 
      org_id: 1,
      status_id: 1, 
      supervisor_id: 1,
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
    },
    {
      first_name: 'John',
      last_name: 'Halo',
      username: 'sierra-117',
      password: 'password',
      branch_id: 5,
      rank_id: 9,
      office_symbol: 'UNSC/S',
      org_id: 3,
      supervisor_id: 1,
      status_id: 3
    },
    {
      first_name: 'Michael',
      last_name: 'Hopkins',
      username: 'michael.hopkins',
      password: 'password',
      branch_id: 5,
      rank_id: 15,
      office_symbol: 'NASA/ISS',
      org_id: 4,
      supervisor_id: 1,
      status_id: 6,
      is_supervisor: true, 
      is_commander: true 
    },
    {
      first_name: 'Bill',
      last_name: 'Dauterive',
      username: 'bill.dauterive',
      password: 'password',
      branch_id: 5,
      rank_id: 5,
      office_symbol: 'Army',
      org_id: 4,
      supervisor_id: 1,
      status_id: 4,
      is_supervisor: true, 
      is_commander: true 
    },
    {
      first_name: 'Jean-Luc',
      last_name: 'Picard',
      username: 'jean-luc.picard',
      password: 'password',
      branch_id: 5,
      rank_id: 15,
      office_symbol: 'USSF/SF',
      org_id: 5,
      supervisor_id: 1,
      status_id: 5,
      is_supervisor: true, 
      is_commander: true 
    },
    {
      first_name: 'William',
      last_name: 'Riker',
      username: 'william.riker',
      password: 'password',
      branch_id: 5,
      rank_id: 14,
      office_symbol: 'USSF/SF',
      org_id: 5,
      supervisor_id: 6,
      status_id: 5
    },
    {
      first_name: 'Geordi',
      last_name: 'Forge',
      username: 'georgi.forge',
      password: 'password',
      branch_id: 5,
      rank_id: 13,
      office_symbol: 'USSF/SF',
      org_id: 5,
      supervisor_id: 6,
      status_id: 5
    },
    {
      first_name: 'Android',
      last_name: 'Data',
      username: 'data',
      password: 'password',
      branch_id: 5,
      rank_id: 13,
      office_symbol: 'USSF/SF',
      org_id: 5,
      supervisor_id: 6,
      status_id: 5
    },
    {
      first_name: 'Deanna',
      last_name: 'Troi',
      username: 'deanna.troi',
      password: 'password',
      branch_id: 5,
      rank_id: 12,
      office_symbol: 'USSF/SF',
      org_id: 5,
      supervisor_id: 6,
      status_id: 7
    }
  ]);
};
