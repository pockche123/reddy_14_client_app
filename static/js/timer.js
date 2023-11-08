const timerDisplayElement = document.getElementById("timer");

if (timerDisplayElement) {
  timerDisplayElement.addEventListener("click", startTimer);
}

function startTimer(difficulty) {
  console.log("difficulty: line 8 : ",difficulty)
  if (difficulty === "easy") {
    timer = 180;
  } else if (difficulty === "medium") {
    timer = 120;
  } else {
    timer = 60;
  }
  let audio = new Audio("/assets/mixkit-alarm-clock-beep-988.wav");

  

  const intervalId = setInterval(function () {
    minutes = Math.floor(timer / 60);
    seconds = timer % 60;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Update the display element with the remaining time
    const time = document.querySelector("#time");
    time.textContent = minutes + ":" + seconds;

    if (timer <= 8) {
      time.style.color = "red";
      audio.play();
    }

    if (--timer < 0) {
      clearInterval(intervalId);
      audio.pause();
      alert("Time's up!");
      time.style.color = "black";
    }
  }, 1000);
}


// module.exports = {startTimer}