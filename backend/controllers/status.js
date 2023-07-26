const knex = require('knex')(require('../knexfile.js')['development']);
const { getMember } = require('./member.js');
const { getMembersStatus } = require('./members.js');

/**
 * @returns {Promise<status.status_type>} 
 */
const getStatusTypes = () => {
  return knex('status_type')
    .select('*')
    .then(statusTypes => {
      const statusTypesFound = statusTypes.length > 0;
      if (statusTypesFound) {
        return statusTypes;
      } else {
        throw new Error('No status types found!');
      }
    })
    .catch(err => {
      console.error(err.message);
      throw err;
    })
}

/**
 * @param {string} statusType 
 * @returns {Promise<member[]>}
 */
const getMembersOfStatusType = (statusType) => {
  return getMembersStatus()
    .then(statuses => {
      const statusesFound = statuses.length > 0;
      if (statusesFound) {
        return Promise.all(
          statuses
            .filter(status => status.type.toLowerCase() === statusType.toLowerCase())
            .map(status => getMember(status.member_id))
        );
      } else {
        throw new Error(`Could not find any statuses...`)
      }
    })
    .catch(err => {
      console.error(err.message);
      throw err;
    })
}

module.exports = { getStatusTypes, getMembersOfStatusType };