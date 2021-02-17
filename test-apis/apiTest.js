const axios = require('axios');

// console.log('Before....');
// axios.get('https://opentdb.com/api.php?amount=10&category=18').then((res) => {
//     const { results: quizzes } = res.data
//     console.log('QUIZ DATA: ',quizzes);
//     // return
// });
// console.log('After....');

// axios.get('http://localhost:5000/users').then((res) => {
//     console.log('STUDENT DATA: ' ,res.data);
// })

// const quizzes = axios.get('https://opentdb.com/api.php?amount=10&category=18');



const getQuiz = async(numberOfQuiz) => {
    const quiz = await axios.get('https://opentdb.com/api.php?amount='+`${numberOfQuiz}`+'&category=18');
    // console.log(quiz.data);
    return quiz.data;
    // return axios.get('https://opentdb.com/api.php?amount='+`${numberOfQuiz}`+'&category=18').then((res) => {
    //     const { results: quizzes } = res.data
    //     return quizzes;
    // });
}

(async() => {
    const quizzes = await getQuiz(10)
    console.log(quizzes);      
})()
