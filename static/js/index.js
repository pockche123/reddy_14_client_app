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