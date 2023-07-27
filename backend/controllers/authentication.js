const knex = require('knex')(require('../knexfile.js')['development']);

/**
 * @param {string} username 
 * @param {string} password
 * @returns {member}
 */
const login = (username, password) => {
  if (username === undefined) {
    return Promise.reject(new Error('Username is a required field!'));
  } else if (typeof username !== 'string') {
    return Promise.reject(new Error('Username must be of type string'));
  } else if (username.length === 0) {
    return Promise.reject(new Error('Username is a required field!'));
  }
  if (password === undefined) {
    return Promise.reject(new Error('Password is a required field!'));
  } else if (typeof password !== 'string') {
    return Promise.reject(new Error('Password must be of type string'));
  } else if (password.length === 0) {
    return Promise.reject(new Error('Password is a required field!'));
  }
  return knex('member')
    .select('*')
    .where('username', username)
    .where('password', password)
    .then(members => {
      const memberFound = members.length > 0
      if (memberFound) {
        const { password, ...member } = members[0];
        return member;
      } else {
        throw new Error('Invalid username/password combination');
      }
    })
    .catch(err => console.log(err))
}

/**
 * @param {string} username 
 * @returns {member}
 */
const signUp = (username, password, firstName, lastName) => {
  if (username === undefined) {
    return Promise.reject(new Error('Username is a required field!'));
  } else if (typeof username !== 'string') {
    return Promise.reject(new Error('Username must be of type string'));
  } else if (username.length < 3) {
    return Promise.reject(new Error('Username must be at least 3 characters long'));
  }
  return knex('member')
    .where('username', username)
    .then(members => {
      const memberFound = members.length > 0;
      if (memberFound) {
          throw new Error('Username taken!');
      } else {
        if (password === undefined) {
          throw new Error('Password is a required field!')
        } else if (typeof password !== 'string') {
          throw new Error('Password must be of type string');
        } else if (password.length < 8) {
          throw new Error('Password must be at least 8 characters long');
        }
        if (firstName === undefined) {
          throw new Error('First name is a required field!')
        } else if (typeof firstName !== 'string') {
          throw new Error('First name must be of type string');
        } else if (firstName.length < 1) {
          throw new Error('First name is a required field');
        }
        if (lastName === undefined) {
          throw new Error('Last name is a required field!')
        } else if (typeof lastName !== 'string') {
          throw new Error('Last name must be of type string');
        } else if (lastName.length < 1) {
          throw new Error('Last name is a required field');
        }
        const newMember = {
          username: username,
          password: password,
          first_name: firstName,
          last_name: lastName
        }
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
    throw err;
  })
}

module.exports = { login, signUp }