const {
  initialize,
  addUser,
  viewUser,
  viewUsers,
  updateUser,
  deleteUser
} = require('./datastore');

const express = require('express');
const app = express();

initialize();

app.use(express.urlencoded());
app.use(express.json());

app.get('/', (req, res) => {
  console.log('/ called...');
  res.send('Hello from route...');
});

app.get('/users', (req, res) => {

  const users = viewUsers().then((users) => {
    const responseData = []
    for(const user in users) {
      responseData.push(users[user]);
    }
    res.send(responseData)
  })
});

app.post('/add_user', (req, res) => {
  console.log('add user route called...', req.body);
  const { name } = req.body;
  usersDb.users.push(name);

  const response = {
    status: 'Success',
    data : usersDb.users
  } 
  res.send(response);
});

app.listen(5000, () => {
  console.log('App running on 5000..');
});
