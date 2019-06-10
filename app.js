/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScores, activePlayer, gameActive, recentlyRolled, dice;
initialize();

//roll dice
document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gameActive) {
    var diceDom = document.querySelector('.dice');
    dice = Math.floor((Math.random() * 6) + 1);

    diceDom.style.display = 'block'; //makes the dice appear
    diceDom.src = 'dice-' + dice + '.png'; //variation

    if (dice === 1) { //if rolled 1
      //switch turn to the other player
      switchPlayer();
    } else if (recentlyRolled === 6 && dice === 6) { //if rolled 6 twice in a row
      scores[activePlayer] = 0; ;//reset main score
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
      switchPlayer();
    } else { //if the rolled no. is not 1
      //add that rolled number to the current holded score
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
      recentlyRolled = dice; //save the previous roll
    }

  }
});

//hold
document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gameActive) {
    if (roundScore === 0) {
      alert('You need to atleast roll once before holding.');
    } else {
      //add the current holded score to the main score
      scores[activePlayer] += roundScore;
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

      //declaring the winner
      if (scores[activePlayer] >= 20) {
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gameActive = 0;
      } else {
        switchPlayer();
      }
    }
  }
});

//new game
document.querySelector('.btn-new').addEventListener('click', initialize);

function switchPlayer() {
  recentlyRolled = 'none'; //reset the roll streak

  //reset the current holded score
  roundScore = 0;
  document.querySelector('#current-' + activePlayer).textContent = roundScore;

  //ternary operator
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  //modifying element's class attribute
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}

function initialize() {
  gameActive = 1;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  document.querySelector('.dice').style.display = 'none'; //dice photo shouldn't be visible at start
  document.querySelector('#score-0').textContent = scores[activePlayer];
  document.querySelector('#score-1').textContent = scores[activePlayer];
  document.querySelector('#current-0').textContent = roundScore;
  document.querySelector('#current-1').textContent = roundScore;
  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
