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
        return new Error('No status types found!');
      }
    })
    .catch(err => {
      console.error(err.message);
      return err;
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
        return new Error(`Could not find any statuses...`)
      }
    })
    .catch(err => {
      console.error(err.message);
      return err;
    })
  // return getMembers()
  //   .then(members => {
  //     const membersFound = members.length > 0;
  //     if (membersFound) {
  //       return Promise.all(
  //         members
  //           .map(member => {
  //             return getMemberStatus(member.id)
  //               .then(status => (status.type.toLowerCase() === statusType.toLocaleLowerCase()) ? member : undefined)
  //               .catch(err => {
  //                 console.error(err.message)
  //               })
  //           })
  //           .filter(member => member !== undefined)
  //       )
  //     }
  //   })
}

module.exports = { getStatusTypes, getMembersOfStatusType };