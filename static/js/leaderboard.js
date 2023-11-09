const urlParams = new URLSearchParams(window.location.search)
const initDifficulty = urlParams.get('difficulty')
const username = localStorage.getItem('storedUsername')
let difficulty = initDifficulty? initDifficulty: "easy";


function listRanks (data){
    const table = document.querySelector("tbody");
    table.innerHTML = '';

    for (let i = 0; i < 10 && i < data.length; i++) {
        let row = `<tr>
                    <td class="rank">${i + 1}</td>
                    <td class="name">${data[i].username}</td>
                    <td class="score">${data[i].score}</td>
                </tr>`;
    
        table.innerHTML += row;
    }   
}

async function makeTable(){
    const title = document.querySelector("h1")
    title.textContent = difficulty+" mode leaderboard"
    await fetch(`https://reddy-14-server-app-parjal.onrender.com/scores/${difficulty}`)
    .then(data => data.json())
    .then(data => {
        console.log(data);
        listRanks(data);
        userRank(data, username)
    })

}

function userRank(data, username) {
    const userRank = document.querySelector(".userRank");
    let row;

    const index = data.findIndex(obj => obj.username === username);
    
    if (index !== -1) {
        row = `<tr>
                    <td class="rank">${index + 1}</td>
                    <td class="name">${data[index].username}</td>
                    <td class="score">${data[index].score}</td>
                </tr>`;
        console.log(username,index)
    } 
    else {
        row = `<tr>
                    <td class="rank">N/A</td>
                    <td class="name">N/A</td>
                    <td class="score">N/A</td>
                </tr>`;
    }
    userRank.innerHTML = row;
}

function changeTble() {
    const leftArrow = document.querySelector('#leftArrow');
    const rightArrow = document.querySelector('#rightArrow');
    makeTable();
    leftArrow.style.visibility = 'visible';
    rightArrow.style.visibility = 'visible';

    leftArrow.addEventListener('click', () => {
        if (difficulty === "medium") {
            difficulty = "easy";
            leftArrow.style.visibility = 'hidden';
            makeTable();
        } else if (difficulty === "hard") {
            difficulty = "medium";
            leftArrow.style.visibility = 'visible';
            rightArrow.style.visibility = 'visible';
            makeTable();
        }
    });

    rightArrow.addEventListener('click', () => {
        if (difficulty === "easy") {
            difficulty = "medium";
            leftArrow.style.visibility = 'visible';
            rightArrow.style.visibility = 'visible';
            makeTable();
        } else if (difficulty === "medium") {
            difficulty = "hard";
            rightArrow.style.visibility = 'hidden';
            makeTable();
        }
    });
}

changeTble();

