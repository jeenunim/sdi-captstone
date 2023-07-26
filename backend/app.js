const express = require('express');
const app = express();
const port = 8080;
const knex = require('knex')(require('./knexfile.js')['development']);
const cookieParser = require('cookie-parser'); // the import of cookies
const cors = require('cors');
const { getMember, getMemberSubordinates, getMemberSupervisor, getMemberStatus, getMemberRank } = require('./controllers/member.js');
const { getMembers, getMembersStatus, getMembersSupervisor } = require('./controllers/members.js');
const { getStatusTypes, getMembersOfStatusType } = require('./controllers/status.js');

app.use(cors());
app.use(express.json());
app.use(cookieParser());

/**
 * @param {string} key - Expected key in req.body
 * @param {string} type - Expected req.body[key] type
 */
const guard = (key, type, req, res) => {
  if (key in req.body === false) {
    res.status(400).send(JSON.stringify({error: `Request must include '${key}'.`}));
    return;
  } else if (typeof(req.body[key]) !== type) {
    res.status(400).send(JSON.stringify({error: `'${key}' must be of type ${type}. Instead got ${typeof(req.body[key])}.`}));
    return;
  } else if (typeof(req.body[key]) === 'string' || typeof(req.body[key]) === 'object') {
    if (req.body[key].length === 0) {
      res.status(400).send(JSON.stringify({error: `'${key}' can not be emtpy.`}));
      return;
    }
  } else if (typeof(req.body[key]) === 'undefined') {
    res.status(400).send(JSON.stringify({error: `'${key}' is undefined.`}));
    return;
  }
}

/**
 * @param {number} memberId Member's database id
 * @returns {Promise<member>}
 */
const ifMemberExists = (memberId) => {
  return knex('member')
    .select('*')
    .where('id', memberId)
    .then(members => {
      const memberFound = members.length > 0;

      if (memberFound) {
        const member = members[0];

        return Promise.resolve(member)
      } else {
        return Promise.reject(new Error(`Could not find member of id '${memberId}'`))
      }
    })
}

app.get('/', (req, res) => {
  res.status(200).send(JSON.stringify({
    message: 'Success!'
  }))
})

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  knex('member')
    .select('*')
    .where('username', username)
    .where('password', password)
    .then(members => {
      const memberFound = members.length > 0
      if (memberFound) {
        const member = members[0];

        res.cookie('memberId', member.id, {httpOnly: true }); //prevent XSS

        res.status(200).send(JSON.stringify({
          message: 'Login success', 
          member: member
        }))
      } else {
        res.status(401).send(JSON.stringify({
          message: 'Invalid username/password'
        }))
      }
    })
    .catch(err => console.log(err))
})

app.post('/sign-up', (req, res) => {
  const { username } = req.body;

  knex('member')
    .where('username', username)
    .then(members => {
      const memberFound = members.length > 0;
      if (memberFound) {
        res.status(409).send(JSON.stringify({
          error: 'Username taken!'
        }));
      } else {
        guard('username', 'string', req, res);
        guard('password', 'string', req, res);
        guard('first_name', 'string', req, res);
        guard('last_name', 'string', req, res);

        const newMember = req.body;

        knex('member')
        .insert(newMember, ['*'])
        .then(members => {
          // Removing password from account variable before sending back to client
          const { password, ...member } = members[0];
          res.status(201).send(JSON.stringify({
            message: 'Successfully signed up!',
            member: member
          }));
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(400).send(JSON.stringify({
        error: err
      }));
    })
})

// Request all members
app.get('/members', (req, res) => {
  getMembers()
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
  getMembersStatus()
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

  getMembersOfStatusType(statusType)
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
  getMembersSupervisor()
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

  getMember(memberId)
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

  getMemberSubordinates(memberId)
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
  const { memberId } = req.params;
  const { supervisor_id } = req.body;

  ifMemberExists(memberId)
    .then(member => {
      ifMemberExists(supervisor_id)
        .then(supervisor => {
          knex('member')
            .where('id', memberId)
            .update({
              supervisor_id: supervisor_id
            }, ['*'])
            .then(members => {
              const { password, ...member } = members[0];
              res.status(200).send(JSON.stringify({
                message: 'Successfully updated supervisor!',
                member: member
              }));
            })
        })
        .catch(err => {
          res.status(404).send(JSON.stringify({
            error: `Could not find supervisor with id '${supervisor_id}'`
          }));
        })
    })
    .catch(err => {
      res.status(404).send(JSON.stringify({
        error: err
      }));
    })
})

// Get a member's supervisor
app.get('/member/:memberId/supervisor', (req, res) => {
  /** @type {number} */
  const memberId = req.params.memberId;

  getMemberSupervisor(memberId)
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

// Get member's status
app.get('/member/:memberId/status', (req, res) => {
  /** @type {number} */
  const memberId = req.params.memberId;

  getMemberStatus(memberId)
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

app.get('/member/:memberId/rank', (req, res) => {
  /** @type {number} */
  const memberId = req.params.memberId;

  getMemberRank(memberId)
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

app.get('/status_types', (req, res) => {
  getStatusTypes()
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

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})