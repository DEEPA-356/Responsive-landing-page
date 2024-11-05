const gameboard = document.getElementById('gameboard');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetbutton');

let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = (player) => `Player ${player} has won!`;
const drawMessage = () => `Game ended in a draw!`;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex, player) {
    gameState[clickedCellIndex] = player;
    clickedCell.innerHTML = player;
}

function handleResultValidation() {
    let roundWon = false;
    let winner = null;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            winner = gameState[a];
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage(winner);
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
    }
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    let player = prompt("Enter 'X' or 'O':").toUpperCase();
    while (player !== "X" && player !== "O") {
        player = prompt("Invalid input! Enter 'X' or 'O':").toUpperCase();
    }

    handleCellPlayed(clickedCell, clickedCellIndex, player);
    handleResultValidation();
}

function handleResetGame() {
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = "Game Reset. Start Playing!";
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

// Add event listeners
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleResetGame);