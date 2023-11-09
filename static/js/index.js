const {
  soundControl,
  showNext,
  selectDifficulty,
  exitToNewUser
} = require('./home')

const soundCard = document.getElementById('sound-card')
const form = document.getElementById('username-form')
const play = document.getElementById('play-button')
const exit = document.getElementById('exit')

if (soundCard) {
  soundCard.addEventListener('click', soundControl)
}

if (form) {
  form.addEventListener('submit', e => showNext(e))
}

if (play) {
  play.addEventListener('click', selectDifficulty)
}

if (exit) {
  exit.addEventListener('click', exitToNewUser)
}
