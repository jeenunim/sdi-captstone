/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex.schema.raw('TRUNCATE rank CASCADE');
    await knex('rank').del()
    await knex('rank').insert([
        {
          id: 1,
          pay_grade: 'E-1',
          title: 'Specialist 1',
          abbreviation: 'SPC1',
          branch_id: 5
        },
        {
          id: 2,
          pay_grade: 'E-2',
          title: 'Specialist 2',
          abbreviation: 'SPC2',
          branch_id: 5
        },
        {
          id: 3,
          pay_grade: 'E-3',
          title: 'Specialist 3',
          abbreviation: 'SPC3',
          branch_id: 5
        },
        {
          id: 4,
          pay_grade: 'E-4',
          title: 'Specialist 4',
          abbreviation: 'SPC4',
          branch_id: 5
        },
        {
          id: 5,
          pay_grade: 'E-5',
          title: 'Sergeant',
          abbreviation: 'SGT',
          branch_id: 5
        },
        {
          id: 6,
          pay_grade: 'E-6',
          title: 'Technical Sergeant',
          abbreviation: 'TSgt',
          branch_id: 5
        },
        {
          id: 7,
          pay_grade: 'E-7',
          title: 'Master Sergeant',
          abbreviation: 'MSgt',
          branch_id: 5
        },
        {
          id: 8,
          pay_grade: 'E-8',
          title: 'Senior Master Sergeant',
          abbreviation: 'SMSgt',
          branch_id: 5
        },
        {
          id: 9,
          pay_grade: 'E-9',
          title: 'Chief Master Sergeant',
          abbreviation: 'CMSgt',
          branch_id: 5
        },
        {
          id: 10,
          pay_grade: 'O-1',
          title: 'Second Lieutenant',
          abbreviation: '2d Lt',
          branch_id: 5
        },
        {
          id: 11,
          pay_grade: 'O-2',
          title: 'First Lieutenant',
          abbreviation: '1st Lt',
          branch_id: 5
        },
        {
          id: 12,
          pay_grade: 'O-3',
          title: 'Captain',
          abbreviation: 'Capt',
          branch_id: 5
        },
        {
          id: 13,
          pay_grade: 'O-4',
          title: 'Major',
          abbreviation: 'Maj',
          branch_id: 5
        },
        {
          id: 14,
          pay_grade: 'O-5',
          title: 'Lieutenant Colonel',
          abbreviation: 'Lt Col',
          branch_id: 5
        },
        {
          id: 15,
          pay_grade: 'O-6',
          title: 'Colonel',
          abbreviation: 'Col',
          branch_id: 5
        },
        {
          id: 16,
          pay_grade: 'O-7',
          title: 'Brigadier General',
          abbreviation: 'Brig Gen',
          branch_id: 5
        },
        {
          id: 17,
          pay_grade: 'O-8',
          title: 'Major General',
          abbreviation: 'Maj Gen',
          branch_id: 5
        },
        {
          id: 18,
          pay_grade: 'O-9',
          title: 'Lieutenant General',
          abbreviation: 'Lt Gen',
          branch_id: 5
        },
        {
          id: 19,
          pay_grade: 'O-10',
          title: 'General',
          abbreviation: 'Gen',
          branch_id: 5
        }
      ]);
  };
  