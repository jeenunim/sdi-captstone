const knex = require('knex')(require('../knexfile.js')['development']);

/**
 * @param {number} memberId Expects member.id
 * @returns {Promise<member | Error>} Returns either a pomisified member that was found or an error
 */
const getMember = (memberId) => {
  return knex('member')
    .select('*')
    .where('id', memberId)
    .then(members => {
      const memberFound = members.length > 0;
      if (memberFound) {
        const member = members[0];
        return member
      } else {
        throw new Error(`Could not find member of id '${memberId}'`);
      }
    })
    .catch(err => {
      console.error(err.message);
      throw err;
    })
}

/**
 * @param {number} memberId Expects member.id
 * @returns {Promise<member[] | Error>} Returns either a promisified array of member or error
 */
const getMemberSubordinates = (memberId) => {
  return getMember(memberId)
    .then(member => {
      knex('member')
        .select('*')
        .where('supervisor_id', memberId)
        .then(subordinates => {
          if (subordinates.length > 0) {
            return subordinates
          } else {
            throw new Error(`Could not find subordinates for supervisor of id '${memberId}'.`)
          }
        })
        .catch(err => {
          console.error(err.message)
          throw err;
        })
    })
    .catch(err => {
      console.error(err.message)
      throw err;
    })
}

/** 
* @param {number} numberId
* @param {number} supervisorId
* @returns {Promise<member>}
*/
const updateMemberSupervisor = (memberId, supervisorId) => {
  return knex('member')
  .where('id', memberId)
  .update({ supervisor_id: supervisorId}, ['*'])
  .then((updatedMember) => {
    if (!updatedMember || updatedMember.length === 0) {
      throw new Error(`Failed to update supervisor for member ${memberId}`)
    }
    return updateMember[0];
  })
  .catch((error) => {
    console.error(error);
    throw new Error('Failed to update member supervisor in the database.')
  })
}

/**
 * @param {number} memberId Expects member.id
 * @returns {Promise<member | Error>} Returns either a pomisified member that was found or an error
 */
const getMemberSupervisor = (memberId) => {
  return getMember(memberId)
    .then(member => {
      /** @type {number} */
      const supervisorId = member.supervisor_id;
      return getMember(supervisorId);
    })
    .catch(err => {
      console.error(err.message);
      throw err
    })
}

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
          const statusFound = statuses.length > 0;
          if (statusFound) {
            const statusId = member.status_id;
            const { name, ...status } = statuses.find(status => status.id === statusId);
            if (status) {
              status.type = name;
              status.member_id = memberId;
              return status;
            } 
          } 
          return new Error(`Could not find member of id '${memberId}'s status!`)
        })
        .catch(err => {
          console.error(err.message);
          throw err;
        })
    })
    .catch(err => {
      console.error(err.message);
      throw err;
    })
}

/**
 * @param {number} memberId Expects member.id
 * @returns {Promise<member.status | Error>} Returns a promisifed member's status
 */
const getMemberRank = (memberId) => {
  return getMember(memberId)
    .then(member => {
      return knex('rank')
        .join('branch', 'rank.branch_id', 'branch.id')
        .select('rank.id', 'rank.pay_grade', 'rank.title', 'rank.abbreviation', 'branch.name')
        .then(ranks => {
          const rankId = member.rank_id;
          const { name, ...rank } = ranks.find(rank => rank.id === rankId);
          if (rank) {
            rank.branch = name;
            return rank;
          } else {
            throw new Error(`Could not find member of id '${memberId}'s rank!`);
          }
        })
        .catch(err => {
          console.error(err.message);
          throw err;
        })
      })
      .catch(err => {
        console.error(err.message);
        throw err;
      })
}

module.exports = { getMember, getMemberSubordinates, getMemberSupervisor, getMemberStatus, getMemberRank }