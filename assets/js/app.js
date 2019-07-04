// HTML element - sorted by DOM order
var goal = document.getElementById("goal");
var crystalContainer = document.getElementById("crystal-container");
var crystal1 = document.getElementById("crystal1");
var crystal2 = document.getElementById("crystal2");
var crystal3 = document.getElementById("crystal3");
var crystal4 = document.getElementById("crystal4");
var wins = document.getElementById("wins");
var losses = document.getElementById("losses");
var message = document.getElementById("message");
var startGameButton = document.getElementById("start-game");
var resetGameButton = document.getElementById("reset-game");

var crystalArrayNumbers = [];
var crystalArray = [crystal1, crystal2, crystal3, crystal4];

var currentGame = false;
var winCount = 0;
var lossCount = 0;
var goalNumber = 0;
var userCount = 0;
var index = 0;

wins.innerHTML = winCount;
losses.innerHTML = lossCount;

gameStatus(currentGame);
animateCSS("#start-game", "fadeIn", "delay-3s");

document.onclick = function (event) {
    // Makes sure that only the crystal elements and values are passed.
    // Source: https://gomakethings.com/listening-for-click-events-with-vanilla-javascript/
    console.log(event.target.id);
    if (!event.target.matches('.crystal')) return;
    animateCSS("#" + event.target.id, "flash", "faster");
    playSound();
    crystalSelection();
    calculateGame(goalNumber);
}

startGameButton.onclick = function() {
    currentGame = true;
    for (var i = 0; i < crystalArray.length; i++) {
        animateCSS("#" + crystalArray[i].id, "fadeInLeft");
    }
    gameStatus(currentGame);
    newGame();
}

resetGameButton.onclick = function() {
    currentGame = false;
    gameStatus(currentGame);
    resetGame();
}

function calculateGame(num) {
    if (num < 0) {
        message.innerHTML = "Sorry. You lose.";
        lossCount++;
        losses.innerHTML = lossCount;
    } else if (num === 0) {
        message.innerHTML = "Congratulations! You win!";
        winCount++
        wins.innerHTML = winCount;
    }
}

function crystalSelection() {
    if (goalNumber <= 0) return;
    var crystalValue = parseInt(event.target.dataset.value);
    console.log(crystalValue);
    goalNumber -= crystalValue;
    goal.innerHTML = goalNumber;
}

function gameStatus(boolean){
    if (boolean) {
        console.log("current Game Status: " + boolean);
        crystalContainer.style.display = "flex";
        resetGameButton.style.display = "block";
        startGameButton.style.display = "none";
    } else {
        console.log("current Game Status: " + boolean);
        crystalContainer.style.display = "none";
        resetGameButton.style.display = "none";
        startGameButton.style.display = "block"
    }
};

function newGame() {
    index = 0;
    goalNumber = Math.floor(Math.random() * (150 - 50) + 50);
    crystalArrayNumbers = [];
    goal.innerHTML = goalNumber;
    while (crystalArrayNumbers.length < 4) {
        var x = Math.floor(Math.random() * 20) + 1;
        if (crystalArrayNumbers.indexOf(x) === -1) {
            crystalArrayNumbers.push(x);
            crystalArray[index].setAttribute("data-value", x);
            index++
        };
    };
};

function resetGame() {
    console.log("reset");
    goal.innerHTML = "";
    message.innerHTML = "";
}

function playSound() {
    var audio = document.getElementById("gem-sound");
    audio.currentTime = 0;
    audio.play();
}

function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element);
    node.classList.add('animated', animationName, callback)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}