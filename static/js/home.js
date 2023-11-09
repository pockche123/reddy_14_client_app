const audio = document.getElementById('audio')
const icon = document.querySelector('#sound-card i')
const user = document.getElementById('user')
const form = document.getElementById('username-form')
const input = document.getElementById('username-input')

function soundControl () {
  console.log('inside clicked')
  if (audio.paused) {
    icon.className = 'fa-solid fa-volume-high'
    audio.play()
  } else {
    audio.pause()
    icon.className = 'fa-solid fa-volume-xmark'
  }
}
function showNext (e) {
  e.preventDefault()
  if (input.value.trim() !== '') {
    user.style.display = 'block'
    localStorage.setItem('storedUsername', input.value)
    user.textContent += input.value.trim()
    input.value = ''
    console.log(user.textContent)
    playPage()
  }
}

let buttonsVisible = false

function selectDifficulty () {
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
      newButton.innerHTML = `<label>${labels[i]}</label>`
      buttonSection.appendChild(newButton)
    }
  } else {
    let buttonsToRemove = document.querySelectorAll('.difficulty-card')
    buttonsToRemove.forEach(button => button.remove())
  }
  buttonsVisible = !buttonsVisible
}

function navToQuiz (id) {
  const username = user.textContent.substring(8)
  console.log('username ', username)
  console.log('inside button')
  window.location.href = `quiz.html?difficulty=${id}&user=${username}`
}

function userPresent () {
  if (localStorage.getItem('storedUsername')) {
    if (user) {
      user.textContent += localStorage.getItem('storedUsername')
      user.style.display = 'block'
      playPage()
    }
  } else {
    form.style.display = 'block'
  }
}

userPresent()

function exitToNewUser () {
  localStorage.removeItem('storedUsername')
  user.textContent = user.textContent.substring(0, 8)
  userPage()
}

function playPage () {
  form.style.display = 'none'
  document.getElementById('play-button').style.display = 'block'
  document.querySelector('.play-buttons').style.display = 'block'
  document.getElementById('instruction-button').style.display = 'block'
  document.getElementById('leaderboard-button').style.display = 'block'
}

function userPage () {
  form.style.display = 'block'
  document.getElementById('play-button').style.display = 'none'
  document.querySelector('.play-buttons').style.display = 'none'
  document.getElementById('instruction-button').style.display = 'none'
  document.getElementById('leaderboard-button').style.display = 'none'
}

module.exports = { soundControl, showNext, selectDifficulty, exitToNewUser }
