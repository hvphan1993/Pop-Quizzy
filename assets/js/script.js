// needs for Sat: create 5 Qs and As, read about how to 
// eventlisteners for on click events, array to hold answers for localStorage, stored questions to reference in JSON, 
// -- high score feature, timer feature, way to check accuracy of answer, add initials to high score

var timerEl = document.querySelector("#countdown");

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
       // ;
      }
    }, 1000);
  }

  countdown();