(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

const audio = document.getElementById('audio')
const icon = document.querySelector('#sound-card i')
const user = document.getElementById('user')
const form = document.getElementById('username-form')
const input = document.getElementById('username-input')


function soundControl() {
  console.log('inside clicked')
  if (audio.paused) {
    icon.className = 'fa-solid fa-volume-high'
    audio.play()
  } else {
    audio.pause()
    icon.className = 'fa-solid fa-volume-xmark'
  }
}
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

function selectDifficulty() {
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



function exitToNewUser() {
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


module.exports = {soundControl, showNext, selectDifficulty, exitToNewUser}
},{}],2:[function(require,module,exports){
const { soundControl, showNext, selectDifficulty, exitToNewUser} = require("./home");

const soundCard = document.getElementById("sound-card");
const form = document.getElementById("username-form");
const play = document.getElementById("play-button");
const exit = document.getElementById('exit')



if (soundCard) {
  soundCard.addEventListener("click", soundControl);
}

if (form) {
  form.addEventListener("submit", (e) => showNext(e));
}

if (play) {
    play.addEventListener('click', selectDifficulty);
}

if (exit) {
    exit.addEventListener('click', exitToNewUser);
}




},{"./home":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzdGF0aWMvanMvaG9tZS5qcyIsInN0YXRpYy9qcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcclxuY29uc3QgYXVkaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXVkaW8nKVxyXG5jb25zdCBpY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NvdW5kLWNhcmQgaScpXHJcbmNvbnN0IHVzZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcicpXHJcbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUtZm9ybScpXHJcbmNvbnN0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lLWlucHV0JylcclxuXHJcblxyXG5mdW5jdGlvbiBzb3VuZENvbnRyb2woKSB7XHJcbiAgY29uc29sZS5sb2coJ2luc2lkZSBjbGlja2VkJylcclxuICBpZiAoYXVkaW8ucGF1c2VkKSB7XHJcbiAgICBpY29uLmNsYXNzTmFtZSA9ICdmYS1zb2xpZCBmYS12b2x1bWUtaGlnaCdcclxuICAgIGF1ZGlvLnBsYXkoKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBhdWRpby5wYXVzZSgpXHJcbiAgICBpY29uLmNsYXNzTmFtZSA9ICdmYS1zb2xpZCBmYS12b2x1bWUteG1hcmsnXHJcbiAgfVxyXG59XHJcbmZ1bmN0aW9uIHNob3dOZXh0KGUpIHtcclxuICBcclxuICBlLnByZXZlbnREZWZhdWx0KClcclxuICBpZiAoaW5wdXQudmFsdWUudHJpbSgpICE9PSAnJykge1xyXG4gICAgdXNlci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0b3JlZFVzZXJuYW1lJywgaW5wdXQudmFsdWUpXHJcbiAgICB1c2VyLnRleHRDb250ZW50ICs9IGlucHV0LnZhbHVlLnRyaW0oKVxyXG4gICAgaW5wdXQudmFsdWUgPSAnJ1xyXG4gICAgY29uc29sZS5sb2codXNlci50ZXh0Q29udGVudClcclxuICAgIHBsYXlQYWdlKClcclxuICB9XHJcbn1cclxuXHJcbmxldCBidXR0b25zVmlzaWJsZSA9IGZhbHNlXHJcblxyXG5mdW5jdGlvbiBzZWxlY3REaWZmaWN1bHR5KCkge1xyXG4gICBsZXQgbGFiZWxzID0gWydlYXN5JywgJ21lZGl1bScsICdoYXJkJ11cclxuXHJcbiAgbGV0IGJ1dHRvblNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheS1idXR0b25zJylcclxuXHJcbiAgaWYgKGJ1dHRvbnNWaXNpYmxlKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xyXG4gICAgICBsZXQgbmV3QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcclxuICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICBuZXdCdXR0b24uY2xhc3NOYW1lID0gJ2J0biBidG4tc3VjY2VzcyBkaWZmaWN1bHR5LWNhcmQnXHJcbiAgICAgICAgbmV3QnV0dG9uLmlkID0gJ2Vhc3knXHJcbiAgICAgIH0gZWxzZSBpZiAoaSA9PT0gMSkge1xyXG4gICAgICAgIG5ld0J1dHRvbi5jbGFzc05hbWUgPSAnYnRuIGJ0bi13YXJuaW5nIGRpZmZpY3VsdHktY2FyZCdcclxuICAgICAgICBuZXdCdXR0b24uaWQgPSAnbWVkaXVtJ1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5ld0J1dHRvbi5jbGFzc05hbWUgPSAnYnRuIGJ0bi1kYW5nZXIgZGlmZmljdWx0eS1jYXJkJ1xyXG4gICAgICAgIG5ld0J1dHRvbi5pZCA9ICdoYXJkJ1xyXG4gICAgICB9XHJcbiAgICAgIG5ld0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IG5hdlRvUXVpeihuZXdCdXR0b24uaWQpKVxyXG4gICAgICBuZXdCdXR0b24uaW5uZXJIVE1MID0gYDxsYWJlbD4ke2xhYmVsc1tpXX08L2xhYmVsPmBcclxuICAgICAgYnV0dG9uU2VjdGlvbi5hcHBlbmRDaGlsZChuZXdCdXR0b24pXHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGxldCBidXR0b25zVG9SZW1vdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGlmZmljdWx0eS1jYXJkJylcclxuICAgIGJ1dHRvbnNUb1JlbW92ZS5mb3JFYWNoKGJ1dHRvbiA9PiBidXR0b24ucmVtb3ZlKCkpXHJcbiAgfVxyXG4gIGJ1dHRvbnNWaXNpYmxlID0gIWJ1dHRvbnNWaXNpYmxlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5hdlRvUXVpeiAoaWQpIHtcclxuICBcclxuICBjb25zdCB1c2VybmFtZSA9IHVzZXIudGV4dENvbnRlbnQuc3Vic3RyaW5nKDgpXHJcbiAgY29uc29sZS5sb2coJ3VzZXJuYW1lICcsIHVzZXJuYW1lKVxyXG4gIGNvbnNvbGUubG9nKCdpbnNpZGUgYnV0dG9uJylcclxuICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGBxdWl6Lmh0bWw/ZGlmZmljdWx0eT0ke2lkfSZ1c2VyPSR7dXNlcm5hbWV9YFxyXG59XHJcblxyXG5mdW5jdGlvbiB1c2VyUHJlc2VudCAoKSB7XHJcbiAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdG9yZWRVc2VybmFtZScpKSB7XHJcbiAgICBpZiAodXNlcikge1xyXG4gICAgICB1c2VyLnRleHRDb250ZW50ICs9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdG9yZWRVc2VybmFtZScpXHJcbiAgICAgIHVzZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcclxuICAgICAgcGxheVBhZ2UoKVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgfVxyXG59XHJcblxyXG51c2VyUHJlc2VudCgpXHJcblxyXG4vLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhpdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4vLyAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdG9yZWRVc2VybmFtZScpXHJcbi8vICAgdXNlci50ZXh0Q29udGVudCA9IHVzZXIudGV4dENvbnRlbnQuc3Vic3RyaW5nKDAsIDgpXHJcbi8vICAgdXNlclBhZ2UoKVxyXG4vLyB9KVxyXG5cclxuZnVuY3Rpb24gZXhpdFRvTmV3VXNlcigpIHtcclxuICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3RvcmVkVXNlcm5hbWUnKVxyXG4gIHVzZXIudGV4dENvbnRlbnQgPSB1c2VyLnRleHRDb250ZW50LnN1YnN0cmluZygwLCA4KVxyXG4gIHVzZXJQYWdlKClcclxufVxyXG5cclxuZnVuY3Rpb24gcGxheVBhZ2UgKCkge1xyXG4gIGZvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5LWJ1dHRvbicpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXktYnV0dG9ucycpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luc3RydWN0aW9uLWJ1dHRvbicpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xlYWRlcmJvYXJkLWJ1dHRvbicpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVzZXJQYWdlICgpIHtcclxuICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXktYnV0dG9uJykuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5LWJ1dHRvbnMnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luc3RydWN0aW9uLWJ1dHRvbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGVhZGVyYm9hcmQtYnV0dG9uJykuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7c291bmRDb250cm9sLCBzaG93TmV4dCwgc2VsZWN0RGlmZmljdWx0eSwgZXhpdFRvTmV3VXNlcn0iLCJjb25zdCB7IHNvdW5kQ29udHJvbCwgc2hvd05leHQsIHNlbGVjdERpZmZpY3VsdHksIGV4aXRUb05ld1VzZXJ9ID0gcmVxdWlyZShcIi4vaG9tZVwiKTtcclxuXHJcbmNvbnN0IHNvdW5kQ2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic291bmQtY2FyZFwiKTtcclxuY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlcm5hbWUtZm9ybVwiKTtcclxuY29uc3QgcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheS1idXR0b25cIik7XHJcbmNvbnN0IGV4aXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhpdCcpXHJcblxyXG5cclxuXHJcbmlmIChzb3VuZENhcmQpIHtcclxuICBzb3VuZENhcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNvdW5kQ29udHJvbCk7XHJcbn1cclxuXHJcbmlmIChmb3JtKSB7XHJcbiAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiBzaG93TmV4dChlKSk7XHJcbn1cclxuXHJcbmlmIChwbGF5KSB7XHJcbiAgICBwbGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VsZWN0RGlmZmljdWx0eSk7XHJcbn1cclxuXHJcbmlmIChleGl0KSB7XHJcbiAgICBleGl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXhpdFRvTmV3VXNlcik7XHJcbn1cclxuXHJcblxyXG5cclxuIl19
