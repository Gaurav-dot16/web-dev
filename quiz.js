const questions = [
    {
        question: "What is the capital of France?",
        answer: [
            {text: "Paris", correct: true},
            {text: "Berlin", correct: false},
            {text: "Madrid", correct: false},
            {text: "Rome", correct: false}
        ]
    },
    {
        question: "What planet is known as the Red Planet?",
        answer: [
            {text: "Earth", correct: false},
            {text: "Mars", correct: true},
            {text: "Jupiter", correct: false},
            {text: "Saturn", correct: false}
        ]
    },
    {
        question: "Who is the founder of Microsoft?",
        answer: [
            {text: "Bill Gates", correct: true},
            {text: "Steve Jobs", correct: false},
            {text: "Mark Zuckerberg", correct: false},
            {text: "Larry Page", correct: false}
        ]
    },
    {
        question: "Which country won the FIFA World Cup in 2018?",
        answer: [
            {text: "Germany", correct: false},
            {text: "Brazil", correct: false},
            {text: "France", correct: true},
            {text: "Argentina", correct: false}
        ]
    },
    {
        question: "How many players are there on a basketball team?",
        answer: [
            {text: "5", correct: true},
            {text: "7", correct: false},
            {text: "9", correct: false},
            {text: "11", correct: false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtonElement = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtonElement.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtonElement.firstChild) {
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtonElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function handleNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz);
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextQuestion();
    } else {
        startQuiz();
    }
});

startQuiz();
