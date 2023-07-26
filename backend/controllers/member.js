const knex = require('knex')(require('../knexfile.js')['development']);

getMembers = () => {
  return knex('member')
    .select('*')
    .then(members => {
      if (members.length > 0) {
       return members
      } else {
        return new Error('Members could not be found!')
      }
    })  
    .catch(err => {
        console.error(err);
        throw err;});
};


module.exports = { getMembers }