const knex = require('knex')(require('../knexfile.js')['development']);
const { getMember } = require('./member');
const { getBranch } = require('./branch');


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

const getRanksByMilitaryBranch = (branchId) => {
  return getBranch(branchId)
    .then(branch => {
      return knex('rank')
        .select('*')
        .where('branch_id', branchId)
        .join('branch', 'branch.id', 'rank.branch_id')
        .then(joinedRanks => {
          const ranks = joinedRanks.map(({name, ...rank}) => {
            rank.branch = name;
            return rank;
          });
          const ranksFound = ranks.length > 0;
          if (ranksFound) {
            return ranks;
          } else {
            throw new Error('Could not find any ranks');
          }
        })
        .catch(err => {
          console.error(err.message);
          throw err;
        })
    })
}

const getRanks = () => {
  return knex('rank')
    .select('*')
    .join('branch', 'branch.id', 'rank.branch_id')
    .then(joinedRanks => {
      const ranks = joinedRanks.map(({name, ...rank}) => {
        rank.branch = name;
        return rank;
      });
      const ranksFound = ranks.length > 0;
      if (ranksFound) {
        return ranks;
      } else {
        throw new Error('Could not find any ranks');
      }
    })
    .catch(err => {
      console.error(err.message);
      throw err;
    })
}

module.exports = { getMemberRank, getRanksByMilitaryBranch, getRanks }