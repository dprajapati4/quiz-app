const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");


let currentQuestion = {};
let acceptingAnswer = true;
let score = 0;
let questionCounter =0;
let avaliableQuestions= [];

let questions = [];

fetch('questions.json')
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions;
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });



//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

const startGame = () => {
    questionCounter = 0;
    score = 0;
    avaliableQuestions = [...questions]
    getNewQuestion();
}

const getNewQuestion = () => {
    if(avaliableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score)

        // Go to the end of game page
        return window.location.assign("/end.html")
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} / ${MAX_QUESTIONS}`

    // Update the progress bar
    progressBarFull.style.width = `${(questionCounter/ MAX_QUESTIONS) * 100}%`;


    const questionIndex = Math.floor(Math.random() * avaliableQuestions.length);
        currentQuestion = avaliableQuestions[questionIndex];
        question.innerText = currentQuestion.question;

        choices.forEach(choice => {
            const number = choice.dataset["number"]
            choice.innerText = currentQuestion["choice" + number];
        });

        avaliableQuestions.splice(questionIndex, 1);

        acceptingAnswer = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswer) return;

        acceptingAnswer = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classToApply === "correct"){
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {

            selectedChoice.parentElement.classList.remove(classToApply);

            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score +=num;

    scoreText.innerText = score;
}
