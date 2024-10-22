let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let timeLeft = 30;
let gameTimer;



window.onload = () => {
    document.getElementById("start").addEventListener("click",setGame);
    
};
const setGame = () => {
    for (let i = 0; i < 9; i++) { // Create 9 tiles
        let tile = document.createElement("div");
        tile.id = i.toString(); // Set the tile's ID
        document.getElementById("board").appendChild(tile); // Add tile to the board
        tile.addEventListener("click", selectTile); // Attach click event to each tile
       
    }
    setInterval(setMole, 1000); // Show a mole every 1 second
    setInterval(setPlant, 2000); // Show a plant every 2 seconds
    gameTimer = setInterval(updateTime, 1000);
};


const selectTile =function (){
    if (gameOver) return; // Prevent interaction if the game is over
    if (this === currMoleTile) {
        score += 10; // Increase score if the mole is clicked
        document.getElementById("score").innerText ="Score:" +score.toString(); // Update score display
    } else if (this === currPlantTile) {
        endGame();
    }
};



const getRandomTile = () => {
    let num = Math.floor(Math.random() * 9); // Generate a random tile number
    return num.toString(); // Return as a string
};

const setMole = () => {
    if (gameOver) return; // Stop if the game is over
    if (currMoleTile)
        {currMoleTile.innerHTML = ""; // Clear previous mole if exists
    }
    let mole = document.createElement("img");
    mole.src = "./assets/monty-mole.png"; // Path to mole image

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id === num) return; // Prevent mole and plant from overlapping
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole); // Add mole image to the current tile
};

const setPlant = () => {
    if (gameOver) return; // Stop if the game is over
    if (currPlantTile) currPlantTile.innerHTML = ""; // Clear previous plant if exists

    let plant = document.createElement("img");
    plant.src = "./assets/piranha-plant.png"; // Path to plant image

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id === num) return; // Prevent plant from overlapping with mole
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant); // Add plant image to the current tile
};

const endGame = () => {
    document.getElementById("score").innerText = "GAME OVER: " + score.toString(); // Update score display with final score
    gameOver = true; // Set gameOver flag to true
    clearInterval(currMoleTile); // Stop the mole intervals
    clearInterval(currPlantTile); // Stop the plant intervals
    clearInterval(gameTimer);
};


const updateTime = () => {
    timeLeft--;
    document.getElementById('time').innerText = timeLeft;
    if (timeLeft <= 0) {
        endGame();
    }
};
