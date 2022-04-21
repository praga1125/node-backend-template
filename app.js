const express = require('express');
const app = express();
const localStorage = require('local-storage');

// const http = require("http");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
   res.send({message: "Welcome to application"})
});

app.get('/students', (req, res) => {
    const studentIds = localStorage.get('studentIds') || [];
    const studentData = studentIds.map(studentId => {
        return {
            details: localStorage.get(studentId),
            id: studentId
        }
    })
    res.send({ data: studentData, statusCode: 200 })
})

app.post('/student', (req, res) => {
    const randomId = Math.ceil(Math.random()*1000000);
    const { name, deptName } = req.body; //  equals to const name = req.body.name;

    const studentIds = localStorage.get('studentIds') || [];
    studentIds.push(randomId);

    localStorage.set('studentIds', studentIds)
    const details = {name, deptName}
    localStorage.set(randomId, details);

    res.send({
        status:'success',
        statusCode: 201,
        data: { id: randomId, details }
    })
})

app.put('/student/:studentId' , (req, res) => {
    const { studentId } = req.params;
    const { name, deptName } = req.body;
    const details = { name, deptName };
    localStorage.set(studentId, details)
    console.log(studentId);
    res.send({statusCode: 203, data:    {
        id: studentId, details
    } })
})

app.delete('/student/:studentId' , (req, res) => {
    const { studentId } = req.params
    
    const remove = localStorage.remove(studentId)
    console.log(remove, '...##')
    res.send({statusCode: 203, message: 'Record deleted'})
})

app.post('/department',  (req, res) => {
    const { staffCount, deptName, id } = req.body;
    const departmentDetails = {deptName, id, staffCount};
    const deptIds = localStorage.get('deptIds') || [];
    deptIds.push(id);

    localStorage.set('deptIds', deptIds)
    localStorage.set(id, departmentDetails)
    res.send({
        statusCode : 200,
       data : departmentDetails, 
         
    })   
});

const getStudentCount = (id) =>  {
    const studentIds = localStorage.get('studentIds') || [];
    let studentCount = 0;
    studentIds.forEach(studentId => {
        const student = localStorage.get(studentId);
        if(student.deptName == id) {
            studentCount++;
        }
    });
    return studentCount;
}

app.get('/department/:id', (req, res) => {
    const { id } = req.params; // for check
    // const { deptIds } = localStorage.get('deptIds') || [];
    // const deptData = deptIds.map(deptId => {
    //     return {
    //         details: localStorage.get(deptId),
    //         id: deptId
    //     }
    // })
    const studentCount = getStudentCount(id);
    console.log(studentCount);
    const deptData = localStorage.get(id);

    res.send({ data: {...deptData, studentCount}, statusCode: 200 })
})
app.listen(3000, function() {
    console.log("server is running");
})

