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
const INITIAL_TIME = 60

function init () {
    resultsContainer.style.display = 'none'
}

const questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    },
    {
        question: 'Yes',
        answers: [
            {text: 'Yes', correct: true},
            {text: 'No', correct: false}
        ]
    },
    {
        question: 'No',
        answers: [
            {text: 'Yes', correct: false},
            {text: 'No', correct: true}
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
        if(timeLeft === 0 || shuffledQuestions.length === currentQuestionIndex) {
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
init();
