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
// const {startTimer } = require("./timer")

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
    getRandomQuiz()
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

const getExistingUserScore = async () => {
  try {
    const response = await fetch(
      `http://localhost:8080/scores/user/${username}`
    )
    const data = await response.json()

    return currentScore > data?.score
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

// const result = await getExistingUserScore();

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
      audio.pause()
      alert("Time's up!")
      if (result == null) {
        createScore()
      } else if (result) {
        updateScore()
      }

      time.style.color = 'black'
    }
  }, 1000)
}

async function createScore () {
  console.log('inside create score')

  console.log(
    'username ',
    username,
    ', score: ',
    currentScore,
    ', difficulty: ',
    difficulty
  )
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

},{}]},{},[1,2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzdGF0aWMvanMvaW5kZXguanMiLCJzdGF0aWMvanMvcXVpei5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBzb3VuZENhcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc291bmQtY2FyZCcpXHJcbmNvbnN0IGF1ZGlvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F1ZGlvJylcclxuY29uc3QgaWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzb3VuZC1jYXJkIGknKVxyXG5jb25zdCB1c2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXInKVxyXG5cclxuc291bmRDYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gIGNvbnNvbGUubG9nKCdpbnNpZGUgY2xpY2tlZCcpXHJcbiAgaWYgKGF1ZGlvLnBhdXNlZCkge1xyXG4gICAgaWNvbi5jbGFzc05hbWUgPSAnZmEtc29saWQgZmEtdm9sdW1lLWhpZ2gnXHJcbiAgICBhdWRpby5wbGF5KClcclxuICB9IGVsc2Uge1xyXG4gICAgYXVkaW8ucGF1c2UoKVxyXG4gICAgaWNvbi5jbGFzc05hbWUgPSAnZmEtc29saWQgZmEtdm9sdW1lLXhtYXJrJ1xyXG4gIH1cclxufSlcclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VybmFtZS1mb3JtJykuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHNob3dOZXh0KGUpKVxyXG5cclxuZnVuY3Rpb24gc2hvd05leHQoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBjb25zb2xlLmxvZygnaW5zaWRlIHN1Ym1pdCcpXHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lLWZvcm0nKVxyXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUtaW5wdXQnKVxyXG4gICAgY29uc3QgdXNlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyJylcclxuXHJcbiAgICBpZiAoaW5wdXQudmFsdWUudHJpbSgpICE9PSBcIlwiKSB7XHJcbiAgICAgICAgdXNlci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gICAgICAgIHVzZXIudGV4dENvbnRlbnQgKz0gaW5wdXQudmFsdWUudHJpbSgpOyBcclxuICAgICAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheS1idXR0b24nKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5LWJ1dHRvbnMnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnN0cnVjdGlvbi1idXR0b24nKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZWFkZXJib2FyZC1idXR0b24nKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gICAgfVxyXG59XHJcblxyXG5sZXQgYnV0dG9uc1Zpc2libGUgPSBmYWxzZVxyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXktYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgbGV0IGxhYmVscyA9IFsnZWFzeScsICdtZWRpdW0nLCAnaGFyZCddXHJcblxyXG4gIGxldCBidXR0b25TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXktYnV0dG9ucycpXHJcblxyXG4gIGlmIChidXR0b25zVmlzaWJsZSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgbGV0IG5ld0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXHJcbiAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgbmV3QnV0dG9uLmNsYXNzTmFtZSA9ICdidG4gYnRuLXN1Y2Nlc3MgZGlmZmljdWx0eS1jYXJkJ1xyXG4gICAgICAgIG5ld0J1dHRvbi5pZCA9ICdlYXN5J1xyXG4gICAgICB9IGVsc2UgaWYgKGkgPT09IDEpIHtcclxuICAgICAgICBuZXdCdXR0b24uY2xhc3NOYW1lID0gJ2J0biBidG4td2FybmluZyBkaWZmaWN1bHR5LWNhcmQnXHJcbiAgICAgICAgbmV3QnV0dG9uLmlkID0gJ21lZGl1bSdcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuZXdCdXR0b24uY2xhc3NOYW1lID0gJ2J0biBidG4tZGFuZ2VyIGRpZmZpY3VsdHktY2FyZCdcclxuICAgICAgICBuZXdCdXR0b24uaWQgPSAnaGFyZCdcclxuICAgICAgfVxyXG4gICAgICBuZXdCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBuYXZUb1F1aXoobmV3QnV0dG9uLmlkKSlcclxuICAgICAgbmV3QnV0dG9uLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWw+JHtsYWJlbHNbaV19PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIGBcclxuICAgICAgYnV0dG9uU2VjdGlvbi5hcHBlbmRDaGlsZChuZXdCdXR0b24pXHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGxldCBidXR0b25zVG9SZW1vdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGlmZmljdWx0eS1jYXJkJylcclxuICAgIGJ1dHRvbnNUb1JlbW92ZS5mb3JFYWNoKGJ1dHRvbiA9PiBidXR0b24ucmVtb3ZlKCkpXHJcbiAgfVxyXG4gIGJ1dHRvbnNWaXNpYmxlID0gIWJ1dHRvbnNWaXNpYmxlXHJcbn0pXHJcblxyXG5mdW5jdGlvbiBuYXZUb1F1aXooaWQpIHtcclxuY29uc3QgdXNlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyJylcclxuICAgIGNvbnN0IHVzZXJuYW1lID0gdXNlci50ZXh0Q29udGVudC5zdWJzdHJpbmcoOCk7XHJcbiAgICBjb25zb2xlLmxvZygndXNlcm5hbWUgJywgIHVzZXJuYW1lKVxyXG4gIGNvbnNvbGUubG9nKCdpbnNpZGUgYnV0dG9uJylcclxuICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGBxdWl6Lmh0bWw/ZGlmZmljdWx0eT0ke2lkfSZ1c2VyPSR7dXNlcm5hbWV9YFxyXG59XHJcbiIsIi8vIGNvbnN0IHtzdGFydFRpbWVyIH0gPSByZXF1aXJlKFwiLi90aW1lclwiKVxyXG5cclxuY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKVxyXG5jb25zdCBkaWZmaWN1bHR5ID0gdXJsUGFyYW1zLmdldCgnZGlmZmljdWx0eScpXHJcbmNvbnN0IHVzZXJuYW1lID0gdXJsUGFyYW1zLmdldCgndXNlcicpXHJcbmNvbnN0IHF1aXpUaXRsZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncXVpei10aXRsZScpXHJcbmNvbnN0IGZsYWdTb3VyY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmxhZycpXHJcbmNvbnN0IGNvdW50cnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY291bnRyeScpXHJcbmNvbnN0IGVudGVyQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZW50ZXItYnV0dG9uJylcclxuY29uc3QgdG90YWxTY29yZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3RhbC1zY29yZScpXHJcbmNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZW50ZXItYnV0dG9uJylcclxuY29uc3QgY2FwaXRhbENpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2l0eScpXHJcbmxldCBjaXR5ID0gJydcclxubGV0IGFucyA9ICcnXHJcblxyXG5xdWl6VGl0bGVFbGVtZW50LnRleHRDb250ZW50ICs9IGAke2RpZmZpY3VsdHl9YFxyXG5sZXQgY3VycmVudFNjb3JlID0gMFxyXG5cclxuY2FwaXRhbENpdHkuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgY2l0eSA9IGNhcGl0YWxDaXR5LnZhbHVlXHJcbiAgY29uc29sZS5sb2coJ1RoZSB2YWx1ZSBoYXMgY2hhbmdlZCB0bzogJyArIGNpdHkpXHJcbn0pXHJcblxyXG5jb25zdCBzaG93SW1hZ2UgPSBwbGFjZSA9PiB7XHJcbiAgZmxhZ1NvdXJjZS5zcmMgPSBwbGFjZT8uZmxhZ1xyXG4gIGNvdW50cnkudGV4dENvbnRlbnQgPSBwbGFjZT8uY291bnRyeVxyXG4gIGNvbnNvbGUubG9nKCdhbnMgJywgcGxhY2U/LmNhcGl0YWwudG9Mb3dlckNhc2UoKS50cmltKCkpXHJcbiAgY29uc29sZS5sb2coJ2NpdHkgJywgY2l0eS50b0xvd2VyQ2FzZSgpLnRyaW0oKSlcclxuICBpZiAocGxhY2U/LmNhcGl0YWwudG9Mb3dlckNhc2UoKS50cmltKCkgPT09IGNpdHkudG9Mb3dlckNhc2UoKS50cmltKCkpIHtcclxuICB9XHJcbn1cclxuXHJcbmJ1dHRvbnMuZm9yRWFjaChmdW5jdGlvbiAoYnV0dG9uKSB7XHJcbiAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgY2hlY2tTY29yZSgpXHJcbiAgICBnZXRSYW5kb21RdWl6KClcclxuICAgIGNhcGl0YWxDaXR5LnZhbHVlID0gJydcclxuICB9KVxyXG59KVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcclxuICBnZXRSYW5kb21RdWl6KClcclxuICBzdGFydFRpbWVyKGRpZmZpY3VsdHkpXHJcbn0pXHJcblxyXG5sZXQgZW50ZXJQcmVzc2VkID0gZmFsc2VcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInICYmICFlbnRlclByZXNzZWQpIHtcclxuICAgIGVudGVyUHJlc3NlZCA9IHRydWVcclxuICAgIGNoZWNrU2NvcmUoKVxyXG4gICAgZ2V0UmFuZG9tUXVpeigpXHJcbiAgICBjYXBpdGFsQ2l0eS52YWx1ZSA9ICcnXHJcbiAgfVxyXG59KVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XHJcbiAgICBlbnRlclByZXNzZWQgPSBmYWxzZVxyXG4gIH1cclxufSlcclxuXHJcbmNvbnN0IGdldFJhbmRvbVF1aXogPSAoKSA9PiB7XHJcbiAgZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9xdWl6L3F1ZXN0aW9ucycpXHJcbiAgICAudGhlbihyZXNwID0+IHJlc3AuanNvbigpKVxyXG4gICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdwbGFjZSAnLCBkYXRhKVxyXG4gICAgICBwbGFjZSA9IGRhdGFcclxuICAgICAgc2hvd0ltYWdlKGRhdGEpXHJcbiAgICAgIGFucyA9IGRhdGE/LmNhcGl0YWxcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goZSA9PiBjb25zb2xlLmxvZyhlKSlcclxufVxyXG5cclxuY29uc3QgY2hlY2tTY29yZSA9ICgpID0+IHtcclxuICBpZiAoYW5zLnRvTG93ZXJDYXNlKCkudHJpbSgpID09PSBjaXR5LnRvTG93ZXJDYXNlKCkudHJpbSgpKSB7XHJcbiAgICBjdXJyZW50U2NvcmUgKz0gMVxyXG4gICAgY29uc29sZS5sb2coJ2N1cnJlbnRTY29yZScsIGN1cnJlbnRTY29yZSlcclxuICAgIHRvdGFsU2NvcmUudGV4dENvbnRlbnQgPSBjdXJyZW50U2NvcmVcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGdldEV4aXN0aW5nVXNlclNjb3JlID0gYXN5bmMgKCkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxyXG4gICAgICBgaHR0cDovL2xvY2FsaG9zdDo4MDgwL3Njb3Jlcy91c2VyLyR7dXNlcm5hbWV9YFxyXG4gICAgKVxyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxyXG5cclxuICAgIHJldHVybiBjdXJyZW50U2NvcmUgPiBkYXRhPy5zY29yZVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvcjonLCBlcnJvcilcclxuICAgIHJldHVybiBudWxsXHJcbiAgfVxyXG59XHJcblxyXG4vLyBjb25zdCByZXN1bHQgPSBhd2FpdCBnZXRFeGlzdGluZ1VzZXJTY29yZSgpO1xyXG5cclxuZnVuY3Rpb24gc3RhcnRUaW1lciAoZGlmZmljdWx0eSkge1xyXG4gIGNvbnNvbGUubG9nKCdkaWZmaWN1bHR5OiBsaW5lIDggOiAnLCBkaWZmaWN1bHR5KVxyXG4gIGlmIChkaWZmaWN1bHR5ID09PSAnZWFzeScpIHtcclxuICAgIHRpbWVyID0gMTgwXHJcbiAgfSBlbHNlIGlmIChkaWZmaWN1bHR5ID09PSAnbWVkaXVtJykge1xyXG4gICAgdGltZXIgPSAxMjBcclxuICB9IGVsc2Uge1xyXG4gICAgdGltZXIgPSAxMFxyXG4gIH1cclxuICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8oJy9hc3NldHMvbWl4a2l0LWFsYXJtLWNsb2NrLWJlZXAtOTg4LndhdicpXHJcblxyXG4gIGNvbnN0IGludGVydmFsSWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICBtaW51dGVzID0gTWF0aC5mbG9vcih0aW1lciAvIDYwKVxyXG4gICAgc2Vjb25kcyA9IHRpbWVyICUgNjBcclxuXHJcbiAgICBtaW51dGVzID0gbWludXRlcyA8IDEwID8gJzAnICsgbWludXRlcyA6IG1pbnV0ZXNcclxuICAgIHNlY29uZHMgPSBzZWNvbmRzIDwgMTAgPyAnMCcgKyBzZWNvbmRzIDogc2Vjb25kc1xyXG5cclxuICAgIGNvbnN0IHRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGltZScpXHJcbiAgICB0aW1lLnRleHRDb250ZW50ID0gbWludXRlcyArICc6JyArIHNlY29uZHNcclxuXHJcbiAgICBpZiAodGltZXIgPD0gOCkge1xyXG4gICAgICB0aW1lLnN0eWxlLmNvbG9yID0gJ3JlZCdcclxuICAgICAgYXVkaW8ucGxheSgpXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKC0tdGltZXIgPCAwKSB7XHJcbiAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZClcclxuICAgICAgYXVkaW8ucGF1c2UoKVxyXG4gICAgICBhbGVydChcIlRpbWUncyB1cCFcIilcclxuICAgICAgaWYgKHJlc3VsdCA9PSBudWxsKSB7XHJcbiAgICAgICAgY3JlYXRlU2NvcmUoKVxyXG4gICAgICB9IGVsc2UgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgIHVwZGF0ZVNjb3JlKClcclxuICAgICAgfVxyXG5cclxuICAgICAgdGltZS5zdHlsZS5jb2xvciA9ICdibGFjaydcclxuICAgIH1cclxuICB9LCAxMDAwKVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVTY29yZSAoKSB7XHJcbiAgY29uc29sZS5sb2coJ2luc2lkZSBjcmVhdGUgc2NvcmUnKVxyXG5cclxuICBjb25zb2xlLmxvZyhcclxuICAgICd1c2VybmFtZSAnLFxyXG4gICAgdXNlcm5hbWUsXHJcbiAgICAnLCBzY29yZTogJyxcclxuICAgIGN1cnJlbnRTY29yZSxcclxuICAgICcsIGRpZmZpY3VsdHk6ICcsXHJcbiAgICBkaWZmaWN1bHR5XHJcbiAgKVxyXG4gIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgfSxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxyXG4gICAgICBzY29yZTogY3VycmVudFNjb3JlLFxyXG4gICAgICBkaWZmaWN1bHR5OiBkaWZmaWN1bHR5XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDo4MDgwL3Njb3JlJywgb3B0aW9ucylcclxuXHJcbiAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAxKSB7XHJcbiAgICBjb25zb2xlLmxvZygnc2NvcmUgY3JlYXRlZCcpXHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGBsZWFkZXJib2FyZC5odG1sP2RpZmZpY3VsdHk9JHtkaWZmaWN1bHR5fSZ1c2VyPSR7dXNlcm5hbWV9YFxyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmxvZygnZXJyb3InKVxyXG4gIH1cclxufVxyXG4iXX0=
