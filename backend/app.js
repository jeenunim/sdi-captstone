const express = require('express');
const app = express();
const port = 8080;
const knex = require('knex')(require('./knexfile.js')['development']);
const cookieParser = require('cookie-parser'); // the import of cookies
const cors = require('cors');
const memberController = require('./controllers/member.js');
const membersController = require('./controllers/members.js');
const statusController = require('./controllers/status.js');
const authenticationController = require('./controllers/authentication.js');
const orgController = require('./controllers/organization.js');
const rankController = require('./controllers/rank.js');
const branchController = require('./controllers/branch.js');

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.status(200).send(JSON.stringify({
    message: 'Success!'
  }))
})

app.post('/login', (req, res) => {
  /** @type {{ username:string, password:string} } */
  const { username, password } = req.body;

  authenticationController.login(username, password)
    .then(member => {
      res.cookie('memberId', member.id, {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
        path: '/',
        expires: 0,
        signed: false
      });
      res.status(200).send(JSON.stringify({
        message: 'Login success', 
        member: member
      }))
    }) 
    .catch(err => {
      res.status(401).send(JSON.stringify({
        message: err.message
      }))
    })
})

app.post('/sign-up', (req, res) => {
  /** @type {{username:string, password:string, first_name:string, last_name:string}} */
  const { username, password, first_name, last_name } = req.body;

  authenticationController.signUp(username, password, first_name, last_name)
    .then(member => {
      res.cookie('memberId', member.id, {httpOnly: true }); //prevent XSS
      res.status(201).send(JSON.stringify({
        message: 'Successfully signed up!',
        member: member
      }));
    })
    .catch(err => {
      res.status(400).send(JSON.stringify({
        error: err.message
      }));
    })
  
})

// Request all members
app.get('/members', (req, res) => {
  membersController.getMembers()
    .then(members => {
      res.status(200).send(JSON.stringify({
        message: 'Members found!',
        members: members
      }));
    })
    .catch(err => {
      res.status(404).send(JSON.stringify({
        error: err.message
      }));
    })
})

// Request status of all members
app.get('/members/statuses', (req, res) => {
  membersController.getMembersStatus()
    .then(statuses => {
      res.status(200).send(JSON.stringify({
        message: `Found all members' status!`,
        statuses: statuses
      }));
    })
    .catch(err => {
      res.status(404).send(JSON.stringify({
        error: `Could not return  all members' status...`
      }));
    })
})

app.get('/members/status_type/:statusType', (req, res) => {
  /** @type {string} */
  const statusType = req.params.statusType;

  membersController.getMembersOfStatusType(statusType)
    .then(members => {
      res.status(200).send(JSON.stringify({
        message: `Found members of status type, '${statusType}'`,
        members: members
      }));
    })
    .catch(err => {
      res.status(404).send(JSON.stringify({
        error: err.message 
      }));
    })
})

// Requests supervisors of all members
app.get('/members/supervisors', (req, res) => {
  membersController.getMembersSupervisor()
    .then(supervisors => {
      res.status(200).send(JSON.stringify({
        message: 'Supervisors found!',
        supervisors: supervisors
      }));
    })
    .catch(err => {
      res.status(404).send(JSON.stringify({
        error: err.message 
      }));
    })
})

// Request a member
app.get('/member/:memberId', (req, res) => {
  /** @type {number} */
  const memberId = req.params.memberId;

  memberController.getMember(memberId)
    .then(member => {
      res.status(200).send(JSON.stringify({
        message: 'Member found!',
        member: member
      }));
    })
    .catch(err => {
      res.status(404).send(JSON.stringify({
        error: err.message
      }));
    })
})

// Request a supervisor's subordinates
app.get('/member/:memberId/subordinates', (req, res) => {
  /** @type {number} */
  const memberId = req.params.memberId;

  memberController.getMemberSubordinates(memberId)
    .then(subordinates => {
      res.status(200).send(JSON.stringify({
        message: 'Subordinates found!',
        subordinates: subordinates
      }));
    })
    .catch(err => {
      res.status(404).send(JSON.stringify({
        error: err.message
      }));
    })
});

// Update a member's supervisor
app.patch('/member/:memberId/supervisor', (req, res) => {
  /** @type {number} */
  const memberId = req.params.memberId;
  /** @type {number} */
  const supervisorId = req.body.supervisor_id;

  memberController.updateMemberSupervisor(memberId, supervisorId)
    .then(supervisor => {
      res.status(200).send(JSON.stringify({
        message: 'Successfully updated supervisor!',
        supervisor: supervisor
      }));
    })
    .catch(err => {
      res.status(400).send(JSON.stringify({
        error: err.message
      }));
    })
})

// Get a member's supervisor
app.get('/member/:memberId/supervisor', (req, res) => {
  /** @type {number} */
  const memberId = req.params.memberId;

  memberController.getMemberSupervisor(memberId)
  .then(supervisor => {
    res.status(200).send(JSON.stringify({
      message: 'Successfully retrieved supervisor!',
      supervisor: supervisor
    }));
  })
  .catch(err => {
    res.status(404).send(JSON.stringify({
      error: `Could not find member id '${memberId}'s supervisor`
    }));
  })
})

app.patch('/member/:memberId', (req, res) => {
  /** @type {number} */
  const memberId = req.params.memberId;
  /** @type {{first_name: string, last_name: string, password: string, branch_id: number, rank_id: number, office_symbol: string, org_id: number, supervisor_id: number, is_commander: boolean}}*/
  const profile = req.body;

  memberController.updateMemberProfile(memberId, profile)
    .then(member => {
      res.status(200).send(JSON.stringify({
        message: 'Successfully updated profile!',
        member: member
      }));
    })
    .catch(err => {
      res.status(400).send(JSON.stringify({
        error: err.message
      }));
    })
})

// Get member's status
app.get('/member/:memberId/status', (req, res) => {
  /** @type {number} */
  const memberId = req.params.memberId;

  statusController.getMemberStatus(memberId)
  .then(status => {
    res.status(200).send(JSON.stringify({
      message: 'Status found!',
      status: status
    }))
  })
  .catch(err => {
    res.status(404).send(JSON.stringify({
      error: err.message
    }))
  })
})

// Update member's status
app.patch('/member/:memberId/status', (req, res) => {
  /** @type {number} */
  const memberId = req.params.memberId;
  /** @type {{status_type_id:number, address:string, description:string}} */
  const status = req.body.status;

  statusController.updateMemberStatus(memberId, status)
  .then(status => {
    res.status(200).send(JSON.stringify({
      message: 'Status updated!',
      status: status
    }))
  })
  .catch(err => {
    res.status(404).send(JSON.stringify({
      error: err.message
    }))
  })
})

app.get('/member/:memberId/rank', (req, res) => {
  /** @type {number} */
  const memberId = req.params.memberId;

  rankController.getMemberRank(memberId)
    .then(rank => {
      res.status(200).send(JSON.stringify({
        message: 'Rank found!',
        rank: rank
      }))
    })
    .catch(err => {
      res.status(404).send(JSON.stringify({
        error: `Could not find member of id '${memberId}'s rank!`
      }))
    })
})

app.get('/member/:memberId/branch', (req, res) => {
  /** @type {number} */
  const memberId = req.params.memberId;

  branchController.getMemberBranch(memberId)
    .then(branch => {
      res.status(200).send(JSON.stringify({
        message: 'branch found!',
        branch: branch
      }))
    })
    .catch(err => {
      res.status(404).send(JSON.stringify({
        error: `Could not find member of id '${memberId}'s branch!`
      }))
    })
})

app.get('/status_types', (req, res) => {
  statusController.getStatusTypes()
    .then(statusTypes => {
      res.status(200).send(JSON.stringify({
        message: 'Status types found!',
        status_types: statusTypes
      }))
    })
    .catch(err => {
      res.status(404).send(JSON.stringify({
        error: `Could not find status types!`
      }))
    })
})

app.get('/organizations', (req, res) => {
  orgController.getOrganizations()
    .then(organizations => {
      res.status(200).send(JSON.stringify({
        message: 'Organizations found!',
        organizations: organizations
      }))
    })
    .catch(err => {
      res.status(404).send(JSON.stringify({
        error: err.message
      }))
    })
})

app.get('/organization/:orgId', (req, res) => {
  /** @type {number} */
  const orgId = req.params.orgId;

  orgController.getOrganization(orgId)
    .then(organization => {
      res.status(200).send(JSON.stringify({
        message: 'Organization found!',
        organization: organization
      }))
    })
    .catch(err => {
      res.status(404).send(JSON.stringify({
        error: err.message
      }))
    })
})

app.get('/organization/:orgId/members', (req, res) => {
  /** @type {number} */
  const orgId = req.params.orgId;

  orgController.getMembersByOrganization(orgId)
    .then(members => {
      res.status(200).send(JSON.stringify({
        message: 'Members found!',
        members: members
      }))
    })
    .catch(err => {
      res.status(404).send(JSON.stringify({
        error: err.message
      }))
    })
})

app.get('/ranks', (req, res) => {
  rankController.getRanks()
    .then(ranks => {
      res.status(200).send(JSON.stringify({
        message: 'Ranks found!',
        ranks: ranks
      }))
    })
    .catch(err => {
      res.status(404).send(JSON.stringify({
        error: err.message
      }))
    })
})

app.get('/branches', (req, res) => {
  branchController.getBranches()
    .then(branches => {
      res.status(200).send(JSON.stringify({
        message: 'Branches found!',
        branches: branches
      }))
    })
    .catch(err => {
      res.status(404).send(JSON.stringify({
        error: err.message
      }))
    })
})

app.get('/branch/:branchId', (req, res) => {
  /** @type {number} */
  const branchId = req.params.branchId;

  branchController.getBranch(branchId)
    .then(branch => {
      res.status(200).send(JSON.stringify({
        message: 'Branch found!',
        branch: branch
      }))
    })
})

app.get('/branch/:branchId/ranks', (req, res) => {
  /** @type {number} */
  const branchId = req.params.branchId;

  rankController.getRanksByMilitaryBranch(branchId)
    .then(ranks => {
      res.status(200).send(JSON.stringify({
        message: 'Ranks found!',
        ranks: ranks
      }))
    })
    .catch(err => {
      res.status(404).send(JSON.stringify({
        error: err.message
      }))
    })
})

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})