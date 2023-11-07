(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const soundCard = document.getElementById('sound-card');
const audio = document.getElementById('audio');
const icon = document.querySelector('#sound-card i');

soundCard.addEventListener('click', function () {
    console.log("inside clicked")
    if (audio.paused) {
        icon.className = 'fa-solid fa-volume-high'
        audio.play();
    } else {
        audio.pause();
        icon.className = 'fa-solid fa-volume-xmark'
    }
});

let buttonsVisible = false;

document.getElementById('play-button').addEventListener('click', function () {
    let labels = ['easy', 'medium', 'hard'];

    let buttonSection = document.querySelector('.play-buttons');

    if (buttonsVisible) {
        for (let i = 0; i < 3; i++) {
            let newButton = document.createElement('button');
            if (i === 0) {
                newButton.className = 'btn btn-success difficulty-card';
                newButton.id = 'easy'
            } else if (i === 1) {
                newButton.className = 'btn btn-warning difficulty-card';
                newButton.id = 'medium'
            } else {
                newButton.className = 'btn btn-danger difficulty-card';
                newButton.id = 'hard'

            }
            newButton.addEventListener('click',() => navToQuiz(newButton.id))
            newButton.innerHTML = `
                    <label>${labels[i]}</label>
                `;
            buttonSection.appendChild(newButton);
        }
    } else {
        let buttonsToRemove = document.querySelectorAll('.difficulty-card');
        buttonsToRemove.forEach(button => button.remove());
    }
    buttonsVisible = !buttonsVisible;
});



function navToQuiz(id) {
    console.log("inside button")
    window.location.href = `quiz.html?param=${id}`;
}
},{}],2:[function(require,module,exports){


// const {startTimer } = require("./timer")



const urlParams = new URLSearchParams(window.location.search);
const difficulty = urlParams.get('param');
const quizTitleElement = document.getElementById('quiz-title');

quizTitleElement.textContent += `${difficulty}`;

console.log("quiz difficulty ", difficulty)

// if (difficulty) {
//     startTimer(difficulty)
// }


},{}]},{},[1,2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzdGF0aWMvanMvaW5kZXguanMiLCJzdGF0aWMvanMvcXVpei5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IHNvdW5kQ2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb3VuZC1jYXJkJyk7XHJcbmNvbnN0IGF1ZGlvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F1ZGlvJyk7XHJcbmNvbnN0IGljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc291bmQtY2FyZCBpJyk7XHJcblxyXG5zb3VuZENhcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcImluc2lkZSBjbGlja2VkXCIpXHJcbiAgICBpZiAoYXVkaW8ucGF1c2VkKSB7XHJcbiAgICAgICAgaWNvbi5jbGFzc05hbWUgPSAnZmEtc29saWQgZmEtdm9sdW1lLWhpZ2gnXHJcbiAgICAgICAgYXVkaW8ucGxheSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBhdWRpby5wYXVzZSgpO1xyXG4gICAgICAgIGljb24uY2xhc3NOYW1lID0gJ2ZhLXNvbGlkIGZhLXZvbHVtZS14bWFyaydcclxuICAgIH1cclxufSk7XHJcblxyXG5sZXQgYnV0dG9uc1Zpc2libGUgPSBmYWxzZTtcclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5LWJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGxhYmVscyA9IFsnZWFzeScsICdtZWRpdW0nLCAnaGFyZCddO1xyXG5cclxuICAgIGxldCBidXR0b25TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXktYnV0dG9ucycpO1xyXG5cclxuICAgIGlmIChidXR0b25zVmlzaWJsZSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBuZXdCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIG5ld0J1dHRvbi5jbGFzc05hbWUgPSAnYnRuIGJ0bi1zdWNjZXNzIGRpZmZpY3VsdHktY2FyZCc7XHJcbiAgICAgICAgICAgICAgICBuZXdCdXR0b24uaWQgPSAnZWFzeSdcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdCdXR0b24uY2xhc3NOYW1lID0gJ2J0biBidG4td2FybmluZyBkaWZmaWN1bHR5LWNhcmQnO1xyXG4gICAgICAgICAgICAgICAgbmV3QnV0dG9uLmlkID0gJ21lZGl1bSdcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5ld0J1dHRvbi5jbGFzc05hbWUgPSAnYnRuIGJ0bi1kYW5nZXIgZGlmZmljdWx0eS1jYXJkJztcclxuICAgICAgICAgICAgICAgIG5ld0J1dHRvbi5pZCA9ICdoYXJkJ1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IG5hdlRvUXVpeihuZXdCdXR0b24uaWQpKVxyXG4gICAgICAgICAgICBuZXdCdXR0b24uaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD4ke2xhYmVsc1tpXX08L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgYnV0dG9uU2VjdGlvbi5hcHBlbmRDaGlsZChuZXdCdXR0b24pO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IGJ1dHRvbnNUb1JlbW92ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kaWZmaWN1bHR5LWNhcmQnKTtcclxuICAgICAgICBidXR0b25zVG9SZW1vdmUuZm9yRWFjaChidXR0b24gPT4gYnV0dG9uLnJlbW92ZSgpKTtcclxuICAgIH1cclxuICAgIGJ1dHRvbnNWaXNpYmxlID0gIWJ1dHRvbnNWaXNpYmxlO1xyXG59KTtcclxuXHJcblxyXG5cclxuZnVuY3Rpb24gbmF2VG9RdWl6KGlkKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcImluc2lkZSBidXR0b25cIilcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYHF1aXouaHRtbD9wYXJhbT0ke2lkfWA7XHJcbn0iLCJcclxuXHJcbi8vIGNvbnN0IHtzdGFydFRpbWVyIH0gPSByZXF1aXJlKFwiLi90aW1lclwiKVxyXG5cclxuXHJcblxyXG5jb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xyXG5jb25zdCBkaWZmaWN1bHR5ID0gdXJsUGFyYW1zLmdldCgncGFyYW0nKTtcclxuY29uc3QgcXVpelRpdGxlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdxdWl6LXRpdGxlJyk7XHJcblxyXG5xdWl6VGl0bGVFbGVtZW50LnRleHRDb250ZW50ICs9IGAke2RpZmZpY3VsdHl9YDtcclxuXHJcbmNvbnNvbGUubG9nKFwicXVpeiBkaWZmaWN1bHR5IFwiLCBkaWZmaWN1bHR5KVxyXG5cclxuLy8gaWYgKGRpZmZpY3VsdHkpIHtcclxuLy8gICAgIHN0YXJ0VGltZXIoZGlmZmljdWx0eSlcclxuLy8gfVxyXG5cclxuIl19
