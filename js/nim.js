class Nim {
    constructor(player1, player2, victory, total, maxGrab) {
        this.player1 = player1;
        this.player2 = player2;
        this.victory = victory;
        this.total = total || 12;
        this.minGrab = 1;
        if (maxGrab < 2) {
            thrownewError("‘maxGrab’ må være større enn 1");
        } else {
            this.maxGrab = maxGrab || 4;
        }
        this.turn = this.player1;
        this.won = false;
        this.balls = [];
        this.createBalls();
    }

    victory(loser) {
        let winner = (loser == this.player1) ? this.player2 : this.player1;
        document.querySelector(".nim-container").innerText = `${loser.name} has lost the game.\nCongratulations to ${winner.name}!`;
        document.querySelector(".pyro").classList.remove("hidden");
        document.querySelector("body").style.backgroundColor = "#444";
    }

    createBalls() {
        if (document.querySelector(".nim-ball") != undefined) {
            return;
        }
        let container = document.querySelector(".nim-container");
        for (let i = 0; i < this.total; i++) {
            let span = document.createElement("span");
            span.classList.add("nim-ball");
            container.appendChild(span);
            this.balls.push(span);
        }

        container.onclick = () => {
            if (!this.won) {
                const element = (this.turn == this.player1) ? document.querySelector(".player1>p") : document.querySelector(".player2>p");
                this.turn.takeBalls(element);
                this.turn = (this.turn == this.player1) ? this.player2 : this.player1;
            }

            //Need to check again if game is won or not, if it is not then carry on with computer move if player is computer
            if (!this.won) {
                if (!this.turn.human) {
                    const element = (this.turn == this.player1) ? document.querySelector(".player1>p") : document.querySelector(".player2>p");
                    setTimeout(() => {
                        this.turn.computerMove(element);
                        this.turn = (this.turn == this.player1) ? this.player2 : this.player1;
                    }, 500);
                }
            }
        }
    }

    removeBalls(amount) {
        for (let i = 0; i < amount; i++) {
            this.balls.pop().classList.remove("active");
        }

        if (this.balls.length <= 0) {
            this.victory(this.turn);
            this.won = true;
        }
    }

    show() {
        let prev = 0;
        this.balls.forEach((ball, index) => {
            setTimeout(() => {
                ball.classList.add("active");
            }, prev);
            prev = index * 50;
        });
    }
}

class Player {
    constructor(human) {
        this.name = "Computer";
        this.human = human;
        this.grabAmount = 2;
        this.grabbed = 0;
    }

    computerMove(element) {
        let grab;

        //If you must take last ball, do it
        if (game.balls.length == game.minGrab) {
            grab = game.minGrab;

            //If there exists a move to force the opponent to take the last ball, take that amount of balls
        } else if (game.balls.length - game.maxGrab <= game.minGrab) {
            grab = game.balls.length - game.minGrab;

            //Take random amount of balls
        } else {
            grab = Math.floor(Math.random() * game.maxGrab + 1);
        }
        element.innerText = grab;
        this.grabAmount = grab;
        this.takeBalls(element);
    }

    takeBalls(element) {
        if (this.grabAmount > game.balls.length) {
            element.classList.add("shake");
            setTimeout(() => {
                element.classList.remove("shake");
            }, 1000);
        } else {
            game.removeBalls(this.grabAmount);
            this.grabbed += this.grabAmount;

            for (let i = 0; i < this.grabAmount; i++) {
                let span = document.createElement("span");
                span.classList.add("nim-ball", "active");
                element.nextElementSibling.nextElementSibling.appendChild(span);
            }
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