class Nim {
    constructor(total, maxGrab) {
        this.total = total || 12;
        this.minGrab = 2;
        this.maxGrab = maxGrab || 4;
        this.player1;
        this.player2;
        this.turn;
        this.won = false;
        this.balls = [];
        this.createBalls();
    }

    victory(loser) {
        this.won = true;
        let winner = (loser == this.player1) ? this.player2 : this.player1;
        document.querySelector(".nim-container").innerText = `${loser.name} has lost the game.\nCongratulations to ${winner.name}!`;
        document.querySelector(".pyro").classList.remove("hidden");
        document.querySelector("body").style.backgroundColor = "#444";
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
            if (!this.won) {
                if (this.turn == this.player1 || this.turn == undefined) {
                    if (this.player1.takeBalls(document.querySelector(".player1>p"))) {
                        this.turn = this.player2;
                    }
                } else {
                    if (this.player2.takeBalls(document.querySelector(".player2>p"))) {
                        this.turn = this.player1;
                    }
                }
            }

            if (!this.won) {
                if (!this.turn.human) {
                    if (this.turn == this.player1) {
                        setTimeout(() => {
                            this.turn.computerMove(document.querySelector(".player1>p"));
                            this.turn = this.player2;
                        }, 1000);
                    } else {
                        setTimeout(() => {
                            this.turn.computerMove(document.querySelector(".player2>p"));
                            this.turn = this.player1;
                        }, 1000);
                    }
                }
            }
        }
    }

    removeBalls(amount) {
        for (let i = 0; i < amount; i++) {
            this.balls.pop().classList.remove("active");
        }

        if (this.balls.length == 0) {
            this.victory(this.turn);
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

    computerMove(element) {
        let grabAmount = Math.floor(Math.random() * (game.maxGrab - (game.minGrab - 1))) + game.minGrab;
        let target = game.minGrab;
        if ((game.balls.length - target) <= game.maxGrab) {
            grabAmount = game.balls.length - target;
        } else if (grabAmount > game.balls.length) {
            grabAmount = game.balls.length;
        }
        element.innerText = grabAmount;
        this.grabAmount = grabAmount;
        this.takeBalls(element);
    }

    takeBalls(element) {
        if (this.grabAmount > game.balls.length) {
            element.classList.add("shake");
            setTimeout(() => {
                element.classList.remove("shake");
            }, 1000);
            return false;
        } else {
            game.removeBalls(this.grabAmount);
            this.grabbed += this.grabAmount;

            for (let i = 0; i < this.grabAmount; i++) {
                let span = document.createElement("span");
                span.classList.add("nim-ball", "active");
                element.nextElementSibling.nextElementSibling.appendChild(span);
            }

            return true;
        }
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
            if (this.grabAmount <= game.minGrab) {
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