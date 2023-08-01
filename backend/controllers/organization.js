const knex = require('knex')(require('../knexfile.js')['development']);
const { getMembers } = require('./members');

getOrganization = (orgId) => {
  return knex('org')
    .select('*')
    .where('id', orgId)
    .then(organizations => {
      const orgFound = organizations.length > 0;
      if (orgFound) {
        const organization = organizations[0];
        return organization;
      } else {
        throw new Error(`Could not find organization of id '${orgId}'`);
      }
    })
    .catch(err => {
      console.error(err.messsage);
      throw err;
    })
}

getOrganizations = () => {
  return knex('org')
    .select('*')
    .then(organizations => {
      if (organizations.length > 0) {
        return organizations
      } else {
        throw new Error('No organizations found');
      }
    })
    .catch(err => {
      console.error(err.messsage);
      throw err;
    })
}

getMembersByOrganization = (orgId) => {
  return getOrganization(orgId)
    .then(organization => {
      return knex('member')
        .select('*')
        .where('org_id', organization.id)
        .then(members => {
          const membersFound = members.length > 0;
          if (membersFound) {
            return members
          } else {
            throw new Error(`Could not find members in organization of id '${orgId}'`);
          }
        })
    })
}

module.exports = { getOrganization, getOrganizations, getMembersByOrganization }