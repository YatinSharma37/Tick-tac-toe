document.addEventListener('DOMContentLoaded', function () {
    const boxes = document.querySelectorAll('.box');
    const msgContainer = document.querySelector('.msg-container');
    const message = document.getElementById('msg');
    const newGameBtn = document.getElementById('new-btn');
    const resetGameBtn = document.getElementById('reset-btn');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return null;
    }

    function checkTie() {
        return gameBoard.every((value) => value !== '');
    }

    function updateGameStatus() {
        const winner = checkWinner();

        if (winner) {
            message.textContent = `${winner} wins!`;
            gameActive = false;
        } else if (checkTie()) {
            message.textContent = "It's a tie!";
            gameActive = false;
        }
    }

    function handleBoxClick(index) {
        if (gameBoard[index] === '' && gameActive) {
            gameBoard[index] = currentPlayer;
            boxes[index].textContent = currentPlayer;
            updateGameStatus();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

            if (!gameActive) {
                msgContainer.classList.remove('hide');
            }
        }
    }

    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        boxes.forEach((box) => (box.textContent = ''));
        msgContainer.classList.add('hide');
        gameActive = true;
        currentPlayer = 'X';
    }

    // Event listeners
    boxes.forEach((box, index) => {
        box.addEventListener('click', () => handleBoxClick(index));
    });

    newGameBtn.addEventListener('click', () => {
        resetGame();
    });

    resetGameBtn.addEventListener('click', () => {
        resetGame();
    });
});
