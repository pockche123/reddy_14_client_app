(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const soundCard = document.getElementById('sound-card')
const audio = document.getElementById('audio')
const icon = document.querySelector('#sound-card i')
const user = document.getElementById('user')

soundCard.addEventListener('click', function () {
  console.log('inside clicked')
  if (audio.paused) {
    icon.className = 'fa-solid fa-volume-high'
    audio.play()
  } else {
    audio.pause()
    icon.className = 'fa-solid fa-volume-xmark'
  }
})

document.getElementById('username-form').addEventListener('submit', (e) => showNext(e))

function showNext(e) {
  e.preventDefault();
  console.log('inside submit')
    const form = document.getElementById('username-form')
    const input = document.getElementById('username-input')
    const user = document.getElementById('user')

    if (input.value.trim() !== "") {
        user.style.display = 'block'
        user.textContent += input.value.trim(); 
        form.style.display = 'none'
        document.getElementById('play-button').style.display = 'block'
        document.querySelector('.play-buttons').style.display = 'block'
        document.getElementById('instruction-button').style.display = 'block'
        document.getElementById('leaderboard-button').style.display = 'block'
    }
}

let buttonsVisible = false

document.getElementById('play-button').addEventListener('click', function () {
  let labels = ['easy', 'medium', 'hard']

  let buttonSection = document.querySelector('.play-buttons')

  if (buttonsVisible) {
    for (let i = 0; i < 3; i++) {
      let newButton = document.createElement('button')
      if (i === 0) {
        newButton.className = 'btn btn-success difficulty-card'
        newButton.id = 'easy'
      } else if (i === 1) {
        newButton.className = 'btn btn-warning difficulty-card'
        newButton.id = 'medium'
      } else {
        newButton.className = 'btn btn-danger difficulty-card'
        newButton.id = 'hard'
      }
      newButton.addEventListener('click', () => navToQuiz(newButton.id))
      newButton.innerHTML = `
                    <label>${labels[i]}</label>
                `
      buttonSection.appendChild(newButton)
    }
  } else {
    let buttonsToRemove = document.querySelectorAll('.difficulty-card')
    buttonsToRemove.forEach(button => button.remove())
  }
  buttonsVisible = !buttonsVisible
})

function navToQuiz(id) {
const user = document.getElementById('user')
    const username = user.textContent.substring(8);
    console.log('username ',  username)
  console.log('inside button')
  window.location.href = `quiz.html?difficulty=${id}&user=${username}`
}

},{}],2:[function(require,module,exports){
const urlParams = new URLSearchParams(window.location.search)
const difficulty = urlParams.get('difficulty')
const username = urlParams.get('user')
const quizTitleElement = document.getElementById('quiz-title')
const flagSource = document.getElementById('flag')
const country = document.getElementById('country')
const enterButton = document.getElementsByClassName('enter-button')
const totalScore = document.getElementById('total-score')
const buttons = document.querySelectorAll('.enter-button')
const capitalCity = document.getElementById('city')
let city = ''
let ans = ''
let userIsPresent = null

quizTitleElement.textContent += `${difficulty}`
let currentScore = 0

capitalCity.addEventListener('input', function () {
  city = capitalCity.value
  console.log('The value has changed to: ' + city)
})

const showImage = place => {
  flagSource.src = place?.flag
  country.textContent = place?.country
  console.log('ans ', place?.capital.toLowerCase().trim())
  console.log('city ', city.toLowerCase().trim())
  if (place?.capital.toLowerCase().trim() === city.toLowerCase().trim()) {
  }
}

buttons.forEach(function (button) {
  button.addEventListener('click', function (e) {
    e.preventDefault()
    checkScore()
    getExistingUserScore()
    getRandomQuiz()
    capitalCity.value = ''
  })
})

document.addEventListener('DOMContentLoaded', function () {
  getRandomQuiz()
  startTimer(difficulty)
})

let enterPressed = false

document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter' && !enterPressed) {
    enterPressed = true
    checkScore()
    getExistingUserScore()
    capitalCity.value = ''
  }
})

document.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    enterPressed = false
  }
})

const getRandomQuiz = () => {
  fetch('http://localhost:8080/quiz/questions')
    .then(resp => resp.json())
    .then(data => {
      console.log('place ', data)
      place = data
      showImage(data)
      ans = data?.capital
    })
    .catch(e => console.log(e))
}

const checkScore = () => {
  if (ans.toLowerCase().trim() === city.toLowerCase().trim()) {
    currentScore += 1
    console.log('currentScore', currentScore)
    totalScore.textContent = currentScore
  }
}

const getExistingUserScore = () => {
  fetch(`http://localhost:8080/scores/user/${username}`)
    .then(resp => resp.json())
    .then(data => {
      console.log('inside getExisitng', data[0].score)
      console.log('current score ', currentScore)

      if (currentScore > data[0].score) {
        userIsPresent = true
      } else if (currentScore <= data[0].score) {
        userIsPresent = false
      }
      console.log('userIsPresent: ', userIsPresent)
    })
    .catch(e => {
      console.log(e)
      console.log('not found ')
    })
}

function startTimer (difficulty) {
  console.log('difficulty: line 8 : ', difficulty)
  if (difficulty === 'easy') {
    timer = 180
  } else if (difficulty === 'medium') {
    timer = 120
  } else {
    timer = 10
  }
  let audio = new Audio('/assets/mixkit-alarm-clock-beep-988.wav')

  const intervalId = setInterval(function () {
    minutes = Math.floor(timer / 60)
    seconds = timer % 60

    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds

    const time = document.querySelector('#time')
    time.textContent = minutes + ':' + seconds

    if (timer <= 8) {
      time.style.color = 'red'
      audio.play()
    }

    if (--timer < 0) {
      clearInterval(intervalId)
      console.log('? ', userIsPresent)
      audio.pause()
      if (userIsPresent == undefined || userIsPresent == null) {
        createScore()
      } else if (userIsPresent) {
        updateScore()
      } else if (userIsPresent == false) {
        window.location.href = `leaderboard.html?difficulty=${difficulty}&user=${username}`
      }
      alert("Time's up!")

      time.style.color = 'black'
    }
  }, 1000)
}

async function createScore () {
  console.log('inside create score')

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      score: currentScore,
      difficulty: difficulty
    })
  }

  const response = await fetch('http://localhost:8080/score', options)

  if (response.status === 201) {
    console.log('score created')
    window.location.href = `leaderboard.html?difficulty=${difficulty}&user=${username}`
  } else {
    console.log('error')
  }
}

async function updateScore () {
  console.log('inside update score')

  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      score: currentScore
    })
  }
  const response = await fetch(
    `http://localhost:8080/score/user/${username}`,
    options
  )

  if (response.status === 200) {
    console.log('score created')
    window.location.href = `leaderboard.html?difficulty=${difficulty}&user=${username}`
  } else {
    console.log('error')
  }
}

},{}]},{},[1,2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzdGF0aWMvanMvaW5kZXguanMiLCJzdGF0aWMvanMvcXVpei5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBzb3VuZENhcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc291bmQtY2FyZCcpXHJcbmNvbnN0IGF1ZGlvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F1ZGlvJylcclxuY29uc3QgaWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzb3VuZC1jYXJkIGknKVxyXG5jb25zdCB1c2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXInKVxyXG5cclxuc291bmRDYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gIGNvbnNvbGUubG9nKCdpbnNpZGUgY2xpY2tlZCcpXHJcbiAgaWYgKGF1ZGlvLnBhdXNlZCkge1xyXG4gICAgaWNvbi5jbGFzc05hbWUgPSAnZmEtc29saWQgZmEtdm9sdW1lLWhpZ2gnXHJcbiAgICBhdWRpby5wbGF5KClcclxuICB9IGVsc2Uge1xyXG4gICAgYXVkaW8ucGF1c2UoKVxyXG4gICAgaWNvbi5jbGFzc05hbWUgPSAnZmEtc29saWQgZmEtdm9sdW1lLXhtYXJrJ1xyXG4gIH1cclxufSlcclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VybmFtZS1mb3JtJykuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHNob3dOZXh0KGUpKVxyXG5cclxuZnVuY3Rpb24gc2hvd05leHQoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBjb25zb2xlLmxvZygnaW5zaWRlIHN1Ym1pdCcpXHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lLWZvcm0nKVxyXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUtaW5wdXQnKVxyXG4gICAgY29uc3QgdXNlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyJylcclxuXHJcbiAgICBpZiAoaW5wdXQudmFsdWUudHJpbSgpICE9PSBcIlwiKSB7XHJcbiAgICAgICAgdXNlci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gICAgICAgIHVzZXIudGV4dENvbnRlbnQgKz0gaW5wdXQudmFsdWUudHJpbSgpOyBcclxuICAgICAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheS1idXR0b24nKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5LWJ1dHRvbnMnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnN0cnVjdGlvbi1idXR0b24nKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZWFkZXJib2FyZC1idXR0b24nKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gICAgfVxyXG59XHJcblxyXG5sZXQgYnV0dG9uc1Zpc2libGUgPSBmYWxzZVxyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXktYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgbGV0IGxhYmVscyA9IFsnZWFzeScsICdtZWRpdW0nLCAnaGFyZCddXHJcblxyXG4gIGxldCBidXR0b25TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXktYnV0dG9ucycpXHJcblxyXG4gIGlmIChidXR0b25zVmlzaWJsZSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgbGV0IG5ld0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXHJcbiAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgbmV3QnV0dG9uLmNsYXNzTmFtZSA9ICdidG4gYnRuLXN1Y2Nlc3MgZGlmZmljdWx0eS1jYXJkJ1xyXG4gICAgICAgIG5ld0J1dHRvbi5pZCA9ICdlYXN5J1xyXG4gICAgICB9IGVsc2UgaWYgKGkgPT09IDEpIHtcclxuICAgICAgICBuZXdCdXR0b24uY2xhc3NOYW1lID0gJ2J0biBidG4td2FybmluZyBkaWZmaWN1bHR5LWNhcmQnXHJcbiAgICAgICAgbmV3QnV0dG9uLmlkID0gJ21lZGl1bSdcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuZXdCdXR0b24uY2xhc3NOYW1lID0gJ2J0biBidG4tZGFuZ2VyIGRpZmZpY3VsdHktY2FyZCdcclxuICAgICAgICBuZXdCdXR0b24uaWQgPSAnaGFyZCdcclxuICAgICAgfVxyXG4gICAgICBuZXdCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBuYXZUb1F1aXoobmV3QnV0dG9uLmlkKSlcclxuICAgICAgbmV3QnV0dG9uLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWw+JHtsYWJlbHNbaV19PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIGBcclxuICAgICAgYnV0dG9uU2VjdGlvbi5hcHBlbmRDaGlsZChuZXdCdXR0b24pXHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGxldCBidXR0b25zVG9SZW1vdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGlmZmljdWx0eS1jYXJkJylcclxuICAgIGJ1dHRvbnNUb1JlbW92ZS5mb3JFYWNoKGJ1dHRvbiA9PiBidXR0b24ucmVtb3ZlKCkpXHJcbiAgfVxyXG4gIGJ1dHRvbnNWaXNpYmxlID0gIWJ1dHRvbnNWaXNpYmxlXHJcbn0pXHJcblxyXG5mdW5jdGlvbiBuYXZUb1F1aXooaWQpIHtcclxuY29uc3QgdXNlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyJylcclxuICAgIGNvbnN0IHVzZXJuYW1lID0gdXNlci50ZXh0Q29udGVudC5zdWJzdHJpbmcoOCk7XHJcbiAgICBjb25zb2xlLmxvZygndXNlcm5hbWUgJywgIHVzZXJuYW1lKVxyXG4gIGNvbnNvbGUubG9nKCdpbnNpZGUgYnV0dG9uJylcclxuICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGBxdWl6Lmh0bWw/ZGlmZmljdWx0eT0ke2lkfSZ1c2VyPSR7dXNlcm5hbWV9YFxyXG59XHJcbiIsImNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaClcclxuY29uc3QgZGlmZmljdWx0eSA9IHVybFBhcmFtcy5nZXQoJ2RpZmZpY3VsdHknKVxyXG5jb25zdCB1c2VybmFtZSA9IHVybFBhcmFtcy5nZXQoJ3VzZXInKVxyXG5jb25zdCBxdWl6VGl0bGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3F1aXotdGl0bGUnKVxyXG5jb25zdCBmbGFnU291cmNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZsYWcnKVxyXG5jb25zdCBjb3VudHJ5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvdW50cnknKVxyXG5jb25zdCBlbnRlckJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2VudGVyLWJ1dHRvbicpXHJcbmNvbnN0IHRvdGFsU2NvcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG90YWwtc2NvcmUnKVxyXG5jb25zdCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmVudGVyLWJ1dHRvbicpXHJcbmNvbnN0IGNhcGl0YWxDaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpdHknKVxyXG5sZXQgY2l0eSA9ICcnXHJcbmxldCBhbnMgPSAnJ1xyXG5sZXQgdXNlcklzUHJlc2VudCA9IG51bGxcclxuXHJcbnF1aXpUaXRsZUVsZW1lbnQudGV4dENvbnRlbnQgKz0gYCR7ZGlmZmljdWx0eX1gXHJcbmxldCBjdXJyZW50U2NvcmUgPSAwXHJcblxyXG5jYXBpdGFsQ2l0eS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICBjaXR5ID0gY2FwaXRhbENpdHkudmFsdWVcclxuICBjb25zb2xlLmxvZygnVGhlIHZhbHVlIGhhcyBjaGFuZ2VkIHRvOiAnICsgY2l0eSlcclxufSlcclxuXHJcbmNvbnN0IHNob3dJbWFnZSA9IHBsYWNlID0+IHtcclxuICBmbGFnU291cmNlLnNyYyA9IHBsYWNlPy5mbGFnXHJcbiAgY291bnRyeS50ZXh0Q29udGVudCA9IHBsYWNlPy5jb3VudHJ5XHJcbiAgY29uc29sZS5sb2coJ2FucyAnLCBwbGFjZT8uY2FwaXRhbC50b0xvd2VyQ2FzZSgpLnRyaW0oKSlcclxuICBjb25zb2xlLmxvZygnY2l0eSAnLCBjaXR5LnRvTG93ZXJDYXNlKCkudHJpbSgpKVxyXG4gIGlmIChwbGFjZT8uY2FwaXRhbC50b0xvd2VyQ2FzZSgpLnRyaW0oKSA9PT0gY2l0eS50b0xvd2VyQ2FzZSgpLnRyaW0oKSkge1xyXG4gIH1cclxufVxyXG5cclxuYnV0dG9ucy5mb3JFYWNoKGZ1bmN0aW9uIChidXR0b24pIHtcclxuICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBjaGVja1Njb3JlKClcclxuICAgIGdldEV4aXN0aW5nVXNlclNjb3JlKClcclxuICAgIGdldFJhbmRvbVF1aXooKVxyXG4gICAgY2FwaXRhbENpdHkudmFsdWUgPSAnJ1xyXG4gIH0pXHJcbn0pXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xyXG4gIGdldFJhbmRvbVF1aXooKVxyXG4gIHN0YXJ0VGltZXIoZGlmZmljdWx0eSlcclxufSlcclxuXHJcbmxldCBlbnRlclByZXNzZWQgPSBmYWxzZVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicgJiYgIWVudGVyUHJlc3NlZCkge1xyXG4gICAgZW50ZXJQcmVzc2VkID0gdHJ1ZVxyXG4gICAgY2hlY2tTY29yZSgpXHJcbiAgICBnZXRFeGlzdGluZ1VzZXJTY29yZSgpXHJcbiAgICBjYXBpdGFsQ2l0eS52YWx1ZSA9ICcnXHJcbiAgfVxyXG59KVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XHJcbiAgICBlbnRlclByZXNzZWQgPSBmYWxzZVxyXG4gIH1cclxufSlcclxuXHJcbmNvbnN0IGdldFJhbmRvbVF1aXogPSAoKSA9PiB7XHJcbiAgZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9xdWl6L3F1ZXN0aW9ucycpXHJcbiAgICAudGhlbihyZXNwID0+IHJlc3AuanNvbigpKVxyXG4gICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdwbGFjZSAnLCBkYXRhKVxyXG4gICAgICBwbGFjZSA9IGRhdGFcclxuICAgICAgc2hvd0ltYWdlKGRhdGEpXHJcbiAgICAgIGFucyA9IGRhdGE/LmNhcGl0YWxcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goZSA9PiBjb25zb2xlLmxvZyhlKSlcclxufVxyXG5cclxuY29uc3QgY2hlY2tTY29yZSA9ICgpID0+IHtcclxuICBpZiAoYW5zLnRvTG93ZXJDYXNlKCkudHJpbSgpID09PSBjaXR5LnRvTG93ZXJDYXNlKCkudHJpbSgpKSB7XHJcbiAgICBjdXJyZW50U2NvcmUgKz0gMVxyXG4gICAgY29uc29sZS5sb2coJ2N1cnJlbnRTY29yZScsIGN1cnJlbnRTY29yZSlcclxuICAgIHRvdGFsU2NvcmUudGV4dENvbnRlbnQgPSBjdXJyZW50U2NvcmVcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGdldEV4aXN0aW5nVXNlclNjb3JlID0gKCkgPT4ge1xyXG4gIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODAvc2NvcmVzL3VzZXIvJHt1c2VybmFtZX1gKVxyXG4gICAgLnRoZW4ocmVzcCA9PiByZXNwLmpzb24oKSlcclxuICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnaW5zaWRlIGdldEV4aXNpdG5nJywgZGF0YVswXS5zY29yZSlcclxuICAgICAgY29uc29sZS5sb2coJ2N1cnJlbnQgc2NvcmUgJywgY3VycmVudFNjb3JlKVxyXG5cclxuICAgICAgaWYgKGN1cnJlbnRTY29yZSA+IGRhdGFbMF0uc2NvcmUpIHtcclxuICAgICAgICB1c2VySXNQcmVzZW50ID0gdHJ1ZVxyXG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRTY29yZSA8PSBkYXRhWzBdLnNjb3JlKSB7XHJcbiAgICAgICAgdXNlcklzUHJlc2VudCA9IGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgY29uc29sZS5sb2coJ3VzZXJJc1ByZXNlbnQ6ICcsIHVzZXJJc1ByZXNlbnQpXHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKGUgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlKVxyXG4gICAgICBjb25zb2xlLmxvZygnbm90IGZvdW5kICcpXHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBzdGFydFRpbWVyIChkaWZmaWN1bHR5KSB7XHJcbiAgY29uc29sZS5sb2coJ2RpZmZpY3VsdHk6IGxpbmUgOCA6ICcsIGRpZmZpY3VsdHkpXHJcbiAgaWYgKGRpZmZpY3VsdHkgPT09ICdlYXN5Jykge1xyXG4gICAgdGltZXIgPSAxODBcclxuICB9IGVsc2UgaWYgKGRpZmZpY3VsdHkgPT09ICdtZWRpdW0nKSB7XHJcbiAgICB0aW1lciA9IDEyMFxyXG4gIH0gZWxzZSB7XHJcbiAgICB0aW1lciA9IDEwXHJcbiAgfVxyXG4gIGxldCBhdWRpbyA9IG5ldyBBdWRpbygnL2Fzc2V0cy9taXhraXQtYWxhcm0tY2xvY2stYmVlcC05ODgud2F2JylcclxuXHJcbiAgY29uc3QgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgIG1pbnV0ZXMgPSBNYXRoLmZsb29yKHRpbWVyIC8gNjApXHJcbiAgICBzZWNvbmRzID0gdGltZXIgJSA2MFxyXG5cclxuICAgIG1pbnV0ZXMgPSBtaW51dGVzIDwgMTAgPyAnMCcgKyBtaW51dGVzIDogbWludXRlc1xyXG4gICAgc2Vjb25kcyA9IHNlY29uZHMgPCAxMCA/ICcwJyArIHNlY29uZHMgOiBzZWNvbmRzXHJcblxyXG4gICAgY29uc3QgdGltZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aW1lJylcclxuICAgIHRpbWUudGV4dENvbnRlbnQgPSBtaW51dGVzICsgJzonICsgc2Vjb25kc1xyXG5cclxuICAgIGlmICh0aW1lciA8PSA4KSB7XHJcbiAgICAgIHRpbWUuc3R5bGUuY29sb3IgPSAncmVkJ1xyXG4gICAgICBhdWRpby5wbGF5KClcclxuICAgIH1cclxuXHJcbiAgICBpZiAoLS10aW1lciA8IDApIHtcclxuICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKVxyXG4gICAgICBjb25zb2xlLmxvZygnPyAnLCB1c2VySXNQcmVzZW50KVxyXG4gICAgICBhdWRpby5wYXVzZSgpXHJcbiAgICAgIGlmICh1c2VySXNQcmVzZW50ID09IHVuZGVmaW5lZCB8fCB1c2VySXNQcmVzZW50ID09IG51bGwpIHtcclxuICAgICAgICBjcmVhdGVTY29yZSgpXHJcbiAgICAgIH0gZWxzZSBpZiAodXNlcklzUHJlc2VudCkge1xyXG4gICAgICAgIHVwZGF0ZVNjb3JlKClcclxuICAgICAgfSBlbHNlIGlmICh1c2VySXNQcmVzZW50ID09IGZhbHNlKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgbGVhZGVyYm9hcmQuaHRtbD9kaWZmaWN1bHR5PSR7ZGlmZmljdWx0eX0mdXNlcj0ke3VzZXJuYW1lfWBcclxuICAgICAgfVxyXG4gICAgICBhbGVydChcIlRpbWUncyB1cCFcIilcclxuXHJcbiAgICAgIHRpbWUuc3R5bGUuY29sb3IgPSAnYmxhY2snXHJcbiAgICB9XHJcbiAgfSwgMTAwMClcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlU2NvcmUgKCkge1xyXG4gIGNvbnNvbGUubG9nKCdpbnNpZGUgY3JlYXRlIHNjb3JlJylcclxuXHJcbiAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgaGVhZGVyczoge1xyXG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICB9LFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICB1c2VybmFtZTogdXNlcm5hbWUsXHJcbiAgICAgIHNjb3JlOiBjdXJyZW50U2NvcmUsXHJcbiAgICAgIGRpZmZpY3VsdHk6IGRpZmZpY3VsdHlcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjgwODAvc2NvcmUnLCBvcHRpb25zKVxyXG5cclxuICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDEpIHtcclxuICAgIGNvbnNvbGUubG9nKCdzY29yZSBjcmVhdGVkJylcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYGxlYWRlcmJvYXJkLmh0bWw/ZGlmZmljdWx0eT0ke2RpZmZpY3VsdHl9JnVzZXI9JHt1c2VybmFtZX1gXHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUubG9nKCdlcnJvcicpXHJcbiAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVTY29yZSAoKSB7XHJcbiAgY29uc29sZS5sb2coJ2luc2lkZSB1cGRhdGUgc2NvcmUnKVxyXG5cclxuICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgbWV0aG9kOiAnUEFUQ0gnLFxyXG4gICAgaGVhZGVyczoge1xyXG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICB9LFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICBzY29yZTogY3VycmVudFNjb3JlXHJcbiAgICB9KVxyXG4gIH1cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxyXG4gICAgYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9zY29yZS91c2VyLyR7dXNlcm5hbWV9YCxcclxuICAgIG9wdGlvbnNcclxuICApXHJcblxyXG4gIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgY29uc29sZS5sb2coJ3Njb3JlIGNyZWF0ZWQnKVxyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgbGVhZGVyYm9hcmQuaHRtbD9kaWZmaWN1bHR5PSR7ZGlmZmljdWx0eX0mdXNlcj0ke3VzZXJuYW1lfWBcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc29sZS5sb2coJ2Vycm9yJylcclxuICB9XHJcbn1cclxuIl19
