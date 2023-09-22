
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties : 0
};

/* if (!score){
  score = {
    wins: 0,
    losses: 0, 
    ties : 0
  };
}
*/

updateScoreElement();

let isAutoPlaying = false;
let intervalId;
const playbutton = document.querySelector('.auto-play-button')

// const autoplay =() =>{

// }

function autoplay(){
  if (/*isAutoPlaying === false*/ !isAutoPlaying) {

    intervalId = setInterval(() => {
      const myMove = PickcomputerMove(); 
      playGame(myMove);
    }, 1000)

    isAutoPlaying = true;
  
    playbutton.innerHTML = 'Stop Play'
  } 
  else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    
    playbutton.innerHTML = 'Auto Play'
  } 
}

  //play using mouse click event

  document.querySelector('.js-rock-button').addEventListener('click', ()=> {
    playGame('Rock');
  })

  document.querySelector('.js-paper-button').addEventListener('click', ()=> {
    playGame('Paper');
  })

  document.querySelector('.js-scissor-button').addEventListener('click', ()=> {
    playGame('Scissor');
  })

  document.querySelector('.js-reset-button').addEventListener('click', ()=> {
    score.wins = 0;
    score.losses=0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
  })

  document.querySelector('.js-play-button').addEventListener('click', ()=> {
    autoplay();
  })

  //play using keyboard keydown event

  document.body.addEventListener('keydown', (event) =>{

    // console.log(`key pressed ${event}`);
    if(event.key === 'r'){
      playGame('Rock');
    }else if(event.key === 'p'){
      playGame("Paper") ;
    }else if(event.key === 's'){
      playGame("Scissor")
    }
     
  })

function playGame(myMove)
{

  const computerMove = PickcomputerMove();

  let result = ''
  
  if(myMove === 'Scissor'){

    /* any variabe created between {} only exist between {} */
    if(computerMove === 'Paper'){ 
      result = 'You Win';
    }else if(computerMove === 'Rock'){
      result = 'You Lose';
    }else if(computerMove === 'Scissor'){
      result = 'Tie';
    }

  }else if(myMove === 'Paper'){

    if(computerMove === `Paper`){
      result = 'Tie';
    }else if(computerMove === 'Rock'){
      result = 'You Win';
    }else if(computerMove === 'Scissor'){
      result = 'You Lose';
    }

  }else if(myMove === 'Rock'){

    if(computerMove === 'Paper'){
      result = 'You Lose';
    }else if(computerMove === 'Rock'){
      result = 'Tie';
    }else if(computerMove === 'Scissor'){
      result = 'You Win';
    }

  }

  if(result === 'You Win'){
    score.wins += 1;
  }else if (result === 'You Lose'){
    score.losses += 1;
  }else if (result === 'Tie'){
    score.ties += 1;
  }

  localStorage.setItem('score',JSON.stringify(score));



  updateScoreElement();

  function updateResultElement(){
    document.querySelector('.js-result').innerHTML = result;
  }

  updateResultElement();

  document.querySelector('.js-move').innerHTML =  `You 
    <img src="images/${myMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">
    Computer`;

}

function updateScoreElement(){ document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Loses: ${score.losses}, Ties: ${score.ties}`}

function PickcomputerMove(){
  
  let computerMove ='';
  const randomNumber = Math.random()

  if(randomNumber >= 0 && randomNumber < 1/3){
    computerMove = 'Rock';
  }else if (randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove = 'Paper';
  }else if (randomNumber >= 2/3 && randomNumber < 1){
    computerMove = 'Scissor' ;
  }

  return computerMove;
}