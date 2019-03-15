let stage = "index";
let prevStage = "";

function toggleActive(e) {
    e.classList.contains("active") ? e.classList.remove("active") : e.classList.add("active");
}

function startGame() {
    if (stage === "index") {
        fadeIndexOut();
        fadeHeaderIn();
        setTimeout(() => {
            fadeSetupIn();
        }, 1000);
        stage = "setup";
    } else if (stage === "setup") {

    }
}

function back() {
    if (stage === "setup") {
        fadeSetupOut();
        fadeHeaderOut();
        setTimeout(() => {
            fadeIndexIn();
        }, 1000);
        stage = "index";
    } else if (stage === "help") {
        if (prevStage === "index") {
            fadeHeaderOut();
            fadeHelpOut();
            setTimeout(() => {
                fadeIndexIn();
            }, 1000);
            stage = "index";
        } else if (prevStage === "setup") {
            fadeHelpOut();
            setTimeout(() => {
                fadeSetupIn();
            }, 1000);
            stage = "setup";
        }
    } else if (stage === "playing") {
        stage = "setup";
    }
}

function help() {
    if (stage === "index") {
        fadeIndexOut();
        fadeHeaderIn();
        setTimeout(() => {
            fadeHelpIn();
        }, 1000);
        stage = "help";
        prevStage = "index";
    } else if (stage === "setup") {
        fadeSetupOut();
        setTimeout(() => {
            fadeHelpIn();
        }, 1000);
        stage = "help";
        prevStage = "setup";
    } else if (stage === "playing") {
        stage = "help";
        prevStage = "playing";
    }
}

function fadeHeaderIn() {
    let headerButtons = document.querySelectorAll(".header>button");
    headerButtons.forEach(button => {
        toggleActive(button);
    });
}

function fadeHeaderOut() {
    let headerButtons = document.querySelectorAll(".header>button");
    headerButtons.forEach(button => {
        toggleActive(button);
    });
}

function fadeIndexIn() {
    let index = document.querySelector(".index-container");
    toggleActive(document.querySelector(".index-container"));
}

function fadeIndexOut() {
    let index = document.querySelector(".index-container");
    toggleActive(document.querySelector(".index-container"));
}

function fadeSetupIn() {
    let setup = document.querySelector(".setup-container");
    toggleActive(document.querySelector(".setup-container"));
}

function fadeSetupOut() {
    let setup = document.querySelector(".setup-container");
    toggleActive(document.querySelector(".setup-container"));
}

function fadeHelpIn() {
    toggleActive(document.querySelector(".help-container"));
    let helpEls = document.querySelectorAll(".help-container>p");
    helpEls.forEach(el => {
        toggleActive(el);
    })
}

function fadeHelpOut() {
    let helpEls = document.querySelectorAll(".help-container>p");
    helpEls.forEach(el => {
        toggleActive(el);
    })
    setTimeout(function () {
        toggleActive(document.querySelector(".help-container"));
    }, 1000);
}

window.onload = function () {
    fadeIndexIn();
}

document.addEventListener("animationstart", (e) => {
    if (e.animationName === 'fade-in' || e.animationName === 'help-in') {
        e.target.classList.add('did-fade-in');
    }
});

document.addEventListener('animationend', function (e) {
    if (e.animationName === 'fade-out' || e.animationName === 'help-out') {
        e.target.classList.remove('did-fade-in');
    }
});