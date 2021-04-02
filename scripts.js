const boardTable = document.querySelector('.board');
const gameOverModal = document.querySelector('.game-over-modal');
const gameOverMessage = gameOverModal.querySelector('.game-over-message');
const restartButton = gameOverModal.querySelector('.restart-button');

boardTable.addEventListener('click', setPlayerMove)
restartButton.addEventListener('click', startGame);

let currentPlayer, winner, isGameOver, turn;

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

function startGame() {
    currentPlayer = 'X';
    winner = null;
    isGameOver = false;
    turn =0;
    boardTable.style.setProperty('--current-player', '"X"');
    hideGameOverModal();
    clearBoard();
}

function clearBoard() {
    boardTable.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
}

function setPlayerMove({target}) {
    if(!isGameOver &&
        target.classList.contains('cell') &&
        target.innerText === ''
    ) {
        target.innerText = currentPlayer;
        turn++;
        if(turn > 4) {
            checkGameOver();
        }
        togglePlayer();
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    boardTable.style.setProperty('--current-player', `"${currentPlayer}"`);
}

function checkGameOver() {
    winner = checkWinner();

    if(winner) {
        console.log('winner: ', winner)
        showGameOverModal(`Vitória do '${winner}'`);
    } else if(turn > 8) {
        showGameOverModal(`Deu Velha!`);
    }
}

function checkWinner() {
    let cells = boardTable.querySelectorAll('.cell');
    cells = Array.from(cells).map(cell => cell.innerText);
    
    const values = winningConditions.map(condition => condition.map(position => cells[position]).join(''))

    const isXWinner = values.includes('XXX');
    const isOWinner = values.includes('OOO');

    if(isOWinner || isXWinner){
        isGameOver = true;
        if(isOWinner){
            return 'O';
        }
        return 'X';
    }

    return null;
}

function showGameOverModal(message) {
    gameOverMessage.innerText = message;
    gameOverModal.setAttribute('open', 'true');
}

function hideGameOverModal() {
    gameOverModal.removeAttribute('open');
}

startGame();
