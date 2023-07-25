const express = require('express');
const app = express();
const port = 8080;
const knex = require('knex')(require('./knexfile.js')['development']);
const cookieParser = require('cookie-parser');

/**
 * @param {string} key - Expected key in req.body
 * @param {string} type - Expected req.body[key] type
 */
const guard = (key, type, req, res) => {
  if (key in req.body === false) {
    res.status(400).send(JSON.stringify({ error: `Request must include '${key}'.` }));
    return new Error(`Request must include '${key}'.`);
  } else if (typeof req.body[key] !== type) {
    res.status(400).send(JSON.stringify({ error: `'${key}' must be of type ${type}. Instead got ${typeof(req.body[key])}.` }));
    return new Error(`'${key}' must be of type ${type}. Instead got ${typeof(req.body[key])}.`);
  } else if (typeof req.body[key] === 'string' || typeof req.body[key] === 'object') {
    if (req.body[key].length === 0) {
      res.status(400).send(JSON.stringify({ error: `'${key}' can not be empty.` }));
      return new Error(`'${key}' can not be empty.`);
    }
  } else if (typeof req.body[key] === 'undefined') {
    res.status(400).send(JSON.stringify({ error: `'${key}' is undefined.` }));
    return new Error(`'${key}' is undefined.`);
  }
}

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.status(200).send(JSON.stringify({ message: 'Success!' }));
});

app.post('/sign-up', (req, res) => {
  const { username } = req.body;
  knex('member')
    .where('username', username)
    .then(members => {
      const accountFound = members.length > 0;
      if (accountFound) {
        res.status(409).send(JSON.stringify({ error: 'An account with that username already exists' }));
      } else {
        const newAccount = req.body;
        guard('username', 'string', req, res);
        guard('password', 'string', req, res);
        guard('first_name', 'string', req, res);
        guard('last_name', 'string', req, res);

        // Save the username in the cookie
        res.cookie('member_username', username, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

        res.status(200).send(JSON.stringify({ message: 'Account created successfully' }));
      }
    })
    .catch(err => console.log(err))
})

// Request all members
app.get('/members', (req, res) => {
  knex('member')
    .select('*')
    .then(members => {
      if (members.length > 0) {
        res.status(200).send(JSON.stringify(members));
      } else {
        res.status(404).send(JSON.stringify({ error: 'Members could not be found' }));
      }
    })
    .catch(err => console.log(err))
})

// Request a member
app.get('/member/:memberId', (req, res) => {
  const memberId = req.params.memberId;
  knex('member')
    .select('*')
    .where('id', memberId)
    .then(members => {
      if (members.length > 0) {
        const member = members[0];
        res.status(200).send(JSON.stringify(member));
      } else {
        res.status(404).send(JSON.stringify({ error: 'Member not found' }));
      }
    })
    .catch(err => console.log(err))
})

// Request a supervisor's subordinates
app.get('/member/:memberId/subordinates', (req, res) => {
  const memberId = req.params.memberId;
  knex('member')
    .select('*')
    .where('supervisor_id', memberId)
    .then(subordinates => {
      if (subordinates.length > 0) {
        res.status(200).send(JSON.stringify(subordinates));
      } else {
        res.status(404).send(JSON.stringify({ error: `Could not find subordinates for supervisor of id '${memberId}'.` }));
      }
    })
    .catch(err => console.log(err))
});


app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
