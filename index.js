function getComputerChoice(){
    const options = ["rock","paper","scissor"];
    return options[Math.floor(Math.random()*3)];
};

function showScore(){};

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
        console.log("Draw!")
    } else if (userWon(userChoice, computerChoice)){
        console.log("You won!")
    } else {
        console.log("You lost!")
    }   
};

function keepPlaying(){
    answer = prompt("Wanna keep playing, type \"Yes\" or \"No\"?\n (If you don't, the score will be erased)")
    if (answer.toLowerCase() === "yes"){
        return true;
    }
}

while (keepPlaying()) {
    userChoice = prompt("Please type \"rock\", \"paper\" or \"scissor\"");
    playRound(userChoice.toLowerCase());
    //showScore();
}