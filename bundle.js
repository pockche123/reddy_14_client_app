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
            } else if (i === 1) {
                newButton.className = 'btn btn-warning difficulty-card';
            } else {
                newButton.className = 'btn btn-danger difficulty-card';

            }
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
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzdGF0aWMvanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3Qgc291bmRDYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvdW5kLWNhcmQnKTtcclxuY29uc3QgYXVkaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXVkaW8nKTtcclxuY29uc3QgaWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzb3VuZC1jYXJkIGknKTtcclxuXHJcbnNvdW5kQ2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiaW5zaWRlIGNsaWNrZWRcIilcclxuICAgIGlmIChhdWRpby5wYXVzZWQpIHtcclxuICAgICAgICBpY29uLmNsYXNzTmFtZSA9ICdmYS1zb2xpZCBmYS12b2x1bWUtaGlnaCdcclxuICAgICAgICBhdWRpby5wbGF5KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGF1ZGlvLnBhdXNlKCk7XHJcbiAgICAgICAgaWNvbi5jbGFzc05hbWUgPSAnZmEtc29saWQgZmEtdm9sdW1lLXhtYXJrJ1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmxldCBidXR0b25zVmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXktYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgbGFiZWxzID0gWydlYXN5JywgJ21lZGl1bScsICdoYXJkJ107XHJcblxyXG4gICAgbGV0IGJ1dHRvblNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheS1idXR0b25zJyk7XHJcblxyXG4gICAgaWYgKGJ1dHRvbnNWaXNpYmxlKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG5ld0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbmV3QnV0dG9uLmNsYXNzTmFtZSA9ICdidG4gYnRuLXN1Y2Nlc3MgZGlmZmljdWx0eS1jYXJkJztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdCdXR0b24uY2xhc3NOYW1lID0gJ2J0biBidG4td2FybmluZyBkaWZmaWN1bHR5LWNhcmQnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3QnV0dG9uLmNsYXNzTmFtZSA9ICdidG4gYnRuLWRhbmdlciBkaWZmaWN1bHR5LWNhcmQnO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdCdXR0b24uaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD4ke2xhYmVsc1tpXX08L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgYnV0dG9uU2VjdGlvbi5hcHBlbmRDaGlsZChuZXdCdXR0b24pO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IGJ1dHRvbnNUb1JlbW92ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kaWZmaWN1bHR5LWNhcmQnKTtcclxuICAgICAgICBidXR0b25zVG9SZW1vdmUuZm9yRWFjaChidXR0b24gPT4gYnV0dG9uLnJlbW92ZSgpKTtcclxuICAgIH1cclxuICAgIGJ1dHRvbnNWaXNpYmxlID0gIWJ1dHRvbnNWaXNpYmxlO1xyXG59KTsiXX0=
