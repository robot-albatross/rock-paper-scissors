//CONSTANTS
const drawQuote = "Draw!";
const winQuote = "You won!";
const loseQuote = "You lost!";

//FUNCTIONS
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

    function gameEndMessage(currentGameQuote) {
        if (document.querySelector(".gameResult")) {
            document.body.removeChild(document.querySelector(".gameResult"));
        }

        let quote = document.createElement("div");
        quote.classList.add("gameResult"); 
        quote.textContent = `The computer chose ${computerChoice}! ${currentGameQuote}`;
        document.body.appendChild(quote);
    };

    if (userChoice === computerChoice) {
        gameEndMessage(drawQuote);
        return drawQuote;
    } else if (userWon(userChoice, computerChoice)){
        gameEndMessage(winQuote);
        return winQuote;
    } else {
        gameEndMessage(loseQuote);
        return loseQuote;
    }
};

//function keepPlaying(){
//    answer = prompt("Wanna keep playing, type \"Yes\" or \"No\"?\n (If you don't, the score will be erased)")
//    if (answer.toLowerCase() === "yes"){
//        return true;
//    }
//}

function calculateScore(score,result){
    if (result === winQuote) {
        score.user += 1;    
    } else if (result === loseQuote) {
        score.computer += 1;
    }
};

function showScore(score) {
    console.log(`The current score is 
    ${score.user} wins to the user and 
    ${score.computer} to the computer`);
};

//GLOBAL VARIABLES
let score = {
    user: 0,
    computer: 0
}; 

//MAIN

//let the css load
setInterval(100);

//while (keepPlaying()) {
    //userChoice = prompt("Please type \"rock\", \"paper\" or \"scissor\"");

    //select buttons
    rock = document.querySelector(".rock");
    scissor = document.querySelector(".scissor");
    paper = document.querySelector(".paper");

    options = [rock,scissor,paper];
    messages = ["rock","scissor","paper"];
    userChoice = "";

    function playGame(options,messages) {
        for (let i = 0; i < options.length; i++) {
            options[i].addEventListener("click", (e) => {
                
                userChoice = messages[i];
                let result = playRound(userChoice.toLowerCase());
                calculateScore(score,result);
                showScore(score);
            });
        }
    }

    playGame(options,messages);
//}