const knex = require('knex')(require('../knexfile.js')['development']);
const { getMember } = require('./member.js');

/**
 * @param {number} memberId Expects member.id
 * @returns {Promise<member.status | Error>} Returns a promisifed member's status
 */
const getMemberStatus = (memberId) => {
  return getMember(memberId)
    .then(member => {
      return knex('status')
        .join('status_type', 'status.status_type_id', 'status_type.id')
        .select('status.id', 'status.address', 'status.description', 'status_type.name')
        .then(statuses => {
          const statusesFound = statuses.length > 0;
          if (statusesFound) {
            const statusId = member.status_id;
            const statusFound = statuses.find(status => status.id === statusId);
            if (statusFound) {
              const { name, ...status } = statusFound;
              status.type = name;
              status.member_id = memberId;
              status.status_type_id = statusId;
              return status;
            } 
          } 
          throw new Error(`Could not find member of id '${memberId}'s status!`)
        })
        .catch(err => {
          console.error(err.message);
          throw err;
        })
    })
}

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

/**
 * @param {number} memberId 
 * @param {{
 *  status_type_id: number,
 *  address: string,
 *  description: string
 * }} status
 * @returns {Promise<member>}
 */
const updateMemberStatus = (memberId, status) => {
  return getMember(memberId)
    .then(member => {
      const statusId = member.status_id;
      if (statusId) {
        return knex('status')
          .where('id', statusId)
          .update({
            status_type_id: status.status_type_id,
            address: status.address,
            description: status.description
          }, ['*'])
          .then(statuses => {
            const statusFound = statuses.length > 0;
            if (statusFound) {
              const newStatus = statuses[0];
              return newStatus;
            }
          })
          .catch(err => {
            console.error(err.message);
            throw new Error(`Failed to update member of id '${memberId}'s status!`);
          })
      } else {
        return knex('status')
          .insert(status, ['*'])
          .then(statuses => {
            const statusFound = statuses.length > 0;
            if (statusFound) {
              const newStatus = statuses[0];
              return knex('member')
                .where('id', memberId)
                .update('status_id', newStatus.id)
                .then(() => newStatus)
            } else {
              throw new Error(`Failed to create new status for member of id '${memberId}'s status!`);
            }
          })
        
      }
    })
}

module.exports = { getMemberStatus, getStatusTypes, getMembersOfStatusType, updateMemberStatus };


