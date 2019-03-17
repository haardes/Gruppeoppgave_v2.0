class Nim {
    constructor(total, maxGrab) {
        this.total = total || 12;
        this.minGrab = 2;
        this.maxGrab = maxGrab || 4;
        this.player1;
        this.player2;
        this.turn;
        this.balls = [];
        this.createBalls();
    }

    victory() {

    }

    createBalls() {
        let container = document.querySelector(".nim-container");
        for (let i = 0; i < this.total; i++) {
            let span = document.createElement("span");
            span.classList.add("nim-ball");
            container.appendChild(span);
            this.balls.push(span);
        }
        container.onclick = () => {
            if (this.turn == this.player1 || this.turn == undefined) {
                this.takeBalls(this.player1);
                this.turn = this.player2;
            } else {
                this.takeBalls(this.player2);
                this.turn = this.player1;
            }
        }
    }

    takeBalls(player) {
        let amount = player.grabAmount;
        for (let i = 0; i < amount; i++) {
            this.balls.pop().classList.remove("active");
        }
    }

    show() {
        let prev = 0;
        this.balls.forEach((ball, index) => {
            setTimeout(() => {
                ball.classList.add("active");
            }, prev);
            prev = index * 50;
        })
    }
}

class Player {
    constructor(name, human) {
        this.name = name;
        this.human = human;
        this.grabAmount = 2;
        this.grabbed = 0;
    }

    changeAmount(increase, element) {
        if (increase) {
            if (this.grabAmount >= game.maxGrab) {
                element.previousElementSibling.classList.add("shake");
                setTimeout(() => {
                    element.previousElementSibling.classList.remove("shake");
                }, 1000);
            } else {
                this.grabAmount++;
                element.previousElementSibling.innerText = this.grabAmount;
            }
        } else {
            if (this.grabAmount == game.minGrab) {
                element.nextElementSibling.classList.add("shake");
                setTimeout(() => {
                    element.nextElementSibling.classList.remove("shake");
                }, 1000);
            } else {
                this.grabAmount--;
                element.nextElementSibling.innerText = this.grabAmount;
            }
        }
    }

    setName(element) {
        this.name = element.parentNode.children[1].value;
        element.parentNode.children[0].innerText = this.name;
        if (element.parentNode.classList.contains("player1")) {
            document.querySelector(".player-container.player1>h2").innerText = this.name;
        } else {
            document.querySelector(".player-container.player2>h2").innerText = this.name;
        }
    }

    toggleHuman(element) {
        this.human = !this.human;
        if (this.human == true) {
            element.innerHTML = "Controlled by player";
            element.value = true;
        } else {
            element.innerHTML = "Controlled by AI";
            element.value = false;
        }
    }
}