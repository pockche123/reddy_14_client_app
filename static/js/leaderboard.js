
function listRanks (data){
    const table = document.querySelector("tbody");
    table.innerHTML = '';

    for (let i = 0; i < 10 && i < data.length; i++){
        let row = `<tr>
                    <td class="rank">${i+1}</td>
                    <td class="name">${data[i].username}</td>
                    <td class="score">${data[i].score}</td>
                </tr>`
        table.innerHTML += row;
    }
}

mode = "medium"
async function makeTable(){
    const title = document.querySelector("h1")
    title.textContent = mode+" mode leaderboard"
    await fetch(`http://localhost:8080/scores/${mode}`)
    .then(data => data.json())
    .then(data => {
        console.log(data);
        listRanks(data);
    })

}


function changeTble() {
    const leftArrow = document.querySelector('#leftArrow');
    const rightArrow = document.querySelector('#rightArrow');
    makeTable();
    leftArrow.style.visibility = 'visible';
    rightArrow.style.visibility = 'visible';

    leftArrow.addEventListener('click', () => {
        if (mode === "medium") {
            mode = "easy";
            leftArrow.style.visibility = 'hidden';
            makeTable();
        } else if (mode === "hard") {
            mode = "medium";
            leftArrow.style.visibility = 'visible';
            rightArrow.style.visibility = 'visible';
            makeTable();
        }
    });

    rightArrow.addEventListener('click', () => {
        if (mode === "easy") {
            mode = "medium";
            leftArrow.style.visibility = 'visible';
            rightArrow.style.visibility = 'visible';
            makeTable();
        } else if (mode === "medium") {
            mode = "hard";
            rightArrow.style.visibility = 'hidden';
            makeTable();
        }
    });
}

changeTble();



