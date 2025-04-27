let randomNumber = parseInt(Math.random()*100 + 1);
console.log(randomNumber);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const startOver = document.querySelector('.resultParas');
const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;

let playGame = true;

if(playGame){
    submit.addEventListener('click', (e)=> {
        e.preventDefault();
        const guess = parseInt(userInput.value)
        console.log(guess);
        validateGuess(guess);
    });
}

function validateGuess(guess){
    if(isNaN(guess)){
        alert(`Invalid Number`);
    }else if(guess < 1 || guess> 100){
        alert(`Guess between 1 to 100`);
    }else{
        prevGuess.push(guess)
        if(numGuess > 10){
            displayGuess(guess);
            displayMsg(`Game Over. Random number was ${randomNumber}`)
            endGame();
        }else{
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess){
    if(guess === randomNumber){
        displayMsg(`You guessed it right. The number was ${randomNumber}`);
        endGame();
    }else if(guess < randomNumber){
        displayMsg(`Guessed Number is TOOO low`);
    }else if(guess > randomNumber){
        displayMsg(`Guessed Number is TOOO high`);
    }
}

function displayGuess(guess){
    userInput.value = '';
    guessSlot.innerHTML += `${guess}, `;
    numGuess++;
    remaining.innerHTML = `${12- numGuess}`;
}

function displayMsg(e){
    lowOrHi.innerHTML = `<h4>${e} </h4>`;
}

function endGame(){
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h3 id= "newGame">Start new Game</h3>`;
    p.style.backgroundColor = 'black';
    p.style.cursor = 'pointer';
    p.style.width = '200px';
    p.style.margin = '0 auto';
    p.style.padding = '2px';
    p.style.borderRadius = '5px'
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

function newGame(){
    const newGameBtn = document.querySelector('#newGame');
    newGameBtn.addEventListener('click', function(e) {
        randomNumber = parseInt(Math.random() * 100 + 1);
        console.log(randomNumber);
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${11 - numGuess} `;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
        displayMsg(" ")
    });
}