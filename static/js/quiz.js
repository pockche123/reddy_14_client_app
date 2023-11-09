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
  getExistingUserScore()
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
  fetch('https://reddy-14-server-app-parjal.onrender.com/quiz/questions')
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
  fetch(`https://reddy-14-server-app-parjal.onrender.com/scores/user/${username}`)
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
    timer = 60
  }
  let audio = new Audio('/assets/mixkit-alarm-clock-beep-988.wav')

  setTimer(timer, audio)
  
}

function setTimer (timer, audio) {
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

  const response = await fetch('https://reddy-14-server-app-parjal.onrender.com/score', options)

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
    `https://reddy-14-server-app-parjal.onrender.com/score/user/${username}`,
    options
  )

  if (response.status === 200) {
    console.log('score created')
    window.location.href = `leaderboard.html?difficulty=${difficulty}&user=${username}`
  } else {
    console.log('error')
  }
}

document.getElementById('cancel').addEventListener('click', () => {
  if (confirm('Are you sure you want to cancel the test?')) {
    window.location.href = '/'
  }
})
