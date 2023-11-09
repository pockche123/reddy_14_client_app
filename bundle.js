(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

// document.getElementById('exit').addEventListener('click', function () {
//   localStorage.removeItem('storedUsername')
//   user.textContent = user.textContent.substring(0, 8)
//   userPage()
// })

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

},{}],2:[function(require,module,exports){
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

},{"./home":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzdGF0aWMvanMvaG9tZS5qcyIsInN0YXRpYy9qcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgYXVkaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXVkaW8nKVxyXG5jb25zdCBpY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NvdW5kLWNhcmQgaScpXHJcbmNvbnN0IHVzZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcicpXHJcbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUtZm9ybScpXHJcbmNvbnN0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lLWlucHV0JylcclxuXHJcbmZ1bmN0aW9uIHNvdW5kQ29udHJvbCAoKSB7XHJcbiAgY29uc29sZS5sb2coJ2luc2lkZSBjbGlja2VkJylcclxuICBpZiAoYXVkaW8ucGF1c2VkKSB7XHJcbiAgICBpY29uLmNsYXNzTmFtZSA9ICdmYS1zb2xpZCBmYS12b2x1bWUtaGlnaCdcclxuICAgIGF1ZGlvLnBsYXkoKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBhdWRpby5wYXVzZSgpXHJcbiAgICBpY29uLmNsYXNzTmFtZSA9ICdmYS1zb2xpZCBmYS12b2x1bWUteG1hcmsnXHJcbiAgfVxyXG59XHJcbmZ1bmN0aW9uIHNob3dOZXh0IChlKSB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgaWYgKGlucHV0LnZhbHVlLnRyaW0oKSAhPT0gJycpIHtcclxuICAgIHVzZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdG9yZWRVc2VybmFtZScsIGlucHV0LnZhbHVlKVxyXG4gICAgdXNlci50ZXh0Q29udGVudCArPSBpbnB1dC52YWx1ZS50cmltKClcclxuICAgIGlucHV0LnZhbHVlID0gJydcclxuICAgIGNvbnNvbGUubG9nKHVzZXIudGV4dENvbnRlbnQpXHJcbiAgICBwbGF5UGFnZSgpXHJcbiAgfVxyXG59XHJcblxyXG5sZXQgYnV0dG9uc1Zpc2libGUgPSBmYWxzZVxyXG5cclxuZnVuY3Rpb24gc2VsZWN0RGlmZmljdWx0eSAoKSB7XHJcbiAgbGV0IGxhYmVscyA9IFsnZWFzeScsICdtZWRpdW0nLCAnaGFyZCddXHJcblxyXG4gIGxldCBidXR0b25TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXktYnV0dG9ucycpXHJcblxyXG4gIGlmIChidXR0b25zVmlzaWJsZSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgbGV0IG5ld0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXHJcbiAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgbmV3QnV0dG9uLmNsYXNzTmFtZSA9ICdidG4gYnRuLXN1Y2Nlc3MgZGlmZmljdWx0eS1jYXJkJ1xyXG4gICAgICAgIG5ld0J1dHRvbi5pZCA9ICdlYXN5J1xyXG4gICAgICB9IGVsc2UgaWYgKGkgPT09IDEpIHtcclxuICAgICAgICBuZXdCdXR0b24uY2xhc3NOYW1lID0gJ2J0biBidG4td2FybmluZyBkaWZmaWN1bHR5LWNhcmQnXHJcbiAgICAgICAgbmV3QnV0dG9uLmlkID0gJ21lZGl1bSdcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuZXdCdXR0b24uY2xhc3NOYW1lID0gJ2J0biBidG4tZGFuZ2VyIGRpZmZpY3VsdHktY2FyZCdcclxuICAgICAgICBuZXdCdXR0b24uaWQgPSAnaGFyZCdcclxuICAgICAgfVxyXG4gICAgICBuZXdCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBuYXZUb1F1aXoobmV3QnV0dG9uLmlkKSlcclxuICAgICAgbmV3QnV0dG9uLmlubmVySFRNTCA9IGA8bGFiZWw+JHtsYWJlbHNbaV19PC9sYWJlbD5gXHJcbiAgICAgIGJ1dHRvblNlY3Rpb24uYXBwZW5kQ2hpbGQobmV3QnV0dG9uKVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBsZXQgYnV0dG9uc1RvUmVtb3ZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRpZmZpY3VsdHktY2FyZCcpXHJcbiAgICBidXR0b25zVG9SZW1vdmUuZm9yRWFjaChidXR0b24gPT4gYnV0dG9uLnJlbW92ZSgpKVxyXG4gIH1cclxuICBidXR0b25zVmlzaWJsZSA9ICFidXR0b25zVmlzaWJsZVxyXG59XHJcblxyXG5mdW5jdGlvbiBuYXZUb1F1aXogKGlkKSB7XHJcbiAgY29uc3QgdXNlcm5hbWUgPSB1c2VyLnRleHRDb250ZW50LnN1YnN0cmluZyg4KVxyXG4gIGNvbnNvbGUubG9nKCd1c2VybmFtZSAnLCB1c2VybmFtZSlcclxuICBjb25zb2xlLmxvZygnaW5zaWRlIGJ1dHRvbicpXHJcbiAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgcXVpei5odG1sP2RpZmZpY3VsdHk9JHtpZH0mdXNlcj0ke3VzZXJuYW1lfWBcclxufVxyXG5cclxuZnVuY3Rpb24gdXNlclByZXNlbnQgKCkge1xyXG4gIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3RvcmVkVXNlcm5hbWUnKSkge1xyXG4gICAgaWYgKHVzZXIpIHtcclxuICAgICAgdXNlci50ZXh0Q29udGVudCArPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3RvcmVkVXNlcm5hbWUnKVxyXG4gICAgICB1c2VyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgICAgIHBsYXlQYWdlKClcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gIH1cclxufVxyXG5cclxudXNlclByZXNlbnQoKVxyXG5cclxuLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V4aXQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuLy8gICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3RvcmVkVXNlcm5hbWUnKVxyXG4vLyAgIHVzZXIudGV4dENvbnRlbnQgPSB1c2VyLnRleHRDb250ZW50LnN1YnN0cmluZygwLCA4KVxyXG4vLyAgIHVzZXJQYWdlKClcclxuLy8gfSlcclxuXHJcbmZ1bmN0aW9uIGV4aXRUb05ld1VzZXIgKCkge1xyXG4gIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdG9yZWRVc2VybmFtZScpXHJcbiAgdXNlci50ZXh0Q29udGVudCA9IHVzZXIudGV4dENvbnRlbnQuc3Vic3RyaW5nKDAsIDgpXHJcbiAgdXNlclBhZ2UoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBwbGF5UGFnZSAoKSB7XHJcbiAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXktYnV0dG9uJykuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheS1idXR0b25zJykuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5zdHJ1Y3Rpb24tYnV0dG9uJykuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGVhZGVyYm9hcmQtYnV0dG9uJykuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcclxufVxyXG5cclxuZnVuY3Rpb24gdXNlclBhZ2UgKCkge1xyXG4gIGZvcm0uc3R5bGUuZGlzcGxheSA9ICdibG9jaydcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheS1idXR0b24nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXktYnV0dG9ucycpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5zdHJ1Y3Rpb24tYnV0dG9uJykuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZWFkZXJib2FyZC1idXR0b24nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0geyBzb3VuZENvbnRyb2wsIHNob3dOZXh0LCBzZWxlY3REaWZmaWN1bHR5LCBleGl0VG9OZXdVc2VyIH1cclxuIiwiY29uc3Qge1xyXG4gIHNvdW5kQ29udHJvbCxcclxuICBzaG93TmV4dCxcclxuICBzZWxlY3REaWZmaWN1bHR5LFxyXG4gIGV4aXRUb05ld1VzZXJcclxufSA9IHJlcXVpcmUoJy4vaG9tZScpXHJcblxyXG5jb25zdCBzb3VuZENhcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc291bmQtY2FyZCcpXHJcbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUtZm9ybScpXHJcbmNvbnN0IHBsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheS1idXR0b24nKVxyXG5jb25zdCBleGl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V4aXQnKVxyXG5cclxuaWYgKHNvdW5kQ2FyZCkge1xyXG4gIHNvdW5kQ2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNvdW5kQ29udHJvbClcclxufVxyXG5cclxuaWYgKGZvcm0pIHtcclxuICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGUgPT4gc2hvd05leHQoZSkpXHJcbn1cclxuXHJcbmlmIChwbGF5KSB7XHJcbiAgcGxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbGVjdERpZmZpY3VsdHkpXHJcbn1cclxuXHJcbmlmIChleGl0KSB7XHJcbiAgZXhpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV4aXRUb05ld1VzZXIpXHJcbn1cclxuIl19
