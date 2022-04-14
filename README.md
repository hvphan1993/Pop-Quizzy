# Pop-Quizzy

## General Info
The purpose of this challenge was to create a quiz using html, css, and javascript elements that cycled through questions, utilized a responsive timer, and stored and presented the user's score upon completion.

## Creating the Timer
To create the timer feature, I had to first set up a div in the html that would store the #countdown id. This would be connected to the javascript as a function and used to house the timer for the user to view.

![countdown id](./assets/images/countdownID.png)

In javascript I created a function called countdown with a variable of timeInterval = setInterval(function ()) inside. This function adds text feedback to the screen to appraise the user of the time left and also iterates down to zero every second (starting from 60).

![countdown function with timeInterval and setInterval](./assets/images/countdownFunction.png)

At one second I edited the text to be grammatically correct.

![if statement within countdown that pushes time remaining text to user](./assets/images/countdownIfElseIfElse.png)

The above features were addressed with an if, else if, and else statement. The last else statement takes into account when the timer reaches zero and when this happens, the user is alerted of the time running out and the high score screen is brought up.

![user is alerted when time has run out](./assets/images/countdownZeroAlert.png)

### Time Adjustment Feature
For my quiz, I connected the timer to the result of a correct or incorrect answer. If a question is correct, the user gains 10 seconds to their score but they lose 10 seconds with an incorrect answer.

![time is given or taken away based on a correct or incorrect answer](./assets/images/resultOfCorrectOrIncorrect.png)

Also shown in this image is a visual change to the answer choice buttons to show the user whether they got an answer correct or incorrect. 

## Process of Setting Up Quiz Responsive Questions


### Quiz Button Features


## Setting Up High Score Storage


