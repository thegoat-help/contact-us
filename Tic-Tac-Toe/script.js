document.addEventListener("DOMContentLoaded", function () {
    const cells = document.querySelectorAll(".cell");
    const resultElement = document.getElementById("result");
    const resetButton = document.getElementById("resetBtn");
    const playerXScoreElement = document.getElementById("playerXScore");
    const playerOScoreElement = document.getElementById("playerOScore");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;
    let playerXScore = 0;
    let playerOScore = 0;

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

    function checkDraw() {
        return gameBoard.every(cell => cell !== "");
    }

    function updateResult(winner) {
        if (winner) {
            resultElement.textContent = `Player ${winner} wins!`;
            updateScore(winner);
        } else if (checkDraw()) {
            resultElement.textContent = "It's a draw!";
        }

        gameActive = false;
    }

    function updateScore(winner) {
        if (winner === "X") {
            playerXScore++;
            playerXScoreElement.textContent = `Player X: ${playerXScore}`;
        } else {
            playerOScore++;
            playerOScoreElement.textContent = `Player O: ${playerOScore}`;
        }
    }

    function handleCellClick(index) {
        if (!gameActive || gameBoard[index] !== "") {
            return;
        }

        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            updateResult(winner);
        } else if (checkDraw()) {
            updateResult(null);
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }

    function resetGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => (cell.textContent = ""));
        resultElement.textContent = "";
        gameActive = true;
        currentPlayer = "X";
    }

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => handleCellClick(index));
    });

    resetButton.addEventListener("click", resetGame);
});
