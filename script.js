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
  var interval = null;
  
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
    timer.css('color', '#fff');  // Resetea el color del temporizador a blanco cada vez que se actualiza el tiempo.
    updateTimerDisplay();
  }


  function updateTimerDisplay() {
    var absoluteTime = Math.abs(time);
    var hours = Math.floor(absoluteTime / 3600);
    var minutes = Math.floor((absoluteTime % 3600) / 60);
    var seconds = absoluteTime % 60;
  
    var hoursString = hours.toString().padStart(2, '0');
    var minutesString = minutes.toString().padStart(2, '0');
    var secondsString = seconds.toString().padStart(2, '0');
  
    timer.text(hoursString + ':' + minutesString + ':' + secondsString);
  
    if (time < 0) {
      timer.css('color', 'red');
    } else {
      timer.css('color', '#fff');
    }
  }
  function startTimer() {
    if (interval) {
      return;
    }
  
    interval = setInterval(function() {
      time--;
      updateTimerDisplay();
    }, 1000);
  }
  
  function pauseTimer() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
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
