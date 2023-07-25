const express = require('express');
const app = express();
const port = 8080;
const knex = require('knex')(require('./knexfile.js')['development']);

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
  const promise = knex('member')
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
  return promise;
}

app.use(express.json());

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
        res.status(200).send({
          message: 'Login success', 
          member: member
        })
      } else {
        res.status(401).send({
          message: 'Invalid username/password'
        })
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
        error: err.message
      }));
    })
})

// Request all members
app.get('/members', (req, res) => {
  knex('member')
    .select('*')
    .then(members => {
      if (members.length > 0) {
        res.status(200).send(JSON.stringify({
          message: 'Members found!',
          members: members
        }));
      } else {
        res.status(404).send(JSON.stringify({
          error: 'Members could not be found'
        }));
      }
    })  
    .catch(err => console.log(err))
})

// Request a member
app.get('/member/:memberId', (req, res) => {
  const { memberId } = req.params;
  ifMemberExists(memberId)
    .then(member => {
      res.status(200).send(JSON.stringify({
        message: 'Member found!',
        member: member
      }));
    })
    .catch(err => {
      res.status(404).send(JSON.stringify({
        error: err
      }));
    })
})

// Request a supervisor's subordinates
app.get('/member/:memberId/subordinates', (req, res) => {
  const { memberId } = req.params;

  ifMemberExists(memberId)
    .then(member => {
      knex('member')
        .select('*')
        .where('supervisor_id', memberId)
        .then(subordinates => {
          if (subordinates.length > 0) {
            res.status(200).send(JSON.stringify({
              message: 'Subordinates found!',
              members: subordinates
            }));
          } else {
            res.status(404).send(JSON.stringify({
              error: `Could not find subordinates for supervisor of id '${memberId}'.` 
            }));
          }
        })
        .catch(err => console.log(err))
    })
    .catch(err => {
      res.status(404).send(JSON.stringify({
        error: err
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

// Update a member's supervisor
app.get('/member/:memberId/supervisor', (req, res) => {
  const { memberId } = req.params;

  ifMemberExists(memberId)
    .then(member => {
      const { supervisor_id } = member;
      ifMemberExists(supervisor_id)
        .then(supervisor => {
          res.status(200).send(JSON.stringify({
            message: 'Successfully updated supervisor!',
            member: member
          }));
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

// Requests all the supervisors
app.get('/supervisors', (req, res) => {
  knex('member')
    .select('*')
    .where('is_supervisor', true)
    .then(supervisors => {
      if (supervisors.length > 0) {
        res.status(200).send(JSON.stringify({
          message: 'Supervisors found!',
          members: supervisors
        }));
      } else {
        res.status(404).send(JSON.stringify({
          error: `Could not find supervisors.` 
        }));
      }
    })
})


app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})
