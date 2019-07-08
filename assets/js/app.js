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
var musicBed = document.getElementById("music-bed");

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

crystalContainer.addEventListener("click", function(event) {
    // Makes sure that only the crystal elements and values are passed.
    // Source: https://gomakethings.com/listening-for-click-events-with-vanilla-javascript/
    if (!event.target.matches('.crystal')) return;
    if (goalNumber <= 0) return;
    crystalSelection();
    animateCSS("#" + event.target.id, "flash");
    animateCSS("#goal", "fadeIn");
    playSound();
});

startGameButton.addEventListener("click", function () {
    currentGame = true;
    startGameButton.classList.remove("delay-3s");
    animateCSS("#start-game", "fadeOut", function () {
        startGameButton.style.display = "none";
    });
    instructions.style.display = "block";
    start = setInterval(startGame, 15000);
    musicBed.play();
});

resetGameButton.addEventListener("click", function () {
    gameStatus(currentGame);
    resetGame();
});

// Use to reset and show the correct elements.
function startGame() {
    newNumbers();
    // To accommodate a new game.
    if (instructions.style.display === "block") {
        animateCSS("#instructions", "fadeOut", function () {
            instructions.style.display = "none";
            for (var i = 0; i < crystalArray.length; i++) {
                animateCSS("#" + crystalArray[i].id, "fadeInLeft");
            }
            target.style.display = "block";
            question.style.display = "inline-block";
            stats.style.display = "block";
            gameStatus(currentGame);
        });
    // To accommodate a reset game.
    } else {
        for (var i = 0; i < crystalArray.length; i++) {
            animateCSS("#" + crystalArray[i].id, "fadeInLeft");
        }
        target.style.display = "block";
        question.style.display = "inline-block";
        stats.style.display = "block";
        gameStatus(currentGame);
    };
    clearInterval(start);
};

// Will generate new values for each crystal and the target number.
function newNumbers() {
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

// Will reset the displayed text and the elements shown.
function resetGame() {
    goal.innerHTML = "";
    message.innerHTML = "";
    stats.style.display = "none";
    target.style.display = "none";
    question.style.display = "none";
    crystalContainer.style.display = "none";
    currentGame = true;
    startGame();
};

// Use to calculate a winning or losing game.
function calculateGame(num) {
    if (num < 0) {
        // Used stop the user from click the crystals after the game has ended.
        crystalContainer.addEventListener("click", function () {
            return
        });
        animateCSS("#message", "fadeIn");
        message.innerHTML = "Sorry. You lose.";
        lossCount++;
        animateCSS("#losses", "fadeIn");
        losses.innerHTML = lossCount;
    } else if (num === 0) {
        crystalContainer.addEventListener("click", function () {
            return
        });
        animateCSS("#message", "fadeIn");
        message.innerHTML = "Congratulations! You win!";
        winCount++
        animateCSS("#wins", "fadeIn");
        wins.innerHTML = winCount;
    };
};

// Used to subtract the selected crystal value from the goal number.
// If the game is over, the function will stop to keep the number from going down.
function crystalSelection() {
    var crystalValue = parseInt(event.target.dataset.value);
    goalNumber -= crystalValue;
    goal.innerHTML = goalNumber;
    calculateGame(goalNumber);
};

// Check the status of the game to display the correct elements.
function gameStatus(boolean) {
    if (boolean) {
        crystalContainer.style.display = "flex";
        resetGameButton.style.display = "block";
        startGameButton.style.display = "none";
    } else {
        crystalContainer.style.display = "none";
        resetGameButton.style.display = "none";
        startGameButton.style.display = "block";
    }
};

// Plays a sound on each crystal click.
function playSound() {
    var audio = document.getElementById("gem-sound");
    audio.currentTime = 0;
    audio.play();
};

// Function borrowed from https://github.com/daneden/animate.css#usage-with-javascript
function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
};