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

// /**
//  * @param {number} memberId 
//  */
// const updateMemberStatus = (memberId) => {
//  // ToDo
// }

//change or remove if needed 
/**
 * @param {number} memberId 
 * @param {number} statusTypeId 
 * @returns {Promise<member>}
 */
const updateMemberStatus = (memberId, statusTypeId) => {
  return knex('member')
    .where('id', memberId)
    .update({ status_type_id: statusTypeId }, ['*'])
    .then((updatedMembers) => {
      const updatedMember = updatedMembers[0];
      if (!updatedMember) {
        throw new Error(`Failed to update status for member ${memberId}`);
      }
      return updatedMember;
    })
    .catch((error) => {
      console.error(error);
      throw new Error('Failed to update member status in the database.');
    });
}

module.exports = { getStatusTypes, getMembersOfStatusType, updateMemberStatus };


