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
    console.log(`The computer chose ${computerChoice}!`,)
    if (userChoice === computerChoice) {
        console.log(drawQuote)
        return drawQuote;
    } else if (userWon(userChoice, computerChoice)){
        console.log(winQuote)
        return winQuote;
    } else {
        console.log("You lost!")
        return loseQuote;
    }
};

function keepPlaying(){
    answer = prompt("Wanna keep playing, type \"Yes\" or \"No\"?\n (If you don't, the score will be erased)")
    if (answer.toLowerCase() === "yes"){
        return true;
    }
}

function calculateScore(score,result){
    if (result === winQuote) {
        score.user += 1;    
    } else if (result === loseQuote) {
        score.computer +=1;
    }
};

function showScore(score) {
    console.log(`The current score is \n
                     ${score.user} wins to the user and\n
                     ${score.computer} to the human`)
};

//GLOBAL VARIABLES
let score = {
    user: 0,
    computer: 0
}; 

//let the css load
setInterval(100); 
while (keepPlaying()) {
    userChoice = prompt("Please type \"rock\", \"paper\" or \"scissor\"");
    result = playRound(userChoice.toLowerCase());
    calculateScore(score,result);
    showScore(score);
}