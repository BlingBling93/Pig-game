/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, dice, currentPlayer, gamePlaying;
function initialization() {
    currentPlayer = 0;
    roundScore = 0;
    score = [0, 0];
    gamePlaying = true;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
};

initialization();

// roll the dice
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Random number
        var dice = Math.floor(Math.random() * 6 + 1);
        // 2. Display result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        // 3. Update the round score if the rolled number was NOT a 1
        if(dice !== 1) {
            // add number to round score
            roundScore += dice;
            document.querySelector('#current-' + currentPlayer).textContent = roundScore;
        } else {
            // next player
            nextPlayer();
        }
    }
});

// hold the score
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        //add current score to global score
        score[currentPlayer] += roundScore;

        // update UI
        
        document.querySelector('#score-' + currentPlayer).textContent = score[currentPlayer];

        // check winner
        if(score[currentPlayer] >= 100) {
            document.querySelector('#name-' + currentPlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
        //next player
            nextPlayer();
        }  
    }  
});

function nextPlayer() {
    currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
};

document.querySelector('.btn-new').addEventListener('click', initialization);