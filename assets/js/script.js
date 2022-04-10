// needs for Sat: create 5 Qs and As, read about how to 
// eventlisteners for on click events, array to hold answers for localStorage, stored questions to reference in JSON, 
// -- high score feature, timer feature, way to check accuracy of answer, add initials to high score
var body = document.body;
var questionsArray = ["Which creature did Han Solo cut open to keep Luke warm?",
                      "What did Luke want to get from Tosche station?",
                      "Which Jedi has a yellow lightsaber?",
                      "What species is Greedo?",
                      "What is the name of Jabba the Hutt's organ player?"
                    ]

var answersArray = [["Rancor", "Tauntaun", "Dewback", "Wampa"],
                    ["Catalytic converters", "Shield dampeners", "Power converters", "Binary switch"],
                    ["Ki Adi Mundi", "Plo Koon", "Saesee Tiin", "Agen Kolar"],
                    ["Weequay", "Aleena", "Rodian", "Nemodian"],
                    ["Figlin Danko", "Bols Roor", "Mawhonic", "Max Rebo"]

] 
                    
var correctAnswerArray = ["Tauntaun", "Power converters", "Plo Koon", "Rodian", "Max Rebo"]
var quizRulesButton = document.querySelector("#quizStart");

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
for (var i = 0; i < buttonsArray.length; i++) {
  buttonsArray[i].addEventListener("click", quizCheck);
}

li1.appendChild(btn1);
li2.appendChild(btn2);
li3.appendChild(btn3);
li4.appendChild(btn4);

// timer function
function countdown() {
    var timeLeft = 60;
      var timeInterval = setInterval(function () {
     // write down count value when time is > than 1 (as count is going down)
      if (timeLeft > 1) {
        timerEl.textContent = timeLeft + ' seconds remaining';
        timeLeft--;
      } 
      // change the string when the timer is at one to be grammatically correct
      else if (timeLeft === 1) {
        timerEl.textContent = timeLeft + ' second remaining';
        timeLeft--;
      } 
      // when timer has run out (less than 1) clear the interval and stop the quiz and run high score checker
      else {
        timerEl.textContent = '';
        clearInterval(timeInterval);
       // add in call to stop quiz;
      }
    }, 1000);
  }

  

var startQuiz = function(){
  // if quizRules div and button are visible, make them hidden
  var quizRules = document.querySelector(".quizRules");
  quizRules.style.visibility = "hidden";
  //make first set of questions visible (buttons linked to correct/incorrect)
  questionBox.textContent = questionsArray[0];
  body.appendChild(questionBox);

  //answersToFill.textContent = answersArray[0];
  btn1.textContent = answersArray[0][0];
  btn2.textContent = answersArray[0][1];
  btn3.textContent = answersArray[0][2];
  btn4.textContent = answersArray[0][3];
  // need to append the list structure before adding in list elements
  body.appendChild(listBox);
  listBox.appendChild(answersToFill);
  answersToFill.append(li1, li2, li3, li4);
  //start quiz timer
  countdown();
  
}
 //if button clicked is incorrect then decrease time by 10 and put out "Incorrect" text

var quizCheck = function(event) {
  var userChoice = event.target;
  //button !== text content of correctAnswerArray[i]) then run incorrect protocol
  if (userChoice.textContent !== correctAnswerArray[questionTracker]) {
    timeLeft -= 10;
    //add "incorrect answer" pop op
    //change button text color to red
   
}//if button clicked is correct then increase time by 10, change color of button to green and text to "correct!"
  else {
    timeLeft += 10;
    // add text "correct"
    userChoice.setAttribute("style", "color: green";)
  }

   // switch set of questions/answers regardless of correct/incorrect, after button clicked, hide current options and show next set
  // question tracker + 1
  questionTracker += 1;
  if (questionTracker > questionsArray.length) {
    // run endFunction
  }
  
// add high score score feature
// refer to dataset attributes of true/false when matching to trigger correct/incorrect responses



  quizRulesButton.addEventListener("click", startQuiz);
  
  
  

