const startButton = document.getElementById('start-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const resultsContainer = document.getElementById('results-container')
const scoreElement = document.getElementById('score')
const initialsInput = document.getElementById('initials')
const saveButton = document.getElementById('save-btn')


let shuffledQuestions, currentQuestionIndex
let score = 0
let timeLeft = 60

startButton.addEventListener('click', startGame)
saveButton.addEventListener('click', saveScore)

function startGame() {
    startButton.classList.add('hide')
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
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
const correct = selectedButton.dataset.correct
if (correct) {
    score++;
} else {
    timeLeft -= 10; // subtract 10 seconds for a wrong answer
}
if (shuffledQuestions.length > currentQuestionIndex + 1) {
    currentQuestionIndex++
    setNextQuestion()
} else {
    endGame()
}
}

function endGame() {
    questionContainerElement.classList.add('hide')
    resultsContainer.classList.remove('hide')
    scoreElement.innerText = score
}

function saveScore() {
    const initials = initialsInput.value
    const highscores = JSON.parse(localStorage.getItem('highscores')) || []
    const newScore = { score, initials }
    highscores.push(newScore)
    localStorage.setItem('highscores', JSON.stringify(highscores))
}

const questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    },
]