const knex = require('knex')(require('../knexfile.js')['development']);

const getBranch = (branchId) => {
  return knex('branch')
    .select('*')
    .where('id', branchId)
    .then(branches => {
      const branchFound = branches.length > 0;
      
      if (branchFound) {
        const branch = branches[0];
        return branch;
      } else {
        throw new Error(`Could not find branch of id '${branchId}'`)
      }
    })
    .catch(err => {
      console.error(err.message);
      throw err;
    })
}

const getBranches = () => {
  return knex('branch')
    .select('*')
    .then(branches => {
      const branchesFound = branches.length > 0;

      if (branchesFound) {
        return branches;
      } else {
        throw new Error(`Could not find branches`);
      }
    })
    .catch(err => {
      console.error(err.message);
      throw err;
    })
}

module.exports = { getBranch, getBranches }