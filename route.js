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

app.get('/users', (req, res) => {
  viewUsers().then((users) => {
    const responseData = []
    for(const user in users) {
      responseData.push(users[user]);
    }
    res.send(responseData)
  });
});

app.get('/user/:regNum', (req, res) => {
  const params = req.params;
  viewUser(params.regNum).then((user) => {
    const { reg_No: registerNumber, name, DOB, department } = user[0];
    res.send({ registerNumber, name, DOB, department });
  });
});

app.post('/add_user', (req, res) => {
  const payload = {
    regNum : req.body.regNum,
    name : req.body.name,
    department : req.body.department,
    DOB : req.body.DOB
  }
  addUser(payload).then((result) => {
    res.send(result);
  }).catch((err) => {
    res.send(err);
  });
});

app.put('/updateUser', (req, res) => {
  console.log('API: Update called');
  const payload = {
    regNum : req.body.regNum,
    name : req.body.name,
    department : req.body.department,
    DOB : req.body.DOB
  }
  updateUser(payload).then(() => {
    res.send({
      statuscode : 200,
      status : "success",
      data : payload
    });
  });
});

app.delete('/deleteUser',(req, res) =>{
  console.log('API: Delete called');
  const regNum = req.body.regNum;
  deleteUser(regNum).then(() => {
    res.send({
      statuscode : 200,
      status : "success",
      data : {
        registerNumber : regNum
      }
    });
  });
});

app.listen(5000, () => {
  console.log('App running on 5000..');
});
