
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const containerElement =document.getElementById('container');
const headerElement= document.getElementById('big-heading');

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
// function to start game
function startGame() {
    console.log('started');
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    headerElement.classList.add('hide');
    containerElement.classList.remove('hide');
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}
// function to set next question
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// function to select answers
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove(hide);
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}
const questions = [
    {
        question: 'what element do you use to bold a text in html?',
        answers: [
            { text: '<br>', correct: false },
            { text: '<em>', correct: false },
            { text: '<strong>', correct: true },
            { text: '<span>', correct: false }
        ]
    },
    {
        question: 'which one of this is a JavaScript package manager?',
        answers: [
            { text: 'Node.js', correct: false },
            { text: 'Typescript', correct: false },
            { text: 'npm', correct: true },
            { text: 'Angular.js', correct: false }
        ]
    },
    {
        question: 'Which tool can you use to ensure code quality?',
        answers: [
            { text: 'Angular', correct: false },
            { text: 'jQuery', correct: false },
            { text: 'RequireJS', correct: false },
            { text: 'Eslint', correct: true }
        ]
    },
    {
        question: 'Who invented Javascript?',
        answers: [
            { text: 'Douglas Crockford', correct: false },
            { text: 'Sheryl Sandberg', correct: false },
            { text: 'Brendan Eich', correct: true },
            { text: 'Charles Babbage', correct: false }
        ]
    },
    {
        question: 'How do yo write "Hello World" ina an alert box?',
        answers: [
            { text: 'msg("Hello World");', correct: false },
            { text: 'alert("Hello World");', correct: true },
            { text: 'prompt("Hello World");', correct: false },
            { text: 'show("Hello World");', correct: false }
        ]
    }
];