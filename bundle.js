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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzdGF0aWMvanMvaW5kZXguanMiLCJzdGF0aWMvanMvcXVpei5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IHNvdW5kQ2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb3VuZC1jYXJkJylcclxuY29uc3QgYXVkaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXVkaW8nKVxyXG5jb25zdCBpY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NvdW5kLWNhcmQgaScpXHJcbmNvbnN0IHVzZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcicpXHJcblxyXG5zb3VuZENhcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgY29uc29sZS5sb2coJ2luc2lkZSBjbGlja2VkJylcclxuICBpZiAoYXVkaW8ucGF1c2VkKSB7XHJcbiAgICBpY29uLmNsYXNzTmFtZSA9ICdmYS1zb2xpZCBmYS12b2x1bWUtaGlnaCdcclxuICAgIGF1ZGlvLnBsYXkoKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBhdWRpby5wYXVzZSgpXHJcbiAgICBpY29uLmNsYXNzTmFtZSA9ICdmYS1zb2xpZCBmYS12b2x1bWUteG1hcmsnXHJcbiAgfVxyXG59KVxyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lLWZvcm0nKS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4gc2hvd05leHQoZSkpXHJcblxyXG5mdW5jdGlvbiBzaG93TmV4dChlKSB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGNvbnNvbGUubG9nKCdpbnNpZGUgc3VibWl0JylcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUtZm9ybScpXHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VybmFtZS1pbnB1dCcpXHJcbiAgICBjb25zdCB1c2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXInKVxyXG5cclxuICAgIGlmIChpbnB1dC52YWx1ZS50cmltKCkgIT09IFwiXCIpIHtcclxuICAgICAgICB1c2VyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgICAgICAgdXNlci50ZXh0Q29udGVudCArPSBpbnB1dC52YWx1ZS50cmltKCk7IFxyXG4gICAgICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5LWJ1dHRvbicpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXktYnV0dG9ucycpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luc3RydWN0aW9uLWJ1dHRvbicpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xlYWRlcmJvYXJkLWJ1dHRvbicpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgICB9XHJcbn1cclxuXHJcbmxldCBidXR0b25zVmlzaWJsZSA9IGZhbHNlXHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheS1idXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICBsZXQgbGFiZWxzID0gWydlYXN5JywgJ21lZGl1bScsICdoYXJkJ11cclxuXHJcbiAgbGV0IGJ1dHRvblNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheS1idXR0b25zJylcclxuXHJcbiAgaWYgKGJ1dHRvbnNWaXNpYmxlKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xyXG4gICAgICBsZXQgbmV3QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcclxuICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICBuZXdCdXR0b24uY2xhc3NOYW1lID0gJ2J0biBidG4tc3VjY2VzcyBkaWZmaWN1bHR5LWNhcmQnXHJcbiAgICAgICAgbmV3QnV0dG9uLmlkID0gJ2Vhc3knXHJcbiAgICAgIH0gZWxzZSBpZiAoaSA9PT0gMSkge1xyXG4gICAgICAgIG5ld0J1dHRvbi5jbGFzc05hbWUgPSAnYnRuIGJ0bi13YXJuaW5nIGRpZmZpY3VsdHktY2FyZCdcclxuICAgICAgICBuZXdCdXR0b24uaWQgPSAnbWVkaXVtJ1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5ld0J1dHRvbi5jbGFzc05hbWUgPSAnYnRuIGJ0bi1kYW5nZXIgZGlmZmljdWx0eS1jYXJkJ1xyXG4gICAgICAgIG5ld0J1dHRvbi5pZCA9ICdoYXJkJ1xyXG4gICAgICB9XHJcbiAgICAgIG5ld0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IG5hdlRvUXVpeihuZXdCdXR0b24uaWQpKVxyXG4gICAgICBuZXdCdXR0b24uaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD4ke2xhYmVsc1tpXX08L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgYFxyXG4gICAgICBidXR0b25TZWN0aW9uLmFwcGVuZENoaWxkKG5ld0J1dHRvbilcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgbGV0IGJ1dHRvbnNUb1JlbW92ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kaWZmaWN1bHR5LWNhcmQnKVxyXG4gICAgYnV0dG9uc1RvUmVtb3ZlLmZvckVhY2goYnV0dG9uID0+IGJ1dHRvbi5yZW1vdmUoKSlcclxuICB9XHJcbiAgYnV0dG9uc1Zpc2libGUgPSAhYnV0dG9uc1Zpc2libGVcclxufSlcclxuXHJcbmZ1bmN0aW9uIG5hdlRvUXVpeihpZCkge1xyXG5jb25zdCB1c2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXInKVxyXG4gICAgY29uc3QgdXNlcm5hbWUgPSB1c2VyLnRleHRDb250ZW50LnN1YnN0cmluZyg4KTtcclxuICAgIGNvbnNvbGUubG9nKCd1c2VybmFtZSAnLCAgdXNlcm5hbWUpXHJcbiAgY29uc29sZS5sb2coJ2luc2lkZSBidXR0b24nKVxyXG4gIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYHF1aXouaHRtbD9kaWZmaWN1bHR5PSR7aWR9JnVzZXI9JHt1c2VybmFtZX1gXHJcbn1cclxuIiwiY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKVxyXG5jb25zdCBkaWZmaWN1bHR5ID0gdXJsUGFyYW1zLmdldCgnZGlmZmljdWx0eScpXHJcbmNvbnN0IHVzZXJuYW1lID0gdXJsUGFyYW1zLmdldCgndXNlcicpXHJcbmNvbnN0IHF1aXpUaXRsZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncXVpei10aXRsZScpXHJcbmNvbnN0IGZsYWdTb3VyY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmxhZycpXHJcbmNvbnN0IGNvdW50cnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY291bnRyeScpXHJcbmNvbnN0IGVudGVyQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZW50ZXItYnV0dG9uJylcclxuY29uc3QgdG90YWxTY29yZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3RhbC1zY29yZScpXHJcbmNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZW50ZXItYnV0dG9uJylcclxuY29uc3QgY2FwaXRhbENpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2l0eScpXHJcbmxldCBjaXR5ID0gJydcclxubGV0IGFucyA9ICcnXHJcbmxldCB1c2VySXNQcmVzZW50ID0gbnVsbFxyXG5cclxucXVpelRpdGxlRWxlbWVudC50ZXh0Q29udGVudCArPSBgJHtkaWZmaWN1bHR5fWBcclxubGV0IGN1cnJlbnRTY29yZSA9IDBcclxuXHJcbmNhcGl0YWxDaXR5LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKCkge1xyXG4gIGNpdHkgPSBjYXBpdGFsQ2l0eS52YWx1ZVxyXG4gIGNvbnNvbGUubG9nKCdUaGUgdmFsdWUgaGFzIGNoYW5nZWQgdG86ICcgKyBjaXR5KVxyXG59KVxyXG5cclxuY29uc3Qgc2hvd0ltYWdlID0gcGxhY2UgPT4ge1xyXG4gIGZsYWdTb3VyY2Uuc3JjID0gcGxhY2U/LmZsYWdcclxuICBjb3VudHJ5LnRleHRDb250ZW50ID0gcGxhY2U/LmNvdW50cnlcclxuICBjb25zb2xlLmxvZygnYW5zICcsIHBsYWNlPy5jYXBpdGFsLnRvTG93ZXJDYXNlKCkudHJpbSgpKVxyXG4gIGNvbnNvbGUubG9nKCdjaXR5ICcsIGNpdHkudG9Mb3dlckNhc2UoKS50cmltKCkpXHJcbiAgaWYgKHBsYWNlPy5jYXBpdGFsLnRvTG93ZXJDYXNlKCkudHJpbSgpID09PSBjaXR5LnRvTG93ZXJDYXNlKCkudHJpbSgpKSB7XHJcbiAgfVxyXG59XHJcblxyXG5idXR0b25zLmZvckVhY2goZnVuY3Rpb24gKGJ1dHRvbikge1xyXG4gIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIGNoZWNrU2NvcmUoKVxyXG4gICAgZ2V0RXhpc3RpbmdVc2VyU2NvcmUoKVxyXG4gICAgZ2V0UmFuZG9tUXVpeigpXHJcbiAgICBjYXBpdGFsQ2l0eS52YWx1ZSA9ICcnXHJcbiAgfSlcclxufSlcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgZ2V0UmFuZG9tUXVpeigpXHJcbiAgc3RhcnRUaW1lcihkaWZmaWN1bHR5KVxyXG59KVxyXG5cclxubGV0IGVudGVyUHJlc3NlZCA9IGZhbHNlXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgaWYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJyAmJiAhZW50ZXJQcmVzc2VkKSB7XHJcbiAgICBlbnRlclByZXNzZWQgPSB0cnVlXHJcbiAgICBjaGVja1Njb3JlKClcclxuICAgIGdldEV4aXN0aW5nVXNlclNjb3JlKClcclxuICAgIGdldFJhbmRvbVF1aXooKVxyXG4gICAgY2FwaXRhbENpdHkudmFsdWUgPSAnJ1xyXG4gIH1cclxufSlcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgaWYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xyXG4gICAgZW50ZXJQcmVzc2VkID0gZmFsc2VcclxuICB9XHJcbn0pXHJcblxyXG5jb25zdCBnZXRSYW5kb21RdWl6ID0gKCkgPT4ge1xyXG4gIGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjgwODAvcXVpei9xdWVzdGlvbnMnKVxyXG4gICAgLnRoZW4ocmVzcCA9PiByZXNwLmpzb24oKSlcclxuICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygncGxhY2UgJywgZGF0YSlcclxuICAgICAgcGxhY2UgPSBkYXRhXHJcbiAgICAgIHNob3dJbWFnZShkYXRhKVxyXG4gICAgICBhbnMgPSBkYXRhPy5jYXBpdGFsXHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKGUgPT4gY29uc29sZS5sb2coZSkpXHJcbn1cclxuXHJcbmNvbnN0IGNoZWNrU2NvcmUgPSAoKSA9PiB7XHJcbiAgaWYgKGFucy50b0xvd2VyQ2FzZSgpLnRyaW0oKSA9PT0gY2l0eS50b0xvd2VyQ2FzZSgpLnRyaW0oKSkge1xyXG4gICAgY3VycmVudFNjb3JlICs9IDFcclxuICAgIGNvbnNvbGUubG9nKCdjdXJyZW50U2NvcmUnLCBjdXJyZW50U2NvcmUpXHJcbiAgICB0b3RhbFNjb3JlLnRleHRDb250ZW50ID0gY3VycmVudFNjb3JlXHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBnZXRFeGlzdGluZ1VzZXJTY29yZSA9ICgpID0+IHtcclxuICBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDgwL3Njb3Jlcy91c2VyLyR7dXNlcm5hbWV9YClcclxuICAgIC50aGVuKHJlc3AgPT4gcmVzcC5qc29uKCkpXHJcbiAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ2luc2lkZSBnZXRFeGlzaXRuZycsIGRhdGFbMF0uc2NvcmUpXHJcbiAgICAgIGNvbnNvbGUubG9nKCdjdXJyZW50IHNjb3JlICcsIGN1cnJlbnRTY29yZSlcclxuXHJcbiAgICAgIGlmIChjdXJyZW50U2NvcmUgPiBkYXRhWzBdLnNjb3JlKSB7XHJcbiAgICAgICAgdXNlcklzUHJlc2VudCA9IHRydWVcclxuICAgICAgfSBlbHNlIGlmIChjdXJyZW50U2NvcmUgPD0gZGF0YVswXS5zY29yZSkge1xyXG4gICAgICAgIHVzZXJJc1ByZXNlbnQgPSBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKCd1c2VySXNQcmVzZW50OiAnLCB1c2VySXNQcmVzZW50KVxyXG4gICAgfSlcclxuICAgIC5jYXRjaChlID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZSlcclxuICAgICAgY29uc29sZS5sb2coJ25vdCBmb3VuZCAnKVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gc3RhcnRUaW1lciAoZGlmZmljdWx0eSkge1xyXG4gIGNvbnNvbGUubG9nKCdkaWZmaWN1bHR5OiBsaW5lIDggOiAnLCBkaWZmaWN1bHR5KVxyXG4gIGlmIChkaWZmaWN1bHR5ID09PSAnZWFzeScpIHtcclxuICAgIHRpbWVyID0gMTgwXHJcbiAgfSBlbHNlIGlmIChkaWZmaWN1bHR5ID09PSAnbWVkaXVtJykge1xyXG4gICAgdGltZXIgPSAxMjBcclxuICB9IGVsc2Uge1xyXG4gICAgdGltZXIgPSAxMFxyXG4gIH1cclxuICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8oJy9hc3NldHMvbWl4a2l0LWFsYXJtLWNsb2NrLWJlZXAtOTg4LndhdicpXHJcblxyXG4gIGNvbnN0IGludGVydmFsSWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICBtaW51dGVzID0gTWF0aC5mbG9vcih0aW1lciAvIDYwKVxyXG4gICAgc2Vjb25kcyA9IHRpbWVyICUgNjBcclxuXHJcbiAgICBtaW51dGVzID0gbWludXRlcyA8IDEwID8gJzAnICsgbWludXRlcyA6IG1pbnV0ZXNcclxuICAgIHNlY29uZHMgPSBzZWNvbmRzIDwgMTAgPyAnMCcgKyBzZWNvbmRzIDogc2Vjb25kc1xyXG5cclxuICAgIGNvbnN0IHRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGltZScpXHJcbiAgICB0aW1lLnRleHRDb250ZW50ID0gbWludXRlcyArICc6JyArIHNlY29uZHNcclxuXHJcbiAgICBpZiAodGltZXIgPD0gOCkge1xyXG4gICAgICB0aW1lLnN0eWxlLmNvbG9yID0gJ3JlZCdcclxuICAgICAgYXVkaW8ucGxheSgpXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKC0tdGltZXIgPCAwKSB7XHJcbiAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZClcclxuICAgICAgY29uc29sZS5sb2coJz8gJywgdXNlcklzUHJlc2VudClcclxuICAgICAgYXVkaW8ucGF1c2UoKVxyXG4gICAgICBpZiAodXNlcklzUHJlc2VudCA9PSB1bmRlZmluZWQgfHwgdXNlcklzUHJlc2VudCA9PSBudWxsKSB7XHJcbiAgICAgICAgY3JlYXRlU2NvcmUoKVxyXG4gICAgICB9IGVsc2UgaWYgKHVzZXJJc1ByZXNlbnQpIHtcclxuICAgICAgICB1cGRhdGVTY29yZSgpXHJcbiAgICAgIH0gZWxzZSBpZiAodXNlcklzUHJlc2VudCA9PSBmYWxzZSkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYGxlYWRlcmJvYXJkLmh0bWw/ZGlmZmljdWx0eT0ke2RpZmZpY3VsdHl9JnVzZXI9JHt1c2VybmFtZX1gXHJcbiAgICAgIH1cclxuICAgICAgYWxlcnQoXCJUaW1lJ3MgdXAhXCIpXHJcblxyXG4gICAgICB0aW1lLnN0eWxlLmNvbG9yID0gJ2JsYWNrJ1xyXG4gICAgfVxyXG4gIH0sIDEwMDApXHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVNjb3JlICgpIHtcclxuICBjb25zb2xlLmxvZygnaW5zaWRlIGNyZWF0ZSBzY29yZScpXHJcblxyXG4gIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgfSxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxyXG4gICAgICBzY29yZTogY3VycmVudFNjb3JlLFxyXG4gICAgICBkaWZmaWN1bHR5OiBkaWZmaWN1bHR5XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDo4MDgwL3Njb3JlJywgb3B0aW9ucylcclxuXHJcbiAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAxKSB7XHJcbiAgICBjb25zb2xlLmxvZygnc2NvcmUgY3JlYXRlZCcpXHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGBsZWFkZXJib2FyZC5odG1sP2RpZmZpY3VsdHk9JHtkaWZmaWN1bHR5fSZ1c2VyPSR7dXNlcm5hbWV9YFxyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmxvZygnZXJyb3InKVxyXG4gIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlU2NvcmUgKCkge1xyXG4gIGNvbnNvbGUubG9nKCdpbnNpZGUgdXBkYXRlIHNjb3JlJylcclxuXHJcbiAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgIG1ldGhvZDogJ1BBVENIJyxcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgfSxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgc2NvcmU6IGN1cnJlbnRTY29yZVxyXG4gICAgfSlcclxuICB9XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcclxuICAgIGBodHRwOi8vbG9jYWxob3N0OjgwODAvc2NvcmUvdXNlci8ke3VzZXJuYW1lfWAsXHJcbiAgICBvcHRpb25zXHJcbiAgKVxyXG5cclxuICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgIGNvbnNvbGUubG9nKCdzY29yZSBjcmVhdGVkJylcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYGxlYWRlcmJvYXJkLmh0bWw/ZGlmZmljdWx0eT0ke2RpZmZpY3VsdHl9JnVzZXI9JHt1c2VybmFtZX1gXHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUubG9nKCdlcnJvcicpXHJcbiAgfVxyXG59XHJcbiJdfQ==
