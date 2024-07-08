document.addEventListener('DOMContentLoaded',()=>{

    let randomNumber=parseInt(Math.random()*100+1);
    const submitButton=document.querySelector('#subt');
    const userInput=document.querySelector('#guessField');
    const guessSlot=document.querySelector('.guesses');
    const remaining=document.querySelector('.lastResult');
    const lowOrHi=document.querySelector('.lowOrHi');
    const startOver=document.querySelector('.resultParas');

    const p=document.createElement('p');

    let prevGuess=[];
    let numGuess=1;
    let playGame=true;

    if(playGame){
        submitButton.addEventListener('click',(e)=>{

            e.preventDefault();
            
            const guess=parseInt(userInput.value);

            validateGuess(guess);

        });
    }

    //validate_guess_function : whether user enters number in correct format
    function validateGuess(guess){

        if(isNaN(guess)){
            alert("Please enter a valid number!");
        }

        else if(guess < 1 || guess > 100){
            alert("Please enter a number that is between 1 and 100");
        }

        else{

            prevGuess.push(guess);

            if(numGuess > 10){
                displayGuess(guess);
                displayMessage(`Game Over! The number was ${randomNumber}`);
                endGame();
            }

            else{
                displayGuess(guess);
                checkGuess(guess);
            }
        }

    }

    //check_guess_function : whether user has enter the correct number
    function checkGuess(guess){

        if(guess < randomNumber){
            displayMessage(`Your guess was weak!`);
        }
        else if(guess > randomNumber){
            displayMessage(`Your guess went ahead!`);
        }
        else{
            displayMessage(`You guessed it right!`);
        }

    }

    //displayGuess : updates the guess-array and displays it in the document
    function displayGuess(guess){

        userInput.value='';
        guessSlot.innerHTML += `${guess}, `;
        numGuess++;
        remaining.innerHTML=`${11-numGuess}`;

    }

    //displayMessage : to display message whenver called
    function displayMessage(message){

        lowOrHi.innerHTML=`<h3>${message}</h3>`;

    }

    //end_game : to end the current game
    function endGame(){

        playGame=false;

        userInput='';
        userInput.setAttribute('disabled','');

        p.classList.add('button');
        p.innerText=`<h3 id="newGame">Start New Game</h3>`;
        startOver.appendChild(p);

        newGame();

    }

    //new_game : to start a new game
    function newGame(){

        const newGameButton=document.querySelector("#newGame");

        newGameButton.addEventListener('click',()=>{

            randomNumber=parseInt(Math.random()*100+1);
            prevGuess=[];
            numGuess=1;
            guessSlot.innerHTML='';
            remaining.innerHTML=`${11-numGuess}`;
            userInput.removeAttribute('disabled');
            startOver.removeChild(p);
            playGame=true;

        });
        

    }

});