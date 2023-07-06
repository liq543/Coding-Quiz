const startButton = document.getElementById('start-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const resultsContainer = document.getElementById('results-container')
const quizContainer = document.getElementById('quiz-container')
const scoreElement = document.getElementById('score')
const initialsInput = document.getElementById('initials')
const saveButton = document.getElementById('save-btn')
const resetButton = document.getElementById('reset-btn')
const timerElement = document.getElementById('timer')
const answerStatusElement = document.getElementById('answer-status')
const scoreTrackerElement = document.getElementById('score-tracker')
const statusContainerElement = document.getElementById('status-container')
const highScoresButton = document.getElementById('high-scores-btn')
const highScoresContainer = document.getElementById('high-scores-container')
const highScoresList = document.getElementById('high-scores-list')
const backButton = document.getElementById('back-btn')
const INITIAL_TIME = 60

let timerInterval

function init () {
    resultsContainer.style.display = 'none'
    highScoresContainer.style.display = 'none'
}

const questions = [
    {
        question: 'Javascript is an ______ language.',
        answers: [
            { text: 'Object-Oriented', correct: true },
            { text: 'Object-Based', correct: false },
            { text: 'Procedural', correct: false},
            { text: 'None of the above', correct: false}
        ]
    },
    {
        question: 'Which of the following keywords is used to define a variable in Javascript?',
        answers: [
            { text: 'var', correct: false },
            { text: 'let', correct: false },
            { text: 'Both A and B', correct: true},
            { text: 'None of the above', correct: false}
        ]
    },
    {
        question: 'Which of the following methods is used to access HTML elements using Javascript?',
        answers: [
            { text: 'getElementbyId()', correct: false },
            { text: 'getElementsByClassName()', correct: false },
            { text: 'Both A and B', correct: true},
            { text: 'None of the above', correct: false}
        ]
    },
    {
        question: 'Upon encountering empty statements, what does the Javascript Interpreter do?',
        answers: [
            { text: 'Throws an error', correct: false },
            { text: 'Ignores the statments', correct: true },
            { text: 'Gives a warning', correct: false},
            { text: 'None of the above', correct: false}
        ]
    },
    {
        question: 'How can a datatype be declared to be a constant type?',
        answers: [
            { text: 'const', correct: true },
            { text: 'var', correct: false },
            { text: 'let', correct: false},
            { text: 'constant', correct: false}
        ]
    },
    {
        question: 'What does the Javascript “debugger” statement do?',
        answers: [
            { text: 'It will debug all the errors in the program at runtime.', correct: false },
            { text: 'It acts as a breakpoint in a program.', correct: true },
            { text: 'It will debug errors in the current statement if any.', correct: false},
            { text: 'All of the above.', correct: false}
        ]
    },
    {
        question: "When an operator's value is NULL, the typeof returned by the unary operator is:",
        answers: [
            { text: 'Boolean', correct: false },
            { text: 'Undefined', correct: false },
            { text: 'Object', correct: true},
            { text: 'Interger', correct: false}
        ]
    },
    {
        question: 'What is the output of the following code snippet? print(NaN === NaN);',
        answers: [
            { text: 'true', correct: false },
            { text: 'false', correct: true },
            { text: 'undefined', correct: false},
            { text: 'Error', correct: false}
        ]
    },
]

let shuffledQuestions, currentQuestionIndex
let score = 0
let timeLeft = 60

startButton.addEventListener('click', startGame)
saveButton.addEventListener('click', saveScore)

function startGame() {
    resetState()
    statusContainerElement.style.display = 'block'
    questionElement.innerText = ''
    startButton.classList.add('hide')
    resetButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    score = 0
    timeLeft = 60
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    timer()
}

function timer() {
    let timerInterval = setInterval(function() {
        timerElement.innerText = `Time: ${timeLeft}`
        timeLeft--;
        
        if(timeLeft <= 0 || shuffledQuestions.length === currentQuestionIndex) {
            timeLeft = 0; 
            timerElement.innerText = `Time: ${timeLeft}`;
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}



function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    questionElement.style.textAlign = 'center'
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    startButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    if (correct) {
        score++;
        answerStatusElement.innerText = 'Correct!'
    } else {
        timeLeft -= 10; // subtract 10 seconds for a wrong answer
        answerStatusElement.innerText = 'Wrong!'
    }
    // Update the score tracker every time an answer is selected
    scoreTrackerElement.innerText = `Score: ${score}`
if (shuffledQuestions.length > currentQuestionIndex + 1) {
    currentQuestionIndex++
    setNextQuestion()
} else {
    endGame()
}
}

function endGame() {
    resetState()
    clearInterval(timerInterval);
    quizContainer.style.display = 'none'
    resultsContainer.style.display = 'flex'
    questionElement.innerText = ''
    resultsContainer.classList.remove('hide')
    resetButton.classList.remove('hide')
    scoreElement.innerText = score
    statusContainerElement.style.display = 'none'
    scoreTrackerElement.innerText = ''
    answerStatusElement.innerText = ''
}

resetButton.addEventListener('click', resetGame)

function resetGame() {
    // reset game state here
    clearInterval(timerInterval);
    resultsContainer.style.display = 'none'
    quizContainer.style.display = 'flex'
    startButton.classList.remove('hide')
    resetButton.classList.add('hide')
    resultsContainer.classList.add('hide')
    score = 0
    currentQuestionIndex = 0
    timeLeft = INITIAL_TIME
    setNextQuestion()
    statusContainerElement.style.display = 'none'
    startGame()
}

function saveScore() {
    const initials = initialsInput.value
    const highscores = JSON.parse(localStorage.getItem('highscores')) || []
    const newScore = { score, initials }
    highscores.push(newScore)
    localStorage.setItem('highscores', JSON.stringify(highscores))
}

highScoresButton.addEventListener('click', showHighScores)
backButton.addEventListener('click', backToStart)

function showHighScores() {
    statusContainerElement.style.display = 'none'
    resultsContainer.style.display = 'none'
    quizContainer.style.display = 'none'

    highScoresContainer.style.display = 'flex'
    backButton.classList.remove('hide')

    const highscores = JSON.parse(localStorage.getItem('highscores')) || []
    
    highScoresList.innerHTML = ''

    highscores.forEach((scoreItem) => {
        const li = document.createElement('li')
        li.textContent = `${scoreItem.initials} - ${scoreItem.score}`
        highScoresList.appendChild(li)
    })
}

function backToStart() {
location.reload()
}

init();
