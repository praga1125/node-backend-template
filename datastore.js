const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'praga',
  password : 'vikipraga1125'
});

const initialize = () => {
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('Database connected...');

    connection.query('USE students', function (error, results) {
      if (error && error.code == 'ER_BAD_DB_ERROR' && error.errno == 1049){
        connection.query('CREATE DATABASE students', function (error, results) {
          if (error) throw error;
          console.log('student db created...');
        });
      }
      console.log('student db attached...');
    });
  });
}

const addUser = ({regNum, name, DOB ,department}) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO studentRecords VALUES(${parseInt(regNum)},"${name}","${department}","${DOB}");`
    connection.query(query , function(err) {
      if(err) reject('Duplicate user data.');
      resolve('Student data added.');
    });
  });
}

const viewUsers = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM studentRecords', function(error, results) {
      if(error) reject(error);
      resolve(results);
    });
  })
}

const viewUser = (regNum) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM studentRecords where reg_No='+regNum, (err, results) => {
      if(err) reject('No Student record found.',err);
      resolve(results);
    });
  });
}

const updateUser = ({regNum, name, department, DOB}) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE studentRecords SET name = "${name}", department = "${department}" , DOB = "${DOB}" WHERE reg_No = ${parseInt(regNum)};`;
    connection.query(query, (err, results) => {
      if(err) reject('Record update failed: ' , err);
      resolve(results);
    });
  });
}

const deleteUser = (regNum) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM studentRecords WHERE reg_No = ${parseInt(regNum)};` 
    console.log(query);
    connection.query(query, (err) => {
      if(err) reject('Delete failed: ', err)
      resolve();
    });
  });
}

module.exports = {
  initialize,
  addUser,
  viewUser,
  viewUsers,
  updateUser,
  deleteUser
}

/*

Synchronous: 

1. a=10;
2. function call
  function sum(num1, num2) {
    return num1 + num2;
  }
  sum(3,4);
3. class & object

Asynchronous:

1. File operations
2. Database operations
3. Server calls
*/
