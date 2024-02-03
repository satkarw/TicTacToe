let allBoxes = document.querySelectorAll(".tic-box");
let i = 1;
let flag = [];

let userMoves = [];
let computerMoves = [];
let gameWon = false;
let umoves = [];
let cmoves = [];

let score = JSON.parse(localStorage.getItem("score"));

let winScore = document.getElementById("winScore");
let looseScore = document.getElementById("loseScore");
let tieScore = document.getElementById("tieScore");

if (!score) {
  score = {
    wins: 0,
    looses: 0,
    ties: 0,
  };
}

if (!score.wins) {
  score.wins = 0;
}
if (!score.looses) {
  score.looses = 0;
}
if (!score.ties) {
  score.ties = 0;
}

function setScore() {
  winScore.innerHTML = `${score.wins}`;

  looseScore.innerHTML = `${score.looses}`;

  tieScore.innerHTML = `${score.ties}`;
}
setScore();

/*
 */

allBoxes.forEach((box) => {
  box.addEventListener("click", clicked.bind(null, i));
  i++;
});

function clicked(num) {
  if (!gameWon) {
    let clickedBox = document.querySelector(`.box${num}`);

    if (clickedBox.classList.contains("js-clicked")) {
      return;
    } else {
      clickedBox.classList.add("js-clicked");

      flag.push(num);

      userMoves.push(num);

      addDivX(num, clickedBox);
    }
  }
}

function addDivX(num, clickedBox) {
  let xDiv = document.createElement("div");

  xDiv.id = `xDiv${num}`;
  xDiv.className = "xDiv";

  clickedBox.appendChild(xDiv);

  check();
  computerMove();
}

// ...

function computerMove() {
  if (gameWon) {
    return;
  }

  let validMoveFound = false;

  if (flag.length < 9) {
    // Prioritize winning move
    const winningMove = findWinningMove(computerMoves);
    if (winningMove !== -1) {
      makeMove(winningMove);
      validMoveFound = true;
    } else {
      // If no winning move, block user from winning
      const blockingMove = findWinningMove(userMoves);
      if (blockingMove !== -1) {
        makeMove(blockingMove);
        validMoveFound = true;
      } else {
        // If no winning or blocking move, make a random move
        while (!validMoveFound) {
          const randomDecimal = Math.random();
          const boxNum = Math.floor(randomDecimal * 9) + 1;

          if (!flag.includes(boxNum)) {
            makeMove(boxNum);
            validMoveFound = true;
          }
        }
      }
    }
  } else {
    tie();
  }
}

function findWinningMove(moves) {
  // Check if there is a winning move for the given moves
  for (let i = 1; i <= 9; i++) {
    if (!flag.includes(i) && isWinningMove([...moves, i])) {
      return i;
    }
  }
  return -1;
}

function isWinningMove(moves) {
  // Check if the given moves result in a win
  const sortedMoves = moves.sort();

  return (
    (sortedMoves.includes(1) && sortedMoves.includes(2) && sortedMoves.includes(3)) ||
    (sortedMoves.includes(4) && sortedMoves.includes(5) && sortedMoves.includes(6)) ||
    (sortedMoves.includes(7) && sortedMoves.includes(8) && sortedMoves.includes(9)) ||
    (sortedMoves.includes(1) && sortedMoves.includes(4) && sortedMoves.includes(7)) ||
    (sortedMoves.includes(2) && sortedMoves.includes(5) && sortedMoves.includes(8)) ||
    (sortedMoves.includes(3) && sortedMoves.includes(6) && sortedMoves.includes(9)) ||
    (sortedMoves.includes(3) && sortedMoves.includes(5) && sortedMoves.includes(7)) ||
    (sortedMoves.includes(1) && sortedMoves.includes(5) && sortedMoves.includes(9))
    // Add other winning combinations as needed
  );
}

// ...


function makeMove(boxNum) {
  if (gameWon) {
    return;
  }

  let moveBox = document.querySelector(`.box${boxNum}`);

  if (moveBox.classList.contains("js-clicked")) {
    return;
  }

  moveBox.classList.add("js-clicked");

  flag.push(boxNum);
  computerMoves.push(boxNum);
  addDivO(boxNum, moveBox);
}

function addDivO(num, moveBox) {
  let oDiv = document.createElement("div");

  oDiv.id = `oDiv${num}`;
  oDiv.className = "oDiv";

  moveBox.appendChild(oDiv);
  checkCom();
}

function check() {
  if (userMoves.length >= 3) {
    for (let i = 0; i < userMoves.length - 2; i++) {
      for (let j = i + 1; j < userMoves.length - 1; j++) {
        for (let k = j + 1; k < userMoves.length; k++) {
          umoves = [userMoves[i], userMoves[j], userMoves[k]].sort();

          if (
            (umoves[0] === 1 && umoves[1] === 2 && umoves[2] === 3) ||
            (umoves[0] === 4 && umoves[1] === 5 && umoves[2] === 6) ||
            (umoves[0] === 7 && umoves[1] === 8 && umoves[2] === 9) ||
            (umoves[0] === 1 && umoves[1] === 4 && umoves[2] === 7) ||
            (umoves[0] === 2 && umoves[1] === 5 && umoves[2] === 8) ||
            (umoves[0] === 3 && umoves[1] === 6 && umoves[2] === 9) ||
            (umoves[0] === 3 && umoves[1] === 5 && umoves[2] === 7) ||
            (umoves[0] === 1 && umoves[1] === 5 && umoves[2] === 9)
          ) {
            setTimeout(() => userWon(), 100);
            gameWon = true;
            return; // Return to prevent further execution after winning
          }
        }
      }
    }
  }
}

function checkCom() {
  if (computerMoves.length >= 3) {
    for (let i = 0; i < computerMoves.length - 2; i++) {
      for (let j = i + 1; j < computerMoves.length - 1; j++) {
        for (let k = j + 1; k < computerMoves.length; k++) {
          cmoves = [
            computerMoves[i],
            computerMoves[j],
            computerMoves[k],
          ].sort();

          if (
            (cmoves[0] === 1 && cmoves[1] === 2 && cmoves[2] === 3) ||
            (cmoves[0] === 4 && cmoves[1] === 5 && cmoves[2] === 6) ||
            (cmoves[0] === 7 && cmoves[1] === 8 && cmoves[2] === 9) ||
            (cmoves[0] === 1 && cmoves[1] === 4 && cmoves[2] === 7) ||
            (cmoves[0] === 2 && cmoves[1] === 5 && cmoves[2] === 8) ||
            (cmoves[0] === 3 && cmoves[1] === 6 && cmoves[2] === 9) ||
            (cmoves[0] === 3 && cmoves[1] === 5 && cmoves[2] === 7) ||
            (cmoves[0] === 1 && cmoves[1] === 5 && cmoves[2] === 9)
          ) {
            setTimeout(() => computerWon(), 100);
            gameWon = true;
            return; // Return to prevent further execution after winning
          }
        }
      }
    }
  }
}

function userWon() {
  updateScore("win");

  for (let i = 0; i < umoves.length; i++) {
    let id = umoves[i];
    let box = document.querySelector(`.box${id}`);
    box.classList.add("winning-moves");
  }
}
function updateScore(result) {
  if (result === "win") {
    score.wins += 1;
    winScore.innerHTML = `${score.wins}`;
  } else if (result === "loose") {
    score.looses += 1;
    looseScore.innerHTML = `${score.looses}`;
  } else {
    score.ties += 1;
    tieScore.innerHTML = `${score.ties}`;
  }

  localStorage.setItem("score", JSON.stringify(score));
}

function reset() {
  document.querySelectorAll(".xDiv, .oDiv").forEach((element) => {
    element.parentNode.removeChild(element);
  });

  flag = [];
  userMoves = [];
  computerMoves = [];
  umoves = [];
  cmoves = [];
  gameWon = false;

  // Remove js-clicked class from all boxes
  document.querySelectorAll(".tic-box").forEach((box) => {
    box.classList.remove("js-clicked");
    box.classList.remove("winning-moves");
  });
}

function computerWon() {
  updateScore("loose");

  for (let i = 0; i < cmoves.length; i++) {
    let id = cmoves[i];
    let box = document.querySelector(`.box${id}`);
    box.classList.add("winning-moves");
  }
}

function tie() {
  updateScore("tie");

  document.querySelectorAll(".tic-box").forEach((box) => {
    box.classList.add("winning-moves");
  });
}
