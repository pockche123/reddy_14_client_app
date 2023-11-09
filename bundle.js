(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const soundCard = document.getElementById('sound-card')
const audio = document.getElementById('audio')
const icon = document.querySelector('#sound-card i')
const user = document.getElementById('user')
const form = document.getElementById('username-form')
const input = document.getElementById('username-input')

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

form.addEventListener('submit', e => showNext(e))

function showNext(e) {
  
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
      newButton.innerHTML = `<label>${labels[i]}</label>`
      buttonSection.appendChild(newButton)
    }
  } else {
    let buttonsToRemove = document.querySelectorAll('.difficulty-card')
    buttonsToRemove.forEach(button => button.remove())
  }
  buttonsVisible = !buttonsVisible
})

function navToQuiz (id) {
  const user = document.getElementById('user')
  const username = user.textContent.substring(8)
  console.log('username ', username)
  console.log('inside button')
  window.location.href = `quiz.html?difficulty=${id}&user=${username}`
}

function userPresent () {
  if (localStorage.getItem('storedUsername')) {
    user.textContent += localStorage.getItem('storedUsername')
    user.style.display = 'block'
    playPage()
  } else {
    form.style.display = 'block'
  }
}

userPresent()

document.getElementById('exit').addEventListener('click', function () {
  localStorage.removeItem('storedUsername')
  user.textContent = user.textContent.substring(0, 8)
  userPage()
})

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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzdGF0aWMvanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IHNvdW5kQ2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb3VuZC1jYXJkJylcclxuY29uc3QgYXVkaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXVkaW8nKVxyXG5jb25zdCBpY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NvdW5kLWNhcmQgaScpXHJcbmNvbnN0IHVzZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcicpXHJcbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUtZm9ybScpXHJcbmNvbnN0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lLWlucHV0JylcclxuXHJcbnNvdW5kQ2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICBjb25zb2xlLmxvZygnaW5zaWRlIGNsaWNrZWQnKVxyXG4gIGlmIChhdWRpby5wYXVzZWQpIHtcclxuICAgIGljb24uY2xhc3NOYW1lID0gJ2ZhLXNvbGlkIGZhLXZvbHVtZS1oaWdoJ1xyXG4gICAgYXVkaW8ucGxheSgpXHJcbiAgfSBlbHNlIHtcclxuICAgIGF1ZGlvLnBhdXNlKClcclxuICAgIGljb24uY2xhc3NOYW1lID0gJ2ZhLXNvbGlkIGZhLXZvbHVtZS14bWFyaydcclxuICB9XHJcbn0pXHJcblxyXG5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGUgPT4gc2hvd05leHQoZSkpXHJcblxyXG5mdW5jdGlvbiBzaG93TmV4dChlKSB7XHJcbiAgXHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgaWYgKGlucHV0LnZhbHVlLnRyaW0oKSAhPT0gJycpIHtcclxuICAgIHVzZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdG9yZWRVc2VybmFtZScsIGlucHV0LnZhbHVlKVxyXG4gICAgdXNlci50ZXh0Q29udGVudCArPSBpbnB1dC52YWx1ZS50cmltKClcclxuICAgIGlucHV0LnZhbHVlID0gJydcclxuICAgIGNvbnNvbGUubG9nKHVzZXIudGV4dENvbnRlbnQpXHJcbiAgICBwbGF5UGFnZSgpXHJcbiAgfVxyXG59XHJcblxyXG5sZXQgYnV0dG9uc1Zpc2libGUgPSBmYWxzZVxyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXktYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgbGV0IGxhYmVscyA9IFsnZWFzeScsICdtZWRpdW0nLCAnaGFyZCddXHJcblxyXG4gIGxldCBidXR0b25TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXktYnV0dG9ucycpXHJcblxyXG4gIGlmIChidXR0b25zVmlzaWJsZSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgbGV0IG5ld0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXHJcbiAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgbmV3QnV0dG9uLmNsYXNzTmFtZSA9ICdidG4gYnRuLXN1Y2Nlc3MgZGlmZmljdWx0eS1jYXJkJ1xyXG4gICAgICAgIG5ld0J1dHRvbi5pZCA9ICdlYXN5J1xyXG4gICAgICB9IGVsc2UgaWYgKGkgPT09IDEpIHtcclxuICAgICAgICBuZXdCdXR0b24uY2xhc3NOYW1lID0gJ2J0biBidG4td2FybmluZyBkaWZmaWN1bHR5LWNhcmQnXHJcbiAgICAgICAgbmV3QnV0dG9uLmlkID0gJ21lZGl1bSdcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuZXdCdXR0b24uY2xhc3NOYW1lID0gJ2J0biBidG4tZGFuZ2VyIGRpZmZpY3VsdHktY2FyZCdcclxuICAgICAgICBuZXdCdXR0b24uaWQgPSAnaGFyZCdcclxuICAgICAgfVxyXG4gICAgICBuZXdCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBuYXZUb1F1aXoobmV3QnV0dG9uLmlkKSlcclxuICAgICAgbmV3QnV0dG9uLmlubmVySFRNTCA9IGA8bGFiZWw+JHtsYWJlbHNbaV19PC9sYWJlbD5gXHJcbiAgICAgIGJ1dHRvblNlY3Rpb24uYXBwZW5kQ2hpbGQobmV3QnV0dG9uKVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBsZXQgYnV0dG9uc1RvUmVtb3ZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRpZmZpY3VsdHktY2FyZCcpXHJcbiAgICBidXR0b25zVG9SZW1vdmUuZm9yRWFjaChidXR0b24gPT4gYnV0dG9uLnJlbW92ZSgpKVxyXG4gIH1cclxuICBidXR0b25zVmlzaWJsZSA9ICFidXR0b25zVmlzaWJsZVxyXG59KVxyXG5cclxuZnVuY3Rpb24gbmF2VG9RdWl6IChpZCkge1xyXG4gIGNvbnN0IHVzZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcicpXHJcbiAgY29uc3QgdXNlcm5hbWUgPSB1c2VyLnRleHRDb250ZW50LnN1YnN0cmluZyg4KVxyXG4gIGNvbnNvbGUubG9nKCd1c2VybmFtZSAnLCB1c2VybmFtZSlcclxuICBjb25zb2xlLmxvZygnaW5zaWRlIGJ1dHRvbicpXHJcbiAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgcXVpei5odG1sP2RpZmZpY3VsdHk9JHtpZH0mdXNlcj0ke3VzZXJuYW1lfWBcclxufVxyXG5cclxuZnVuY3Rpb24gdXNlclByZXNlbnQgKCkge1xyXG4gIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3RvcmVkVXNlcm5hbWUnKSkge1xyXG4gICAgdXNlci50ZXh0Q29udGVudCArPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3RvcmVkVXNlcm5hbWUnKVxyXG4gICAgdXNlci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gICAgcGxheVBhZ2UoKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgfVxyXG59XHJcblxyXG51c2VyUHJlc2VudCgpXHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhpdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdG9yZWRVc2VybmFtZScpXHJcbiAgdXNlci50ZXh0Q29udGVudCA9IHVzZXIudGV4dENvbnRlbnQuc3Vic3RyaW5nKDAsIDgpXHJcbiAgdXNlclBhZ2UoKVxyXG59KVxyXG5cclxuZnVuY3Rpb24gcGxheVBhZ2UgKCkge1xyXG4gIGZvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5LWJ1dHRvbicpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXktYnV0dG9ucycpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luc3RydWN0aW9uLWJ1dHRvbicpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xlYWRlcmJvYXJkLWJ1dHRvbicpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVzZXJQYWdlICgpIHtcclxuICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXktYnV0dG9uJykuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5LWJ1dHRvbnMnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luc3RydWN0aW9uLWJ1dHRvbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGVhZGVyYm9hcmQtYnV0dG9uJykuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG59XHJcbiJdfQ==
