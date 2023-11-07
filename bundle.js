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


const easy = document.getElementsByClassName("difficulty-card")


function navToQuiz(id) {
    console.log("inside button")
    window.location.href = `quiz.html?param=${id}`;
}
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzdGF0aWMvanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBzb3VuZENhcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc291bmQtY2FyZCcpO1xyXG5jb25zdCBhdWRpbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhdWRpbycpO1xyXG5jb25zdCBpY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NvdW5kLWNhcmQgaScpO1xyXG5cclxuc291bmRDYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJpbnNpZGUgY2xpY2tlZFwiKVxyXG4gICAgaWYgKGF1ZGlvLnBhdXNlZCkge1xyXG4gICAgICAgIGljb24uY2xhc3NOYW1lID0gJ2ZhLXNvbGlkIGZhLXZvbHVtZS1oaWdoJ1xyXG4gICAgICAgIGF1ZGlvLnBsYXkoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXVkaW8ucGF1c2UoKTtcclxuICAgICAgICBpY29uLmNsYXNzTmFtZSA9ICdmYS1zb2xpZCBmYS12b2x1bWUteG1hcmsnXHJcbiAgICB9XHJcbn0pO1xyXG5cclxubGV0IGJ1dHRvbnNWaXNpYmxlID0gZmFsc2U7XHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheS1idXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBsYWJlbHMgPSBbJ2Vhc3knLCAnbWVkaXVtJywgJ2hhcmQnXTtcclxuXHJcbiAgICBsZXQgYnV0dG9uU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5LWJ1dHRvbnMnKTtcclxuXHJcbiAgICBpZiAoYnV0dG9uc1Zpc2libGUpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbmV3QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdCdXR0b24uY2xhc3NOYW1lID0gJ2J0biBidG4tc3VjY2VzcyBkaWZmaWN1bHR5LWNhcmQnO1xyXG4gICAgICAgICAgICAgICAgbmV3QnV0dG9uLmlkID0gJ2Vhc3knXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgbmV3QnV0dG9uLmNsYXNzTmFtZSA9ICdidG4gYnRuLXdhcm5pbmcgZGlmZmljdWx0eS1jYXJkJztcclxuICAgICAgICAgICAgICAgIG5ld0J1dHRvbi5pZCA9ICdtZWRpdW0nXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuZXdCdXR0b24uY2xhc3NOYW1lID0gJ2J0biBidG4tZGFuZ2VyIGRpZmZpY3VsdHktY2FyZCc7XHJcbiAgICAgICAgICAgICAgICBuZXdCdXR0b24uaWQgPSAnaGFyZCdcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKSA9PiBuYXZUb1F1aXoobmV3QnV0dG9uLmlkKSlcclxuICAgICAgICAgICAgbmV3QnV0dG9uLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWw+JHtsYWJlbHNbaV19PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgIGJ1dHRvblNlY3Rpb24uYXBwZW5kQ2hpbGQobmV3QnV0dG9uKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBidXR0b25zVG9SZW1vdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGlmZmljdWx0eS1jYXJkJyk7XHJcbiAgICAgICAgYnV0dG9uc1RvUmVtb3ZlLmZvckVhY2goYnV0dG9uID0+IGJ1dHRvbi5yZW1vdmUoKSk7XHJcbiAgICB9XHJcbiAgICBidXR0b25zVmlzaWJsZSA9ICFidXR0b25zVmlzaWJsZTtcclxufSk7XHJcblxyXG5cclxuY29uc3QgZWFzeSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJkaWZmaWN1bHR5LWNhcmRcIilcclxuXHJcblxyXG5mdW5jdGlvbiBuYXZUb1F1aXooaWQpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiaW5zaWRlIGJ1dHRvblwiKVxyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgcXVpei5odG1sP3BhcmFtPSR7aWR9YDtcclxufSJdfQ==
