"use strict";

// selecting elements
const score0El = document.getElementById("score--0");
const score1EL = document.getElementById("score--1");
const diceEL = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

// declaring varibales outside of the initialize() due to the scope!
let scores, currentScore, activePlayer, playing;

const initialize = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1EL.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  diceEL.classList.add("hidden");
};
initialize();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// rolling the dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generating a random dice number
    const diceValue = Math.trunc(Math.random() * 6) + 1;

    // 2. Displaying dice
    diceEL.classList.remove("hidden");
    diceEL.src = `dice-${diceValue}.png`;

    // 3. Check if rolled 1
    if (diceValue !== 1) {
      // add diceValue to currentScore
      currentScore += diceValue;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score >= 100
    if (scores[activePlayer] >= 100) {
      // 2.1 If true - finish the game
      playing = false;
      diceEL.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // 2.2 If false - switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", initialize);
