/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('branch').del()
    await knex('branch').insert([
      {
        id: 1,
        name: 'United States Army'
      },
      {
        id: 2,
        name: 'United States Navy'
      },
      {
        id: 3,
        name: 'United States Marine Corps'
      },
      {
        id: 4,
        name: 'United States Air Force'
      },
      {
        id: 5,
        name: 'United States Space Force'
      },
    ]);
  };
  