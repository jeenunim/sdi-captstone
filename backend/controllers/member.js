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
        const { password, ...member } = members[0];
        member.getDisplayName = () => {
          return `${member.first_name} ${member.last_name}`
        }
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
      return knex('member')
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
}

/** 
* @param {number} memberId
* @param {number} supervisorId
* @returns {Promise<member>}
*/
const updateMemberSupervisor = (memberId, supervisorId) => {
  return getMember(memberId)
    .then(member => {
      return getMember(supervisorId)
        .then(supervisor => {
          return knex('member')
            .where('id', memberId)
            .update({supervisor_id: supervisorId}, ['*'])
            .then(members => {
              const memberFound = members.length > 0;
              if (memberFound) {
                const member = members[0];
                knex('member')
                  .where('id', supervisorId)
                  .update({is_supervisor: true})
                return member;
              } else {
                throw new Error(`Failed to updated member of id '${memberId}'s supervisor!`)
              }
            })
            .catch(err => {
              console.error(err.message);
              throw err;
            })
        })
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
}

/**
 * @param {number} memberId 
 * @param {{
    * first_name: string, 
    * last_name: string, 
    * password: string, 
    * branch_id: number, 
    * rank_id: number, 
    * office_symbol: string, 
    * org_id: number, 
    * supervisor_id: number, 
    * is_commander: boolean
 * }} profile 
 */
const updateMemberProfile = (memberId, profile) => {
  return getMember(memberId)
    .then(member => {
      return knex('member')
        .where('id', memberId)
        .update(profile, ['*'])
        .then(members => {
          const memberFound = members.length > 0;
          if (memberFound) {
            const { password, ...member } = members[0];
            if ('supervisor_id' in member) {
              return updateMemberSupervisor(memberId, member.supervisor_id)
                .then(() => member)
            }
            return member;
          }
        })
        .catch(err => {
          console.error(err.message);
          throw new Error(`Failed to update member of id '${memberId}'s profile!`);
        })
    })
}

module.exports = { getMember, getMemberSubordinates, getMemberSupervisor, updateMemberSupervisor, getMemberRank, updateMemberProfile }