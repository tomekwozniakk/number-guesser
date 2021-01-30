/*
GAME FUNCTION:
- player must guess a number between a min and a max
- player gets a certain amount of guesses
- notify player of guesses remaining
- notify player of the correct answer if loose
- let player choose to play again
*/

// game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('.game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('.game__form-button'),
      guessInput = document.querySelector('.game__form-input'),
      message = document.querySelector('.game__message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.classList.contains('play-again')){
        window.location.reload();
    }
})

// Listen fo guess
guessBtn.addEventListener('click', function(e) {
    let guess = parseInt(guessInput.value);
    e.preventDefault();
    // validate
    if(isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
        return false;
    }
    // check if won
    if(guess === winningNum){
        // game over - won
        gameOver(true, `${winningNum} is correct, you win.`);
    } else {
        //  wrong number
        guessesLeft -= 1;

        if(guessesLeft === 0) {
            // game over-lost

            gameOver(false, `Game over, You lost. ${winningNum} was the correct number`);
        } else {
            // game continues - answer wrong
            
            // change border color
            guessInput.style.borderColor = 'red';

            // clear input
            guessInput.value = ''

            // tell user its wrong
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`, 'red');
        }
    }
    e.preventDefault();
})

// game over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';

     // disable input
     guessInput.disabled = true;
     // change border color
     guessInput.style.borderColor = color;
     message.style.color = color;
     // Set message
     setMessage(msg);

    //  Play again
    guessBtn.value = 'Play Again';
    guessBtn.classList.add('play-again');
}

// Get winning number
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

// set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}