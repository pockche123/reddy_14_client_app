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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzdGF0aWMvanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3Qgc291bmRDYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvdW5kLWNhcmQnKVxuY29uc3QgYXVkaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXVkaW8nKVxuY29uc3QgaWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzb3VuZC1jYXJkIGknKVxuY29uc3QgdXNlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyJylcblxuc291bmRDYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICBjb25zb2xlLmxvZygnaW5zaWRlIGNsaWNrZWQnKVxuICBpZiAoYXVkaW8ucGF1c2VkKSB7XG4gICAgaWNvbi5jbGFzc05hbWUgPSAnZmEtc29saWQgZmEtdm9sdW1lLWhpZ2gnXG4gICAgYXVkaW8ucGxheSgpXG4gIH0gZWxzZSB7XG4gICAgYXVkaW8ucGF1c2UoKVxuICAgIGljb24uY2xhc3NOYW1lID0gJ2ZhLXNvbGlkIGZhLXZvbHVtZS14bWFyaydcbiAgfVxufSlcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lLWZvcm0nKS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4gc2hvd05leHQoZSkpXG5cbmZ1bmN0aW9uIHNob3dOZXh0KGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zb2xlLmxvZygnaW5zaWRlIHN1Ym1pdCcpXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VybmFtZS1mb3JtJylcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VybmFtZS1pbnB1dCcpXG4gICAgY29uc3QgdXNlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyJylcblxuICAgIGlmIChpbnB1dC52YWx1ZS50cmltKCkgIT09IFwiXCIpIHtcbiAgICAgICAgdXNlci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICAgICAgICB1c2VyLnRleHRDb250ZW50ICs9IGlucHV0LnZhbHVlLnRyaW0oKTsgXG4gICAgICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheS1idXR0b24nKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheS1idXR0b25zJykuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luc3RydWN0aW9uLWJ1dHRvbicpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZWFkZXJib2FyZC1idXR0b24nKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICAgIH1cbn1cblxubGV0IGJ1dHRvbnNWaXNpYmxlID0gZmFsc2VcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXktYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gIGxldCBsYWJlbHMgPSBbJ2Vhc3knLCAnbWVkaXVtJywgJ2hhcmQnXVxuXG4gIGxldCBidXR0b25TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXktYnV0dG9ucycpXG5cbiAgaWYgKGJ1dHRvbnNWaXNpYmxlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgIGxldCBuZXdCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgbmV3QnV0dG9uLmNsYXNzTmFtZSA9ICdidG4gYnRuLXN1Y2Nlc3MgZGlmZmljdWx0eS1jYXJkJ1xuICAgICAgICBuZXdCdXR0b24uaWQgPSAnZWFzeSdcbiAgICAgIH0gZWxzZSBpZiAoaSA9PT0gMSkge1xuICAgICAgICBuZXdCdXR0b24uY2xhc3NOYW1lID0gJ2J0biBidG4td2FybmluZyBkaWZmaWN1bHR5LWNhcmQnXG4gICAgICAgIG5ld0J1dHRvbi5pZCA9ICdtZWRpdW0nXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdCdXR0b24uY2xhc3NOYW1lID0gJ2J0biBidG4tZGFuZ2VyIGRpZmZpY3VsdHktY2FyZCdcbiAgICAgICAgbmV3QnV0dG9uLmlkID0gJ2hhcmQnXG4gICAgICB9XG4gICAgICBuZXdCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBuYXZUb1F1aXoobmV3QnV0dG9uLmlkKSlcbiAgICAgIG5ld0J1dHRvbi5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD4ke2xhYmVsc1tpXX08L2xhYmVsPlxuICAgICAgICAgICAgICAgIGBcbiAgICAgIGJ1dHRvblNlY3Rpb24uYXBwZW5kQ2hpbGQobmV3QnV0dG9uKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBsZXQgYnV0dG9uc1RvUmVtb3ZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRpZmZpY3VsdHktY2FyZCcpXG4gICAgYnV0dG9uc1RvUmVtb3ZlLmZvckVhY2goYnV0dG9uID0+IGJ1dHRvbi5yZW1vdmUoKSlcbiAgfVxuICBidXR0b25zVmlzaWJsZSA9ICFidXR0b25zVmlzaWJsZVxufSlcblxuZnVuY3Rpb24gbmF2VG9RdWl6KGlkKSB7XG5jb25zdCB1c2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXInKVxuICAgIGNvbnN0IHVzZXJuYW1lID0gdXNlci50ZXh0Q29udGVudC5zdWJzdHJpbmcoOCk7XG4gICAgY29uc29sZS5sb2coJ3VzZXJuYW1lICcsICB1c2VybmFtZSlcbiAgY29uc29sZS5sb2coJ2luc2lkZSBidXR0b24nKVxuICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGBxdWl6Lmh0bWw/ZGlmZmljdWx0eT0ke2lkfSZ1c2VyPSR7dXNlcm5hbWV9YFxufVxuIl19
