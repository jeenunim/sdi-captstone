const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send(JSON.stringify({message: 'Success!'}))
})


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
        res.status(404).send(JSON.stringify({message: 'Member not found'}));
      }
    })
})

// Request a supervisor's subordinates
app.get('/member/:memberId/subordinates', (req, res) => {
  const memberId = req.params.memberId;
  knex('member')
    .select('*')
    .where('supervisor_id', memberId)
    .then(subordinates => {
      res.status(200).send(JSON.stringify(subordinates))
    })
});


app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})