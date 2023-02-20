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
        //makes the text blink
        setTimeout(function () {gameContent.appendChild(message)},10);
        

        //message = document.querySelector(".gameResult");
        //message.style.alignSelf = "flex-end";
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
            let vegetaBox = document.querySelector(".vegetaBox");
            let vegetaDialogue = document.querySelector(".vegetaBox > .dialogue");
        
            let gokuBox = document.querySelector(".gokuBox");
            let gokuDialogue = document.querySelector(".gokuBox > .dialogue");
            let gokuIcon = document.querySelector("gokuBox > .character");
        
            let filter = document.createElement("div");
            filter.classList.add("filter");
            
            function sayLine(talker,listener,message) {
                window.addEventListener("click", function eventHandler(e) {
                    e.stopImmediatePropagation();
                    //if (document.querySelector(".filter")) {listener.removeChild(filter);}
                    listener.appendChild(filter);
                    talker.textContent = message;
                    this.removeEventListener("click",eventHandler);
                });    
            }

            sayLine(vegetaDialogue,gokuBox,"RADAH RADAH PRINCE OF ALL SAIYANS RADAH RADAH!");
            sayLine(vegetaDialogue,gokuBox,"It's over Kakarot, give me dragon son");
            sayLine(gokuDialogue,vegetaBox,"Stop Vegeta! I will never let you destroy my plant!");
            sayLine(vegetaDialogue,gokuBox,"You have no choice, im elite saiyan!");
            sayLine(gokuDialogue,vegetaBox,"Hey, it's me Goku!");
            sayLine(vegetaDialogue,gokuBox,"Your tricks are not gonna work on me!");
            sayLine(vegetaDialogue,gokuBox,"Besides, i have something you don't, my buddy Nappa!");
            sayLine(gokuDialogue,vegetaBox,"Oh no, all my dragon friends have been murdered (in minecraft)");
            sayLine(gokuDialogue,vegetaBox,`But hey, i have an idea, you there, yeah you, hey it's me Goku, and i need you to do me a solid,` +
            `I need you to distract Nappa, by playing rock paper and scissors with him so i can defeat Vegeta.
             Can you do that? Great! Good luck out there!`);


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

                    function finalMessage() {
                        gameContent.innerHTML = "";
                        text =  `The current score is 
                        ${score.user} wins to the user and 
                        ${score.computer} to the computer`;
                        gameContent.textContent = text;
                        }
                        //so the final message can clean the screen on the right time after 5 rounds, not before nor after
                        setTimeout(function() {finalMessage()},100);
                    }
                });
            }
        }
        insertGameButtons();
        playGame();
    });
});

