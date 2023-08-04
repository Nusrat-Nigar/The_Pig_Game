'use strict';

// Selecting all the elements
let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const scores = [0, 0];
let playing = true;
let current1El = document.getElementById('current--1');
let player1, player2;
let activeplayer, currentScore;

let initialize = function () {
  //Starting Conditions
  player1 = prompt('Name of player 1');
  player2 = prompt('Name of player 2');
  document.querySelector('#name--0').textContent = player1;
  document.querySelector('#name--1').textContent = player2;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  document.querySelectorAll('.current-score').textContent = 0;
  diceEl.classList.add('hidden');
  scores[0] = 0;
  scores[1] = 0;
  activeplayer = 0;
  currentScore = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

const switchplayer = function () {
  activeplayer = activeplayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  /* We are using toggle method here. Toggle adds a particular class
       if its not there Or Removes it if it is there*/

  // document
  //   .querySelector(`.player--${activeplayer}`)
  //   .classList.add('player--active');
};

initialize();
// Adding functionality to the New Game button
btnNew.addEventListener('click', initialize);

// Adding functionality to the Roll button
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generating a random number:
    let dicenumber = Math.trunc(Math.random() * 6) + 1;
    console.log(dicenumber);

    // Displaying the dice:
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dicenumber}.png`;

    // Changing the scores after each roll of the dice
    if (dicenumber !== 1) {
      currentScore += dicenumber;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentScore;
    } else {
      currentScore = 0;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentScore;

      // document
      //   .querySelector(`.player--${activeplayer}`)
      //   .classList.remove('player--active');

      //Switching the player
      //-----------------------
      switchplayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activeplayer] += currentScore;
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];
    currentScore = 0;
    document.getElementById(`current--${activeplayer}`).textContent =
      currentScore;

    if (scores[activeplayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchplayer();
    }
  }
});
