let winCount = 0;
let lossCount = 0;
const resultsDiv = document.querySelector('.results');

window.addEventListener('click', function(e){
  let name = e.target.getAttribute('name');

  if (name === 'reset') {
    resetGame();
  } else if (name === 'Rock' || name === 'Paper' || name === 'Scissors') {
    let result = playRound(name, computerPlay());
    logResult(result);
  } else {
    return;
  }
});

function computerPlay() {
  const moves = ['Rock', 'Paper', 'Scissors'];
  return moves[Math.floor(Math.random() * moves.length)];
}

function playRound(playerSelection, computerSelection) {
  let playerSelectionLC = playerSelection.toLowerCase();
  let computerSelectionLC = computerSelection.toLowerCase();

  let playerWon = (playerSelectionLC === 'rock' && computerSelectionLC === 'scissors')
      || (playerSelectionLC === 'paper' && computerSelectionLC === 'rock')
      || (playerSelectionLC === 'scissors' && computerSelectionLC === 'paper');

  if (playerSelectionLC === computerSelectionLC) {
    return `Tie! You and the computer chose ${computerSelection}`;
  }   else if (playerWon) {
    return `You Win! ${playerSelection} beats ${computerSelection}`;
  } else {
    return `You Lose! ${playerSelection} does not beat ${computerSelection}`;
  }
}

function logResult(result) {
  updateCounts(result);
  displayRoundResult(result);
  displayWinLossTieCount();

  const isGameOver = winCount === 5 || lossCount === 5;

  if (isGameOver) {
    if (winCount > lossCount) {
      displayGameOverState('\nYou won the game!');
    } else {
      displayGameOverState('\nSorry, you lost the game.');
    }
  }
}

function updateCounts(result) {
  if (result.includes('Win')) {
    winCount += 1;
  } else if (result.includes('Lose')) {
    lossCount += 1;
  } 
}

function displayRoundResult(result) {
  const idValue = 'round-result';
  let roundResult = document.getElementById(idValue);
  if (roundResult) {
    roundResult.textContent = result;
  } else {
    roundResult = document.createElement('p');
    roundResult.textContent = result;
    roundResult.id = idValue;
    resultsDiv.appendChild(roundResult);
  }
}

function displayWinLossTieCount() {
  const idValue = 'win-loss-tie-count';
  let countElement = document.getElementById(idValue);
  const countText = `Number of wins: You-${winCount} | Computer-${lossCount}`;
  if (countElement) {
    countElement.textContent = countText;
  } else {
    countElement = document.createElement('p');
    countElement.textContent = countText;
    countElement.id = idValue;
    resultsDiv.appendChild(countElement);
  }
}

function displayGameOverState(message) {
  //remove previous results
  while (resultsDiv.firstChild) {
    resultsDiv.removeChild(resultsDiv.firstChild);
  }

  const gameOverMessage = document.createElement('p');
  gameOverMessage.textContent = message;
  gameOverMessage.id = 'game-over-message';
  resultsDiv.appendChild(gameOverMessage);

  //hide instruction and buttons
  const instruction = document.querySelector('.instruction');
  instruction.classList.add('hidden')

  const buttonsDiv = document.querySelector('.game-buttons');
  buttonsDiv.classList.add('hidden');

  //display reset button
  const reset = document.querySelector('.reset');
  reset.classList.remove('hidden');
}

function resetGame() {
  winCount = 0;
  lossCount = 0;

  //hide reset button 
  const reset = document.querySelector('.reset');
  reset.classList.add('hidden');

  //display instruction and buttons
  const instruction = document.querySelector('.instruction');
  instruction.classList.remove('hidden')

  const buttonsDiv = document.querySelector('.game-buttons');
  buttonsDiv.classList.remove('hidden');

  //remove game over message
  const gameOverMessage = document.getElementById('game-over-message');
  resultsDiv.removeChild(gameOverMessage);
}