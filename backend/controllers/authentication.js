const knex = require('knex')(require('../knexfile.js')['development']);

/**
 * @param {string} username 
 * @param {string} password
 * @returns {member}
 */
const login = (username, password) => {
  return knex('member')
    .select('*')
    .where('username', username)
    .where('password', password)
    .then(members => {
      const memberFound = members.length > 0
      if (memberFound) {
        const member = members[0];
        return member;
      } else {
        throw new Error('Invalid username/password combination');
      }
    })
    .catch(err => console.log(err))
}

const signUp = (username) => {
  return knex('member')
    .where('username', username)
    .then(members => {
      const memberFound = members.length > 0;
      if (memberFound) {
          throw new Error('Username taken!');
      } else {
        const newMember = req.body;
        return knex('member')
          .insert(newMember, ['*'])
          .then(members => {
            const { password, ...member } = members[0];
            return member;
          })
          .catch(err => {
            throw new Error('Failed to insert new member into database!')
          })
      }
    })
  .catch(err => {
    throw new Error('Could not create new account');
  })
}

module.exports = { login, signUp }