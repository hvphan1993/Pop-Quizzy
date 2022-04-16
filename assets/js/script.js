// eventlisteners for on click events, array to hold answers for localStorage, stored questions to reference in JSON,
// -- high score feature, timer feature, way to check accuracy of answer, add initials to high score
var body = document.body;
var scoreSubmit = document.getElementById("scores");
scoreSubmit.style.visibility = "hidden";
var questionsArray = [
  "Which creature did Han Solo cut open to keep Luke warm?",
  "What did Luke want to get from Tosche station?",
  "Which Jedi has a yellow lightsaber?",
  "What species is Greedo?",
  "What is the name of Jabba the Hutt's organ player?",
];

var answersArray = [
  ["Rancor", "Tauntaun", "Dewback", "Wampa"],
  [
    "Catalytic converters",
    "Shield dampeners",
    "Power converters",
    "Binary switch",
  ],
  ["Ki Adi Mundi", "Plo Koon", "Saesee Tiin", "Agen Kolar"],
  ["Weequay", "Aleena", "Rodian", "Nemodian"],
  ["Figlin Danko", "Bols Roor", "Mawhonic", "Max Rebo"],
];

var correctAnswerArray = [
  "Tauntaun",
  "Power converters",
  "Plo Koon",
  "Rodian",
  "Max Rebo",
];
var quizRulesButton = document.querySelector("#quizStart");
var noAnswer = false;
var timeLeft = 0;

var timerEl = document.querySelector("#countdown");
var questionTracker = 0; // use as index, if question tracker is -something- then set up questions and answers, set new function of Answer checker to plug in Qs and answers
var questionBox = document.createElement("h1");
questionBox.classList.add("questionBox");
var listBox = document.createElement("div");
listBox.classList.add("answerChoices");
var answersToFill = document.createElement("ol");
var li1 = document.createElement("li");
var li2 = document.createElement("li");
var li3 = document.createElement("li");
var li4 = document.createElement("li");

var btn1 = document.createElement("button");
var btn2 = document.createElement("button");
var btn3 = document.createElement("button");
var btn4 = document.createElement("button");

var buttonsArray = [btn1, btn2, btn3, btn4];

li1.appendChild(btn1);
li2.appendChild(btn2);
li3.appendChild(btn3);
li4.appendChild(btn4);

var initialsInput = document.getElementById("initials");
var submitInitials = document.getElementById("submit");
var finalScore = 60;

var scoreDisplay = document.createElement("div");
scoreDisplay.classList.add("scoreDisplay");
body.appendChild(scoreDisplay);
scoreDisplay.style.visibility = "hidden";

// timer function
function countdown() {
  if ((timerEl.style.visibility = "hidden")) {
    timerEl.style.visibility = "visible";
  }
  timeLeft = 60;

  var timeInterval = setInterval(function () {
    // write down count value when time is > than 1 (as count is going down)
    if (timeLeft > 1) {
      timerEl.textContent = timeLeft + " seconds remaining";
      timeLeft--;
    }
    // change the string when the timer is at one to be grammatically correct
    else if (timeLeft === 1) {
      timerEl.textContent = timeLeft + " second remaining";
      timeLeft--;
    }
  // when timer has run out (less than 1) clear the interval and stop the quiz and run high score checker
    else {
      timerEl.textContent = "";
      clearInterval(timeInterval);
      alert(
        "Oh no it looks like your time is up! Let's check out the scores list!"
      );
      // link to high scores list
      displayScores();
    }
    // add in condition to stop timer upon quiz completion (avoid counting down to zero)
 if (questionTracker > questionsArray.length - 1) {
    clearInterval(timeInterval);
    timerEl.textContent = "Quiz Complete"
    }

  }, 1000);
}

function scoreTracker() {
  var user = {
    initials: initialsInput.value.trim(),
    score: finalScore,
  };
  var i = 0;
  var breakOut = false;
  while (breakOut == false) {
    // identifying where new score will be placed
    if (i == 10) {
      breakOut = true;
    } else if (
      JSON.parse(window.localStorage.getItem(i))["score"] > finalScore
    ) {
      i++;
      console.log("iterate");
    } else {
      breakOut = true;
    }
  }
  // if new score placed into list, bump other scores down
  if (i < 10) {
    for (j = 9; j > i; j--) {
      window.localStorage.setItem(j, window.localStorage.getItem(j - 1));
    }
    window.localStorage.setItem(i, JSON.stringify(user));
  }
  displayScores();
}

// add scores to score list and append to body at appropriate time
function displayScores() {
  scoreSubmit.style.visibility = "hidden";
  scoreDisplay.style.visibility = "visible";
  var quizRules = document.querySelector(".quizRules");
  quizRules.style.visibility = "hidden";
  scoreDisplay.innerHTML = '';
  questionBox.style.visibility = "hidden";
  listBox.style.visibility = "hidden";
  questionTracker = questionsArray.length + 1;


  var allHighScores = [];
  i = 0;

  while (i < 10) {
    allHighScores.push(JSON.parse(localStorage.getItem(i)));
    i++;
  }
  console.log(i);
  var highScoreList = document.createElement("ol");

  for (i = 0; i < allHighScores.length; i++) {
    if (allHighScores[i]["score"] != -1) {
      var myEntry = document.createElement("li");
      myEntry.innerText =
        allHighScores[i]["initials"] + " - " + allHighScores[i]["score"];
      highScoreList.appendChild(myEntry);
    }
  }

  scoreDisplay.appendChild(highScoreList);
}

var startQuiz = function () {
  // initialize high scores

  if (window.localStorage.length == 0) {
    for (var i = 0; i < 10; i++) {
      var user = {
        initials: 0,
        score: -1,
      };

      window.localStorage.setItem(i, JSON.stringify(user));
    }
  }

  // if quizRules div and button are visible, make them hidden
  var quizRules = document.querySelector(".quizRules");
  quizRules.style.visibility = "hidden";
  //make first set of questions visible (buttons linked to correct/incorrect)
  questionBox.textContent = questionsArray[questionTracker];
  body.appendChild(questionBox);

  //answersToFill.textContent = answersArray[0]; changes according to question number
  btn1.textContent = answersArray[questionTracker][0];
  btn2.textContent = answersArray[questionTracker][1];
  btn3.textContent = answersArray[questionTracker][2];
  btn4.textContent = answersArray[questionTracker][3];
  // need to append the list structure before adding in list elements
  body.appendChild(listBox);
  listBox.appendChild(answersToFill);
  answersToFill.append(li1, li2, li3, li4);
  //start quiz timer

  countdown();
};
//if button clicked is incorrect then decrease time by 10 and put out "Incorrect" text

function quizCheck(event) {
  if (noAnswer === false) {
    noAnswer = true;
    var userChoice = event.target;
    //button !== text content of correctAnswerArray[i]) then run incorrect protocol
    if (userChoice.textContent !== correctAnswerArray[questionTracker]) {
      timeLeft -= 10;
      //add "incorrect answer" pop up
      //change button text color to red
      userChoice.style.backgroundColor = "red";
    } //if button clicked is correct then increase time by 10
    else {
      timeLeft += 10;
      // add text "correct" and change color of button to green
      userChoice.style.backgroundColor = "green";
    }

    // switch set of questions/answers regardless of correct/incorrect

    // slight delay to view result
    setTimeout(function () {
      if (questionTracker > questionsArray.length - 1) {
        // pop up high score submission box
        questionBox.style.visibility = "hidden";
        listBox.style.visibility = "hidden";
        scoreSubmit.style.visibility = "visible";
        console.log(scoreSubmit.style.visibility);
        alert("Your score is " + timeLeft + " ! Let's see how it compares!");
        // timerEl.style.visibility = "hidden";
        finalScore = timeLeft;
        // stopCountdown();
      } else {
        questionBox.textContent = questionsArray[questionTracker];
        btn1.textContent = answersArray[questionTracker][0];
        btn2.textContent = answersArray[questionTracker][1];
        btn3.textContent = answersArray[questionTracker][2];
        btn4.textContent = answersArray[questionTracker][3];

        userChoice.style.backgroundColor = "white";
        console.log(questionTracker);
      }
      noAnswer = false;
    }, 1000);
    questionTracker++; // question tracker + 1
  }
}

// refer to dataset attributes of true/false when matching to trigger correct/incorrect responses

quizRulesButton.addEventListener("click", startQuiz);

for (var i = 0; i < buttonsArray.length; i++) {
  buttonsArray[i].addEventListener("click", quizCheck);
}
quizRulesButton.addEventListener("click", function handleClick(event) {
  // "parent"
  console.log(event.target.parentElement.id);
});

submitInitials.addEventListener("click", scoreTracker);

document.getElementById("viewHighScores").addEventListener("click", displayScores);
