let stage = "index";

function startGame() {
    fadeHeaderIn();
    fadeIndexOut();
}

function back() {
    fadeHeaderOut();
    fadeSetupOut(false);
}

function fadeIndexIn() {
    let indexContainer = document.querySelector(".index-container");
    indexContainer.style.WebkitAnimation = "fadeIn 1s forwards";
    indexContainer.classList.remove("hidden");
}

function fadeIndexOut() {
    let indexContainer = document.querySelector(".index-container");
    indexContainer.style.WebkitAnimation = "fadeOut 1s forwards";
    indexContainer.addEventListener("webkitAnimationEnd", () => {
        if (stage === "index") {
            document.querySelector(".start-button").classList.add("hidden");
            document.querySelector(".index-container .how-to-button").classList.add("hidden");
            indexContainer.classList.add("hidden");
            stage = "setup";
            fadeSetupIn();
        }
    })
}

function fadeSetupIn() {
    let setupContainer = document.querySelector(".setup-container");
    setupContainer.classList.remove("hidden");
    setupContainer.style.WebkitAnimation = "fadeIn 1s forwards";
}

function fadeSetupOut(next) {
    let setupContainer = document.querySelector(".setup-container");
    setupContainer.style.WebkitAnimation = "fadeOut 1s forwards";
    setupContainer.addEventListener("webkitAnimationEnd", () => {
        setupContainer.classList.add("hidden");
        if (!next) {
            fadeIndexIn();
        }
    })
}

function fadeHeaderIn() {
    let headerButtons = document.querySelectorAll(".header>button");
    headerButtons.forEach(button => {
        button.classList.remove("hidden");
        button.style.WebkitAnimation = "fadeIn 1s forwards";
    });
}

function fadeHeaderOut() {
    let headerButtons = document.querySelectorAll(".header>button");
    headerButtons.forEach(button => {
        button.style.WebkitAnimation = "fadeOut 1s forwards";
        button.addEventListener("webkitAnimationEnd", () => {
            button.style.WebkitAnimation = "";
            button.classList.add("hidden");
        })
    });
}