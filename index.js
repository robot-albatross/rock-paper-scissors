//GAME CONSTANTS
const drawQuote = "Draw!";
const winQuote = "You won!";
const loseQuote = "You lost!";

//GAME VARIABLES
let score = {
    user: 0,
    computer: 0,
    games: 0
}; 

//GAME LOGIC FUNCTIONS
function getComputerChoice(){
    const options = ["rock","paper","scissor"];
    return options[Math.floor(Math.random()*3)];
};

function userWon(userChoice,computerChoice){
    if (((userChoice === "rock") && (computerChoice === "scissor")) ||
        ((userChoice === "paper") && (computerChoice === "rock"))   ||
        ((userChoice === "scissor") && (computerChoice === "paper")))
    {
     return true;
    }
};

function playRound(userChoice){
    const computerChoice = getComputerChoice();

    function insertResultMessage(currentGameQuote) {
        gameContent = document.querySelector(".gameContent");

        if (document.querySelector(".gameResult")) {
            gameContent.removeChild(document.querySelector(".gameResult"));
        }

        let message = document.createElement("div");
        message.classList.add("gameResult"); 
        message.textContent = `The computer chose ${computerChoice}! ${currentGameQuote}`;
        gameContent.appendChild(message);

        message = document.querySelector(".gameResult");
        message.style.alignSelf = "flex-end";
    };

    if (userChoice === computerChoice) {
        insertResultMessage(drawQuote);
        return drawQuote;
    } else if (userWon(userChoice, computerChoice)){
        insertResultMessage(winQuote);
        return winQuote;
    } else {
        insertResultMessage(loseQuote);
        return loseQuote;
    }
};

function calculateScore(score,result){
    if (result === winQuote) {
        score.user += 1;    
    } else if (result === loseQuote) {
        score.computer += 1;
    }
};

let cutsceneButton = document.querySelector(".startCutscene");
cutsceneButton.addEventListener ("click", (e) => {
    //stop window.addEventListener activation
    e.stopPropagation();

    function cutscene() {

        function startSoundtrack() {
            audio = document.querySelector(".theme");
            audio.volume = 0.2;
            audio.play();
        }
    
        function startCutscene() {
            document.body.removeChild(cutsceneButton);
            document.body.style.backgroundImage = "url(\"images/dbzwastelands.png\")";
            let cutscene = document.querySelector(".cutscene");
            cutscene.style.display = "flex";
        }
    
        function conversation() {
            let vegetaDialogue = document.querySelector(".vegetaBox > .dialogue");
        
            let gokuBox = document.querySelector(".gokuBox");
            let gokuDialogue = document.querySelector(".gokuBox > .dialogue");
            let gokuIcon = document.querySelector("gokuBox > .character");
        
            let filter = document.createElement("div");
            filter.classList.add("filter");
        
            window.addEventListener("click", function eventHandler(e) {
                e.stopImmediatePropagation();
                gokuBox.appendChild(filter);
                vegetaDialogue.textContent = "It's over Kakarot, give me dragon son";
                this.removeEventListener("click",eventHandler);
            });
    
            window.addEventListener("click", function eventHandler(e) {
                let cutscene = document.querySelector(".cutscene");
                cutscene.style.display = "none";
            });
        }

        startSoundtrack();
        startCutscene();
        conversation();
    }
    

    cutscene();

    //GAME STARTS
    function makeGameArea() {
        game = document.querySelector(".game");
        game.style.display = "flex"
    }

    makeGameArea();

    startButton = document.querySelector(".start-button");
    startButton.addEventListener("click", (e) => {
        
        let options = [];
        const messages = ["rock","scissor","paper"];
        let userChoice = "";

        function insertGameButtons() {
            gameBox = document.querySelector(".gameBox");
            let gameDiv = document.createElement("div");
            gameBox.appendChild(gameDiv);
            gameBox.removeChild(startButton);
            for (let i = 0; i < messages.length; i++) {
                options.push(document.createElement("button"));
                options[i].classList.add(messages[i]);
                options[i].textContent = messages[i];
                gameDiv.appendChild(options[i]);
            }
        }

    function playGame() {
        for (let i = 0; i < options.length; i++) {
            options[i].addEventListener("click", (e) => {                
                userChoice = messages[i];
                let result = playRound(userChoice.toLowerCase(),gameBox);
                calculateScore(score,result);
                
                if (result !== drawQuote) {
                    score.games += 1;
                    }

                if (score.games === 5) {
                    gameContent.innerHTML = "";
                    text =  `The current score is 
                    ${score.user} wins to the user and 
                    ${score.computer} to the computer`;
                    gameContent.textContent = text;
                    }

                });
            }
        }
        insertGameButtons();
        playGame();
    });
});

