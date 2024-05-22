
let userScore = 0;
let systemScore = 0;
let userBatting = true;
let userTurnOver = false;
let systemTurnOver = false;
let currentPlayer = true; // true for user, false for bot

function startGame() {
    document.getElementById('playButton').style.display = 'none';
    document.getElementById('gameControls').style.display = 'block';
    document.getElementById('tossInput').focus();
    displayMessage("Game started! Please enter your toss choice.");
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        handleToss();
    }
}

function handleToss() {
    const tossInput = document.getElementById('tossInput').value;
    if (tossInput === "" || tossInput === null) {
        displayMessage("Please enter a value for the toss.");
        return;
    }

    const userToss = parseInt(tossInput);
    const tossResult = Math.floor(Math.random() * 2); // 0 or 1 randomly

    document.getElementById('tossResult').value = tossResult === 0 ? "Heads" : "Tails";

    if (userToss === tossResult) {
        displayMessage("You won the toss! You will bat first.");
        userBatting = true;
        currentPlayer = true;
    } else {
        displayMessage("You lost the toss! You will bowl first.");
        userBatting = false;
        currentPlayer = false;
    }

    document.getElementById('tossInput').readOnly = true;
    document.getElementById('userChoice').focus();
}

document.getElementById('userChoice').addEventListener('input', function() {
    const choice = this.value;
    if (choice >= 1 && choice <= 6) {
        handleChoice(choice);
    }
});

function handleChoice(choice) {
    const systemChoice = Math.floor(Math.random() * 6) + 1;
    document.getElementById('systemChoice').value = systemChoice;

    if (currentPlayer) {
        // User's turn
        if (parseInt(choice) === systemChoice) {
            displayMessage("You are out! Your final score: " + userScore);
            currentPlayer = !currentPlayer; // Switch to bot's turn
            userTurnOver = true;
            document.getElementById('userChoice').value = "";
            if (userBatting) {
                displayMessage("Bot's turn to bat.");
            } else {
                determineWinner();
            }
        } else {
            userScore += parseInt(choice);
            document.getElementById('userScore').value = userScore;
        }
    } else {
        // Bot's turn
        if (parseInt(choice) === systemChoice) {
            displayMessage("System is out! System's final score: " + systemScore);
            currentPlayer = !currentPlayer; // Switch back to user's turn
            systemTurnOver = true;
            if (!userBatting) {
                determineWinner();
            }
        } else {
            systemScore += systemChoice;
            document.getElementById('systemScore').value = systemScore;
        }
    }

    if (userTurnOver && systemTurnOver) {
        determineWinner();
    }
}

function determineWinner() {
    let message;
    if (userScore > systemScore) {
        message = "Congratulations! You win!";
    } else if (userScore < systemScore) {
        message = "System wins! Better luck next time.";
    } else {
        message = "It's a tie!";
    }
    displayMessage(message);
    alert(message); // Display winner name in the alert
    resetGame();
}

function resetGame() {
    userScore = 0;
    systemScore = 0;
    userTurnOver = false;
    systemTurnOver = false;
    currentPlayer = true; // Reset to user's turn
    document.getElementById('userScore').value = userScore;
    document.getElementById('systemScore').value = systemScore;
    document.getElementById('userChoice').value = "";
    document.getElementById('systemChoice').value = "";
    document.getElementById('tossInput').value = "";
    document.getElementById('tossInput').readOnly = false;
    document.getElementById('playButton').style.display = 'block';
    document.getElementById('gameControls').style.display = 'none';
    displayMessage("Game reset. Click 'Start Game' to play again.");
}

function displayMessage(message) {
    const messageBox = document.getElementById('messageBox');
    messageBox.innerHTML = message;
}
