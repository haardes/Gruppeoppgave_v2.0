class Nim {
    constructor(total, maxGrab) {
        this.total = total || 12;
        this.maxGrab = maxGrab || 4;
        this.addPlayers();
    }

    addPlayers() {
        let player1Name = document.querySelector(".player1>.player-title").innerHTML;
        let player1Control = document.querySelector(".player1>.control-button").innerHTML;
        let player1Human = player1Control == "Controlled by player" ? true : false;
        let player2Name = document.querySelector(".player2>.player-title").innerHTML;
        let player2Control = document.querySelector(".player2>.control-button").innerHTML;
        let player2Human = player2Control == "Controlled by player" ? true : false;

        this.player1 = new Player(player1Name, player1Human, document.querySelector(".game-container>.player1").children[2]);
        this.player2 = new Player(player2Name, player2Human, document.querySelector(".game-container>.player2").children[2]);
    }

    victory() {

    }
}

class Player {
    constructor(name, human, el) {
        this.name = name;
        this.human = human;
        this.grabAmount = 2;
        this.grabbed = 0;
        this.grabP = el;
    }

    changeAmount(increase) {
        if (increase) {
            if (this.grabAmount >= game.maxGrab) {
                this.grabP.classList.add("shake");
                setTimeout(() => {
                    this.grabP.classList.remove("shake");
                }, 1000);
            } else {
                this.grabAmount++;
            }
        } else {
            if (this.grabAmount == 2) {
                this.grabP.classList.add("shake");
                setTimeout(() => {
                    this.grabP.classList.remove("shake");
                }, 1000);
            } else {
                this.grabAmount--;
            }
        }

        this.grabP.innerHTML = this.grabAmount;
    }
}