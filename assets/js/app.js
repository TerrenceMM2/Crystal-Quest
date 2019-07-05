// HTML element - sorted by DOM order
var target = document.getElementById("target");
var goal = document.getElementById("goal");
var crystalContainer = document.getElementById("crystal-container");
var crystal = document.getElementsByClassName("crystal");
var crystal1 = document.getElementById("crystal1");
var crystal2 = document.getElementById("crystal2");
var crystal3 = document.getElementById("crystal3");
var crystal4 = document.getElementById("crystal4");
var instructions = document.getElementById("instructions")
var question = document.getElementById("question");
var stats = document.getElementById("stats");
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
animateCSS("#start-game", "fadeIn");

crystalContainer.onclick = function (event) {
    // Makes sure that only the crystal elements and values are passed.
    // Source: https://gomakethings.com/listening-for-click-events-with-vanilla-javascript/
    if (!event.target.matches('.crystal')) return;
    animateCSS("#" + event.target.id, "flash");
    animateCSS("#goal", "fadeIn");
    playSound();
    crystalSelection();
    calculateGame(goalNumber);
}

startGameButton.onclick = function () {
    currentGame = true;
    startGameButton.classList.remove("delay-3s");
    animateCSS("#start-game", "fadeOut", function() {
        hideElement(startGameButton);
    });
    instructions.style.display = "block";
    start = setInterval(startGame, 15000);
}

resetGameButton.onclick = function () {
    currentGame = false;
    gameStatus(currentGame);
    resetGame();
}

function startGame() {
    animateCSS("#instructions", "fadeOut", function() {
        instructions.style.display = "none";
        for (var i = 0; i < crystalArray.length; i++) {
            animateCSS("#" + crystalArray[i].id, "fadeInLeft");
        }
        animateCSS("#target", "fadeIn");
        animateCSS("#question", "fadeIn");
        animateCSS("#stats", "fadeIn");
        target.style.display = "block";
        question.style.display = "inline-block";
        stats.style.display = "block";
        gameStatus(currentGame);
        newGame();
        clearInterval(start);
    });
}

function calculateGame(num) {
    if (num < 0) {
        crystalContainer.onclick = function () {
            return
        };
        animateCSS("#message", "fadeIn");
        message.innerHTML = "Sorry. You lose.";
        lossCount++;
        animateCSS("#losses", "fadeIn");
        losses.innerHTML = lossCount;
    } else if (num === 0) {
        crystalContainer.onclick = function () {
            return
        };
        animateCSS("#message", "fadeIn");
        message.innerHTML = "Congratulations! You win!";
        winCount++
        animateCSS("#wins", "fadeIn");
        wins.innerHTML = winCount;
    };
}

function crystalSelection() {
    if (goalNumber <= 0) return;
    var crystalValue = parseInt(event.target.dataset.value);
    console.log(crystalValue);
    goalNumber -= crystalValue;
    goal.innerHTML = goalNumber;
}

function gameStatus(boolean) {
    if (boolean) {
        console.log("current Game Status: " + boolean);
        crystalContainer.style.display = "flex";
        resetGameButton.style.display = "block";
        startGameButton.style.display = "none";
    } else {
        console.log("current Game Status: " + boolean);
        crystalContainer.style.display = "none";
        resetGameButton.style.display = "none";
        startGameButton.style.display = "block";
    }
};

function hideElement(obj) {
    obj.style.display = "none";
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
    message.style.display = "none";
    stats.style.display = "none";
    target.style.display = "none";
    currentGame = true;
    startGame();
    newGame();
}

function playSound() {
    var audio = document.getElementById("gem-sound");
    audio.currentTime = 0;
    audio.play();
}

function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}