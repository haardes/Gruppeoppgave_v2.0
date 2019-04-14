let stage = "index",
    prevStage = "",
    game, player1, player2;

function toggleActive(e) {
    e.classList.contains("active") ? e.classList.remove("active") : e.classList.add("active");
}

function initGame() {
    initPlayers();
    fadeIndex();
    fadeHeader();
    setTimeout(() => {
        fadeSetup();
    }, 1000);
    stage = "setup";
}

function startGame() {
    if (player1.name == "Computer" && player1.human == true) {
        let errorP = document.createElement("p");
        errorP.innerText = "Please set name of player 1";
        document.body.appendChild(errorP);
        setTimeout(() => document.body.removeChild(errorP), 2000);
    } else if (player2.name == "Computer" && player2.human == true) {
        let errorP = document.createElement("p");
        errorP.innerText = "Please set name of player 2";
        document.body.appendChild(errorP);
        setTimeout(() => document.body.removeChild(errorP), 2000);
    } else {
        initNim();
        fadeSetup();
        setTimeout(() => {
            fadeGame();
            game.show();
        }, 1000);
        stage = "playing";
    }
}

function initPlayers() {
    player1 = new Player(JSON.parse(document.querySelector(".player-setup.player1>.control-button").value));
    player2 = new Player(JSON.parse(document.querySelector(".player-setup.player2>.control-button").value));
}

function initNim() {
    game = new Nim(player1, player2, (loser) => {
        let winner = (loser == game.player1) ? game.player2 : game.player1;
        document.querySelector(".nim-container").innerText = `${loser.name} has lost the game.\nCongratulations to ${winner.name}!`;
        document.querySelector(".pyro").classList.remove("hidden");
        document.querySelector("body").style.backgroundColor = "#444";
    }, 20, parseInt(document.querySelector(".game-setup>p").innerText));
}

function back() {
    switch (stage) {
        case "setup":
            fadeSetup();
            fadeHeader();
            setTimeout(() => {
                fadeIndex();
            }, 1000);
            stage = "index";
            break;

        case "help":
            switch (prevStage) {
                case "index":
                    fadeHeader();
                    fadeHelp(true);
                    setTimeout(() => {
                        fadeIndex();
                    }, 1000);
                    break;

                case "setup":
                    fadeHelp(true);
                    setTimeout(() => {
                        fadeSetup();
                    }, 1000);
                    break;

                case "playing":
                    fadeHelp(true);
                    setTimeout(() => {
                        fadeGame();
                    }, 1000);
                    break;
            }
            stage = prevStage;
            break;

        case "playing":
            fadeGame();
            setTimeout(() => {
                fadeSetup();
            }, 1000);
            stage = "setup";
            break;
    }
}

/**
 * TODO: Skriv om til switch, mye renere kode
 */
function help() {
    switch (stage) {
        case "index":
            fadeIndex();
            fadeHeader();
            setTimeout(() => {
                fadeHelp();
            }, 1000);
            break;

        case "setup":
            fadeSetup();
            setTimeout(() => {
                fadeHelp();
            }, 1000);
            break;

        case "playing":
            fadeGame();
            setTimeout(() => {
                fadeHelp();
            }, 1000);
            break;
    }

    prevStage = stage;
    stage = "help";
}

// Helper-functions just for clearer calling of animations. Could very well use "toggleActive" instead
function fadeHeader() {
    let headerButtons = document.querySelectorAll(".header>button");
    headerButtons.forEach(button => {
        toggleActive(button);
    });
}

function fadeIndex() {
    toggleActive(document.querySelector(".index-container"));
}

function fadeSetup() {
    toggleActive(document.querySelector(".setup-container"));
}

function fadeGame() {
    toggleActive(document.querySelector(".game-container"));
}

function fadeHelp(out) {
    document.querySelectorAll(".help-container>p").forEach(el => {
        toggleActive(el);
    });

    if (out) {
        setTimeout(function () {
            toggleActive(document.querySelector(".help-container"));
        }, 1000);
    } else {
        toggleActive(document.querySelector(".help-container"));
    }
}

function changeMaxGrab(increase, element) {
    if (increase) {
        element.previousElementSibling.innerText = parseInt(element.previousElementSibling.innerText) + 1;
    } else {
        if (parseInt(element.nextElementSibling.innerText) <= 1) {
            element.nextElementSibling.classList.add("shake");
            setTimeout(() => {
                element.nextElementSibling.classList.remove("shake");
            }, 1000);
        } else {
            element.nextElementSibling.innerText = parseInt(element.nextElementSibling.innerText) - 1;
        }
    }
}

document.addEventListener("animationstart", (e) => {
    if (e.animationName === 'fade-in' || e.animationName === 'help-in' || e.animationName === 'fall-in') {
        e.target.classList.add('did-fade-in');
    }
});

document.addEventListener('animationend', function (e) {
    if (e.animationName === 'fade-out' || e.animationName === 'help-out' || e.animationName === 'fall-out') {
        e.target.classList.remove('did-fade-in');
    }
});

window.onload = function () {
    fadeIndex();
}