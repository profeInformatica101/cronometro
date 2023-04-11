$(function() {
  var timer = $('#timer');
  var hoursInput = $('#hours');
  var minutesInput = $('#minutes');
  var secondsInput = $('#seconds');
  var startButton = $('#start');
  var pauseButton = $('#pause');
  var resetButton = $('#reset');
  var time3Button = $('#time3');
  var time4Button = $('#time4');

  var time = 0;
  var interval;
  
  function saveTime() {
    var comment = prompt("Escriba un comentario para este tiempo:");
  
    if (comment !== null) {
      var savedTime = timer.text();
      var listItem = $('<li class="list-group-item"></li>').text(savedTime + ' - ' + comment);
      $('#savedTimes').append(listItem);
    }
  }
  
  $('#saveTime').click(saveTime);

  function updateTime() {
    var hours = parseInt(hoursInput.val());
    var minutes = parseInt(minutesInput.val());
    var seconds = parseInt(secondsInput.val());

    time = hours * 60 * 60 + minutes * 60 + seconds;
    updateTimerDisplay();
  }

  function updateTimerDisplay() {
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor((time % 3600) / 60);
    var seconds = time % 60;

    var hoursString = hours.toString().padStart(2, '0');
    var minutesString = minutes.toString().padStart(2, '0');
    var secondsString = seconds.toString().padStart(2, '0');

    timer.text(hoursString + ':' + minutesString + ':' + secondsString);
  }

  function startTimer() {
    interval = setInterval(function() {
      time--;
      if (time < 0) {
        clearInterval(interval);
        time = 0;
      }
      updateTimerDisplay();
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(interval);
  }
  function pauseTimer() {
    console.log("Pausing timer");
    clearInterval(interval);
  }

  function resetTimer() {
    pauseTimer();
    updateTime();
  }

  function setTime3() {
    hoursInput.val('00');
    minutesInput.val('03');
    secondsInput.val('00');
    updateTime();
  }

  function setTime4() {
    hoursInput.val('00');
    minutesInput.val('04');
    secondsInput.val('00');
    updateTime();
  }

  startButton.click(startTimer);
  pauseButton.click(pauseTimer);
  resetButton.click(resetTimer);
  time3Button.click(setTime3);
  time4Button.click(setTime4);

  updateTime();
});