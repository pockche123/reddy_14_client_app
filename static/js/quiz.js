

// const {startTimer } = require("./timer")



const urlParams = new URLSearchParams(window.location.search);
const difficulty = urlParams.get('param');
const quizTitleElement = document.getElementById('quiz-title');

quizTitleElement.textContent += `${difficulty}`;

console.log("quiz difficulty ", difficulty)

// if (difficulty) {
//     startTimer(difficulty)
// }

