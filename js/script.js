// WHEN the game is over * 
// THEN I can save my initials and score 

let gameReady = false
let timer = 10
let gameBtn = document.getElementById("startGameBtn")
let LBButton = document.getElementById("seeLeaderBoardBtn")
let categorySelector
let questionObject

/*----- LEADERBOARD FUNCTIONS -----*/

LBButton.addEventListener("click", () => {
    showLeaderBoard();
});

function showLeaderBoard() {
    console.log("showLeaderBoard called")
}

/*----- GAME FUNCTIONS -----*/
gameBtn.addEventListener("click", () => {
    getPlayerName(getCategory)
});
    //let playerName = getPlayerName()
   // playerName = getPlayerName()
    //getQuestions(triviaCat)
// event listener to trigger getPlayerName, getCategory
//  passes category into getQuestions FETCH function


//     let checkAJAX = setInterval(() => {
//         if (questionObject !== undefined) {
//             console.log("into if statement")
//             startQuestions()
//             clearInterval(checkAJAX)
//         } else {
//             console.log("into else statement")
//         }
//     }, 1000)
// });

function getPlayerName() {
    nameRowSelector = document.getElementById("name-row");
    nameRowSelector.classList.remove("d-none");
    $(document).ready(() => {
        $("#name-confirm").click((e) => {
            e.preventDefault();
            var name = $("#name-input").val();
            nameRowSelector.classList.add("d-none")
            getCategory(name)
        });
    });
};

function getCategory(name) {
    categoryRowSelector = document.getElementById("category-div");
    categoryRowSelector.classList.remove("d-none");
    //gameCat = prompt(`Let's play trivia ${name}! Pick a category by entering MOVIES, FILM, MATH or COMPUTERS`)
    //add this working above the cards
    categoryRowSelector.addEventListener("click", (event) => {
        triviaCat = event.target.getAttribute("data-apiID")
        getQuestions(triviaCat)
    });
};

function startQuestions(obj) {
    score = 0
    questionNumber = 0
    decrement = false
    showModal()
    setQuestion(questionNumber)
    startTimer(timer)
    checkCorrect() 
}

function checkCorrect() {
    $("#questionModal").on("click", (event) => {
        if ( event.target.getAttribute("data-istrue") === "true" ) {
            questionCorrect()
        } else {
            questionIncorrect()
        }
    })
}

function questionCorrect() {
    console.log('questionCorrect function')
    score += 10
    questionNumber++
    console.log(`${score} + ${timer} + ${questionNumber}`)
    if ( timer !== 0 && questionNumber < 9 ) {
        setQuestion(questionNumber)
    }
}

function questionIncorrect() {
    console.log('questionIncorrect function')
    questionNumber++
    setDecrement()
    console.log(`${score} + ${timer} + ${questionNumber}`)
    if ( timer !== 0 && questionNumber < 9 ) {
        setQuestion(questionNumber)
    }
}

function getQuestions(cat, startQuestions) {
    console.log(cat)
    fetch(`https://opentdb.com/api.php?amount=10&category=${cat}&type=multiple`)
        .then(response => response.json())
        .then(data => questionObject = data)
        .then(obj => this.startQuestions(obj))
        /// ??? why do I need 'this' here
}

function setDecrement() {
    decrement = true
}

function startTimer(time) {
    var myTimeStep = setInterval(function() { 
        if (decrement) {
            console.log(time)
            time -= 5
            decrement = false
        } else if ( time <= 0 || questionNumber === 9 ) {
            clearInterval(myTimeStep)
            endGame(score)
            // get time remaining variable out of function and add it to score?
        } else {
            console.log(time); 
            time = time - 1
        };
    }, 1000);
}

function endGame(score) {
    console.log(startTimer)
    console.log( 'endGame function ' + score );
};

/* set modal elements with question, correct and incorrect answers */
function setQuestion(questionIndex) {
    rightAnswerNumber = Math.floor(Math.random() * 4)
    // generates a random number to set the correct answer
    questionArray = [0,1,2,3]
    // array of possible question indexes
    questionArray.splice(rightAnswerNumber, 1);
    // removes the index of the right answer

    selectQuestionField = document.getElementById("question-text")
    selectCorrectField = document.getElementById(`question-field-${rightAnswerNumber}`)
    selectCorrectButton = document.getElementById(`button-${rightAnswerNumber}`)
    // select the question and correct answer elements

    selectQuestionField.innerHTML = questionObject.results[questionIndex].question
    selectCorrectField.innerHTML = questionObject.results[questionIndex].correct_answer
    selectCorrectButton.dataset.istrue = "true"
    // populate correct answer and question elements

    getIncorrectAnswers = questionObject.results[questionIndex].incorrect_answers
    // create an array of incorrect answers 

    for (var i = 0; i < questionArray.length; i++) {
        document.getElementById(`question-field-${questionArray[i]}`).innerHTML = getIncorrectAnswers[i]
        document.getElementById(`button-${questionArray[i]}`).dataset.istrue = "false"
    }
    // loop through the array of remaining answer indexs and set a correct answer at each 
};

/* use JQuery to toggle modal visibility */
function showModal() {
    $("#questionModal").modal();
};

