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
  window.location.href = `quiz.html?param=${id}&user=${username}`
}

},{}],2:[function(require,module,exports){


// const {startTimer } = require("./timer")



const urlParams = new URLSearchParams(window.location.search);
const difficulty = urlParams.get('param');
const username = urlParams.get('user'); 
const quizTitleElement = document.getElementById('quiz-title');

quizTitleElement.textContent += `${difficulty}`;

console.log("quiz difficulty ", difficulty)

// if (difficulty) {
//     startTimer(difficulty)
// }


},{}]},{},[1,2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzdGF0aWMvanMvaW5kZXguanMiLCJzdGF0aWMvanMvcXVpei5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBzb3VuZENhcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc291bmQtY2FyZCcpXHJcbmNvbnN0IGF1ZGlvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F1ZGlvJylcclxuY29uc3QgaWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzb3VuZC1jYXJkIGknKVxyXG5jb25zdCB1c2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXInKVxyXG5cclxuc291bmRDYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gIGNvbnNvbGUubG9nKCdpbnNpZGUgY2xpY2tlZCcpXHJcbiAgaWYgKGF1ZGlvLnBhdXNlZCkge1xyXG4gICAgaWNvbi5jbGFzc05hbWUgPSAnZmEtc29saWQgZmEtdm9sdW1lLWhpZ2gnXHJcbiAgICBhdWRpby5wbGF5KClcclxuICB9IGVsc2Uge1xyXG4gICAgYXVkaW8ucGF1c2UoKVxyXG4gICAgaWNvbi5jbGFzc05hbWUgPSAnZmEtc29saWQgZmEtdm9sdW1lLXhtYXJrJ1xyXG4gIH1cclxufSlcclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VybmFtZS1mb3JtJykuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHNob3dOZXh0KGUpKVxyXG5cclxuZnVuY3Rpb24gc2hvd05leHQoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBjb25zb2xlLmxvZygnaW5zaWRlIHN1Ym1pdCcpXHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lLWZvcm0nKVxyXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUtaW5wdXQnKVxyXG4gICAgY29uc3QgdXNlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyJylcclxuXHJcbiAgICBpZiAoaW5wdXQudmFsdWUudHJpbSgpICE9PSBcIlwiKSB7XHJcbiAgICAgICAgdXNlci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gICAgICAgIHVzZXIudGV4dENvbnRlbnQgKz0gaW5wdXQudmFsdWUudHJpbSgpOyBcclxuICAgICAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheS1idXR0b24nKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5LWJ1dHRvbnMnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnN0cnVjdGlvbi1idXR0b24nKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZWFkZXJib2FyZC1idXR0b24nKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gICAgfVxyXG59XHJcblxyXG5sZXQgYnV0dG9uc1Zpc2libGUgPSBmYWxzZVxyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXktYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgbGV0IGxhYmVscyA9IFsnZWFzeScsICdtZWRpdW0nLCAnaGFyZCddXHJcblxyXG4gIGxldCBidXR0b25TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXktYnV0dG9ucycpXHJcblxyXG4gIGlmIChidXR0b25zVmlzaWJsZSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgbGV0IG5ld0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXHJcbiAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgbmV3QnV0dG9uLmNsYXNzTmFtZSA9ICdidG4gYnRuLXN1Y2Nlc3MgZGlmZmljdWx0eS1jYXJkJ1xyXG4gICAgICAgIG5ld0J1dHRvbi5pZCA9ICdlYXN5J1xyXG4gICAgICB9IGVsc2UgaWYgKGkgPT09IDEpIHtcclxuICAgICAgICBuZXdCdXR0b24uY2xhc3NOYW1lID0gJ2J0biBidG4td2FybmluZyBkaWZmaWN1bHR5LWNhcmQnXHJcbiAgICAgICAgbmV3QnV0dG9uLmlkID0gJ21lZGl1bSdcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuZXdCdXR0b24uY2xhc3NOYW1lID0gJ2J0biBidG4tZGFuZ2VyIGRpZmZpY3VsdHktY2FyZCdcclxuICAgICAgICBuZXdCdXR0b24uaWQgPSAnaGFyZCdcclxuICAgICAgfVxyXG4gICAgICBuZXdCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBuYXZUb1F1aXoobmV3QnV0dG9uLmlkKSlcclxuICAgICAgbmV3QnV0dG9uLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWw+JHtsYWJlbHNbaV19PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIGBcclxuICAgICAgYnV0dG9uU2VjdGlvbi5hcHBlbmRDaGlsZChuZXdCdXR0b24pXHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGxldCBidXR0b25zVG9SZW1vdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGlmZmljdWx0eS1jYXJkJylcclxuICAgIGJ1dHRvbnNUb1JlbW92ZS5mb3JFYWNoKGJ1dHRvbiA9PiBidXR0b24ucmVtb3ZlKCkpXHJcbiAgfVxyXG4gIGJ1dHRvbnNWaXNpYmxlID0gIWJ1dHRvbnNWaXNpYmxlXHJcbn0pXHJcblxyXG5mdW5jdGlvbiBuYXZUb1F1aXooaWQpIHtcclxuY29uc3QgdXNlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyJylcclxuICAgICBjb25zdCB1c2VybmFtZSA9IHVzZXIudGV4dENvbnRlbnQuc3Vic3RyaW5nKDgpO1xyXG4gICAgY29uc29sZS5sb2coJ3VzZXJuYW1lICcsICB1c2VybmFtZSlcclxuICBjb25zb2xlLmxvZygnaW5zaWRlIGJ1dHRvbicpXHJcbiAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgcXVpei5odG1sP3BhcmFtPSR7aWR9JnVzZXI9JHt1c2VybmFtZX1gXHJcbn1cclxuIiwiXHJcblxyXG4vLyBjb25zdCB7c3RhcnRUaW1lciB9ID0gcmVxdWlyZShcIi4vdGltZXJcIilcclxuXHJcblxyXG5cclxuY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcclxuY29uc3QgZGlmZmljdWx0eSA9IHVybFBhcmFtcy5nZXQoJ3BhcmFtJyk7XHJcbmNvbnN0IHVzZXJuYW1lID0gdXJsUGFyYW1zLmdldCgndXNlcicpOyBcclxuY29uc3QgcXVpelRpdGxlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdxdWl6LXRpdGxlJyk7XHJcblxyXG5xdWl6VGl0bGVFbGVtZW50LnRleHRDb250ZW50ICs9IGAke2RpZmZpY3VsdHl9YDtcclxuXHJcbmNvbnNvbGUubG9nKFwicXVpeiBkaWZmaWN1bHR5IFwiLCBkaWZmaWN1bHR5KVxyXG5cclxuLy8gaWYgKGRpZmZpY3VsdHkpIHtcclxuLy8gICAgIHN0YXJ0VGltZXIoZGlmZmljdWx0eSlcclxuLy8gfVxyXG5cclxuIl19
