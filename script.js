// ALL GLOBAL VARIABLES
var button1 = document.getElementById("1");
var button2 = document.getElementById("2");
var button3 = document.getElementById("3");
var button4 = document.getElementById("4");
var theQuiz = document.getElementById("theQuiz");
var theScorePage = document.getElementById("theScorePage");
var firstName = document.getElementById("firstName");
var typedFirstName = document.getElementById("typedFirstName"); 
var theGameOver = document.getElementById("theGameOver");
var theEndOfGame = document.getElementById("theEndOfGame");
var scoreSubmission = document.getElementById("scoreSubmission"); 
var theEndingScore = document.getElementById("theEndingScore");
var theTopScore = document.getElementById("theTopScore");
var listedQuestions = document.getElementById("listedQuestions");
var theTimer = document.getElementById("theTimer");
var theStartButton = document.getElementById("theStartButton");
var theStartPage = document.getElementById("theStartPage");
var theScoreContainer = document.getElementById("theScoreContainer");


// END OF VARIABLES

// QUESTIONS


var theQtext = [{
    question: "What is the function of Array object that runs through each element of the array?",
    answer1: "concat()",
    answer2: "every()",
    answer3: "filter()",
    answer4: "forEach()",
    correctAnswer: "4",
},
{
    question: "Which of the following function of String object would compare a regular expression with a string?",
    answer1: "match()",
    answer2: "concat()",
    answer3: "replace()",
    answer4: "search()",
    correctAnswer: "1",
},
{
    question: "Which of the following function of String object produces an HTML hypertext link for requesting another URL?",
    answer1: "sup()",
    answer2: "small()",
    answer3: "link()",
    answer4: "sub()",
    correctAnswer: "3",
},
{
    question: "Which of the following statements is valid for the features of JavaScript?",
    answer1: "JavaScript is designed for creating network-centric applications.",
    answer2: "JavaScript is a lightweight, interpreted programming language.",
    answer3: "JavaScript is complementary to and integrated with Java.",
    answer4: "All",
},
{
    question: "Select a String function that finds the match between a regular expression and a string, and to replace the matched substring with a new substring?",
    answer1: "match()",
    answer2: "concat()",
    answer3: "replace()",
    answer4: "search()",
    correctAnswer: "3",
},
{
    question: "Which of the following functions of Number object would display output in exponential format?",
    answer1: "toExponential()",
    answer2: "toFixed()",
    answer3: "toPrecision()",
    answer4: "toLocaleString()",
    correctAnswer: "1",
},
{
    question: "Which of the following will return the type of the arguments passed to a function?",
    answer1: "None",
    answer2: "Both of the above",
    answer3: "using getType function",
    answer4: "using typeOf operator",
    correctAnswer: "4",
},
{
    question: "Which of the following methods removes the last element from an array and returns that element?",
    answer1: "pop()",
    answer2: "get()",
    answer3: "last()",
    answer4: "None",
    correctAnswer: "1",
},
];
// END OF QUESTIONS    
var theAmountofQ = 0;
var theTimerInt;
var theFinalAmountofQ = "theQtext.length";
var score = 0;
var correct;
var theAmountofTimeLeftover = 80;


function showScore() {
    theQuiz.style.display = "none";
    theGameOver.style.display = "flex";
    theEndingScore.innerHTML = "You got " + score + " out of " + theQtext.length + " correct!";
    clearInterval(theTimerInt);
    firstName.value = "";

}

function generateAQ() {
    theGameOver.style.display = "none";
    if (theAmountofQ === theFinalAmountofQ) {
        return showScore();
    }
    var currentQuestion = theQtext[theAmountofQ];
    listedQuestions.innerHTML = `<p>${currentQuestion.question}</p>`;
    button1.innerHTML = currentQuestion.answer1;
    button2.innerHTML = currentQuestion.answer2;
    button3.innerHTML = currentQuestion.answer3;
    button4.innerHTML = currentQuestion.answer4;
}

// STARTING QUIZ
function startQuiz() {
    theGameOver.style.display = "none";
    theStartPage.style.display = "none";
    generateAQ();
theStartButton.addEventListener("click", startQuiz);
    //Timer
    theTimerInt = setInterval(function () {
        theAmountofTimeLeftover--;
        theTimer.textContent = "Time left: " + theAmountofTimeLeftover;

        if (theAmountofTimeLeftover === 0) {
            clearInterval(theTimerInt);
            showScore();
        }
    }, 1000);
    theQuiz.style.display = "block";
}
function isAnswerCorrect(answer) {
    correct = theQtext[theAmountofQ].isAnswerCorrect;

    if (answer === correct && theAmountofQ !== theFinalAmountofQ) {
        score++;
        alert("That Is correct! :)");
        theAmountofQ++;
        generateAQ();
    } else if (answer !== correct && theAmountofQ !== theFinalAmountofQ) {
        alert("That Is not correct. :(");
        theAmountofQ++;
        generateAQ();
    } else {
        showScore();
    }
}
// END OF STARTING QUIZ

//SCORES
scoreSubmission.addEventListener("click", function largestScore() {
    if (firstName.value === "") {
        alert("Your first name cannot be blank");
        return false;
    } else {
        var allSavedScores = JSON.parse(localStorage.getItem("allSavedScores")) || [];
        var curentplayer = firstName.value.trim();
        var currentScore = {
            name: curentplayer,
            score: score
        };
        theScorePage.style.display = "block";
        theEndOfGame.style.display = "flex";
        theGameOver.style.display = "none";
        theScoreContainer.style.display = "flex";
        allSavedScores.push(currentScore);
        localStorage.setItem("allSavedScores", JSON.stringify(allSavedScores));
        generateTheScores();

    }

});

function generateTheScores() {
    typedFirstName.innerHTML = "";
    theTopScore.innerHTML = "";
    var theScores = JSON.parse(localStorage.getItem("allSavedScores")) || [];
    for (i = 0; i < theScores.length; i++) {
        var newFirstName = document.createElement("li");
        var newScore = document.createElement("li");
        newFirstName.textContent = theScores[i].name;
        newScore.textContent = theScores[i].score;
        typedFirstName.appendChild(newFirstName);
        theTopScore.appendChild(newScore);
    }
}

function showScore() {
    theStartPage.style.display = "none";
    theGameOver.style.display = "none";
    theScoreContainer.style.display = "flex";
    theScorePage.style.display = "block";
    theEndOfGame.style.display = "flex";

    generateTheScores();
}
// END OF SCORES
function clearScore() {
    window.localStorage.clear();
    typedFirstName.textContent = "";
    theTopScore.textContent = "";
}
function restartQuiz() {
    theScoreContainer.style.display = "none";
    theGameOver.style.display = "none";
    theStartPage.style.display = "flex";
    theAmountofTimeLeftover = 80;
    score = 0;
    theAmountofQ = 0;
}
