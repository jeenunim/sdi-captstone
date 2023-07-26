const knex = require('knex')(require('../knexfile.js')['development']);
const { getMemberStatus } = require('./member.js');

/**
 * @returns {Promise<member[] | Error>} Returns either a promisified array of member or error
 */
const getMembers = () => {
  return knex('member')
    .select('*')
    .then(members => {
      if (members.length > 0) {
       return members
      } else {
        throw new Error('Members could not be found!')
      }
    })  
    .catch(err => {
      console.error(err.message);
      throw err;
    });
};

/**
 * @returns {Promise<member.status[] | Error>} Returns a promisified array of all member's statuses
 */
const getMembersStatus = () => {
  return getMembers()
    .then(members => {
      const statuses = members.map(member => getMemberStatus(member.id));
      return Promise.all(statuses);
    })
    .catch(err => {
      console.error(err.message)
      throw err;
    })
}

const getMembersSupervisor = () => {
  return getMembers()
    .then(members => {
      const supervisors = members.map(member => member.is_supervisor);
      const supervisorsFound = supervisors.length > 0;
      if (supervisorsFound) {
        return supervisors;
      } else {
        throw new Error('No supervisors found...');
      }
    })
    .catch(err => {
      console.error(err.message)
      throw err;
    })
}

module.exports = { getMembers, getMembersStatus, getMembersSupervisor }