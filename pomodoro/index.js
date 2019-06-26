const FIVE_MINUTES_IN_SECONDS = 300;
const TEN_MINUTES_IN_SECONDS = 600;
const FIFTEEN_MINUTES_IN_SECONDS = 900;

let timeInSeconds = FIVE_MINUTES_IN_SECONDS;
let isCounting = false;

const startButton = document.querySelector('.start-button');
const fiveMinutesButton = document.querySelector('.five-minutes');
const tenMinutesButton = document.querySelector('.ten-minutes');
const fifteenMinutesButton = document.querySelector('.fifteen-minutes');

document.querySelector('.timer').innerHTML = prettyPrintSeconds(timeInSeconds);

startButton.addEventListener('click', function(){
  isCounting = !isCounting;
});

fiveMinutesButton.addEventListener('click', function(){
  timeInSeconds = FIVE_MINUTES_IN_SECONDS;
  isCounting = true;
});

tenMinutesButton.addEventListener('click', function(){
  timeInSeconds = TEN_MINUTES_IN_SECONDS;
  isCounting = true;
});

fifteenMinutesButton.addEventListener('click', function(){
  timeInSeconds = FIFTEEN_MINUTES_IN_SECONDS;
  isCounting = true;
});

function countDown () {
  if (!isCounting) {
    return;
  }

  if (timeInSeconds > 0) {
    timeInSeconds = timeInSeconds - 1;
  }

  document.querySelector('.timer').innerHTML = prettyPrintSeconds(timeInSeconds);
}

setInterval(countDown, 1000);



function prettyPrintSeconds(time) {
  var seconds_number = parseInt(time, 10);
  var hours   = Math.floor(seconds_number / 3600);
  var minutes = Math.floor((seconds_number - (hours * 3600)) / 60);
  var seconds = seconds_number - (hours * 3600) - (minutes * 60);

  // if (hours < 10) {hours = '0'+hours;}
  if (minutes < 10) {minutes = '0'+minutes;}
  if (seconds < 10) {seconds = '0'+seconds;}
  // return `${hours}:${minutes}:${seconds}`;
  return `${minutes}:${seconds}`;
}
