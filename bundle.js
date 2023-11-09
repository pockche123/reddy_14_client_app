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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzdGF0aWMvanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IHNvdW5kQ2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb3VuZC1jYXJkJylcbmNvbnN0IGF1ZGlvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F1ZGlvJylcbmNvbnN0IGljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc291bmQtY2FyZCBpJylcbmNvbnN0IHVzZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcicpXG5jb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lLWZvcm0nKVxuY29uc3QgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUtaW5wdXQnKVxuXG5zb3VuZENhcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gIGNvbnNvbGUubG9nKCdpbnNpZGUgY2xpY2tlZCcpXG4gIGlmIChhdWRpby5wYXVzZWQpIHtcbiAgICBpY29uLmNsYXNzTmFtZSA9ICdmYS1zb2xpZCBmYS12b2x1bWUtaGlnaCdcbiAgICBhdWRpby5wbGF5KClcbiAgfSBlbHNlIHtcbiAgICBhdWRpby5wYXVzZSgpXG4gICAgaWNvbi5jbGFzc05hbWUgPSAnZmEtc29saWQgZmEtdm9sdW1lLXhtYXJrJ1xuICB9XG59KVxuXG5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGUgPT4gc2hvd05leHQoZSkpXG5cbmZ1bmN0aW9uIHNob3dOZXh0KGUpIHtcbiAgXG4gIGUucHJldmVudERlZmF1bHQoKVxuICBpZiAoaW5wdXQudmFsdWUudHJpbSgpICE9PSAnJykge1xuICAgIHVzZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3RvcmVkVXNlcm5hbWUnLCBpbnB1dC52YWx1ZSlcbiAgICB1c2VyLnRleHRDb250ZW50ICs9IGlucHV0LnZhbHVlLnRyaW0oKVxuICAgIGlucHV0LnZhbHVlID0gJydcbiAgICBjb25zb2xlLmxvZyh1c2VyLnRleHRDb250ZW50KVxuICAgIHBsYXlQYWdlKClcbiAgfVxufVxuXG5sZXQgYnV0dG9uc1Zpc2libGUgPSBmYWxzZVxuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheS1idXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IGxhYmVscyA9IFsnZWFzeScsICdtZWRpdW0nLCAnaGFyZCddXG5cbiAgbGV0IGJ1dHRvblNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheS1idXR0b25zJylcblxuICBpZiAoYnV0dG9uc1Zpc2libGUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgbGV0IG5ld0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICBuZXdCdXR0b24uY2xhc3NOYW1lID0gJ2J0biBidG4tc3VjY2VzcyBkaWZmaWN1bHR5LWNhcmQnXG4gICAgICAgIG5ld0J1dHRvbi5pZCA9ICdlYXN5J1xuICAgICAgfSBlbHNlIGlmIChpID09PSAxKSB7XG4gICAgICAgIG5ld0J1dHRvbi5jbGFzc05hbWUgPSAnYnRuIGJ0bi13YXJuaW5nIGRpZmZpY3VsdHktY2FyZCdcbiAgICAgICAgbmV3QnV0dG9uLmlkID0gJ21lZGl1bSdcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld0J1dHRvbi5jbGFzc05hbWUgPSAnYnRuIGJ0bi1kYW5nZXIgZGlmZmljdWx0eS1jYXJkJ1xuICAgICAgICBuZXdCdXR0b24uaWQgPSAnaGFyZCdcbiAgICAgIH1cbiAgICAgIG5ld0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IG5hdlRvUXVpeihuZXdCdXR0b24uaWQpKVxuICAgICAgbmV3QnV0dG9uLmlubmVySFRNTCA9IGA8bGFiZWw+JHtsYWJlbHNbaV19PC9sYWJlbD5gXG4gICAgICBidXR0b25TZWN0aW9uLmFwcGVuZENoaWxkKG5ld0J1dHRvbilcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbGV0IGJ1dHRvbnNUb1JlbW92ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kaWZmaWN1bHR5LWNhcmQnKVxuICAgIGJ1dHRvbnNUb1JlbW92ZS5mb3JFYWNoKGJ1dHRvbiA9PiBidXR0b24ucmVtb3ZlKCkpXG4gIH1cbiAgYnV0dG9uc1Zpc2libGUgPSAhYnV0dG9uc1Zpc2libGVcbn0pXG5cbmZ1bmN0aW9uIG5hdlRvUXVpeiAoaWQpIHtcbiAgY29uc3QgdXNlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyJylcbiAgY29uc3QgdXNlcm5hbWUgPSB1c2VyLnRleHRDb250ZW50LnN1YnN0cmluZyg4KVxuICBjb25zb2xlLmxvZygndXNlcm5hbWUgJywgdXNlcm5hbWUpXG4gIGNvbnNvbGUubG9nKCdpbnNpZGUgYnV0dG9uJylcbiAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgcXVpei5odG1sP2RpZmZpY3VsdHk9JHtpZH0mdXNlcj0ke3VzZXJuYW1lfWBcbn1cblxuZnVuY3Rpb24gdXNlclByZXNlbnQgKCkge1xuICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0b3JlZFVzZXJuYW1lJykpIHtcbiAgICB1c2VyLnRleHRDb250ZW50ICs9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdG9yZWRVc2VybmFtZScpXG4gICAgdXNlci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICAgIHBsYXlQYWdlKClcbiAgfSBlbHNlIHtcbiAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gIH1cbn1cblxudXNlclByZXNlbnQoKVxuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhpdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3RvcmVkVXNlcm5hbWUnKVxuICB1c2VyLnRleHRDb250ZW50ID0gdXNlci50ZXh0Q29udGVudC5zdWJzdHJpbmcoMCwgOClcbiAgdXNlclBhZ2UoKVxufSlcblxuZnVuY3Rpb24gcGxheVBhZ2UgKCkge1xuICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXktYnV0dG9uJykuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXktYnV0dG9ucycpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnN0cnVjdGlvbi1idXR0b24nKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGVhZGVyYm9hcmQtYnV0dG9uJykuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbn1cblxuZnVuY3Rpb24gdXNlclBhZ2UgKCkge1xuICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5LWJ1dHRvbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXktYnV0dG9ucycpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luc3RydWN0aW9uLWJ1dHRvbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xlYWRlcmJvYXJkLWJ1dHRvbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbn1cbiJdfQ==
