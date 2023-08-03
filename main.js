// pages
const startPage = document.getElementById("start-page");
const pausePage = document.getElementById("pause-page");
const playingPreventer = document.getElementById("playing-preventer");

// buttons
const continueBtn = document.getElementById("continue-btn");
const playCPU = document.getElementById("play-cpu");
const playPlayer = document.getElementById("play-player");

//paragraphes
const pScoreRed = document.getElementById("score-red");
const pScoreYellow = document.getElementById("score-yellow");
const currentPlayer = document.getElementById("current-player");
const time = document.getElementById("time");

// game
let boardMatrix = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
];
let player = 1;
let scoreRed = 0,
  scoreYellow = 0;
let playedBalls = 0;
let draw = false;
let cpu = window.localStorage.getItem("cpu");

//score container
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const player1Avatar = document.getElementById("player1-avatar");
const player2Avatar = document.getElementById("player2-avatar");

if (cpu === "true") {
  player1.innerHTML = "you";
  player2.innerHTML = "cpu";
  player1Avatar.style.backgroundImage = "url(./images/you.svg)";
  player2Avatar.style.backgroundImage = "url(./images/cpu.svg)";
} else {
  player1.innerHTML = "player 1";
  player2.innerHTML = "player 2";
  player1Avatar.style.backgroundImage = "url(./images/player-one.svg)";
  player2Avatar.style.backgroundImage = "url(./images/player-two.svg)";
}

//turn
const winner = document.getElementById("winner");
const winsRect = document.getElementById("wins-rect");
const drawWins = document.getElementById("wins-draw");
const turnBg = document.getElementById("turn-bg");
const turn = document.getElementById("turn");
turn.classList.add(player === 1 ? "turn-red" : "turn-yellow");
const marker = document.getElementById("marker");

const whiteCol0 = document.getElementById("white-col0");
const whiteCol1 = document.getElementById("white-col1");
const whiteCol2 = document.getElementById("white-col2");
const whiteCol3 = document.getElementById("white-col3");
const whiteCol4 = document.getElementById("white-col4");
const whiteCol5 = document.getElementById("white-col5");
const whiteCol6 = document.getElementById("white-col6");

const blackCol0 = document.getElementById("black-col0");
const blackCol1 = document.getElementById("black-col1");
const blackCol2 = document.getElementById("black-col2");
const blackCol3 = document.getElementById("black-col3");
const blackCol4 = document.getElementById("black-col4");
const blackCol5 = document.getElementById("black-col5");
const blackCol6 = document.getElementById("black-col6");

const rows = ["row0", "row1", "row2", "row3", "row4", "row5"];
const delays = [612, 559, 500, 433, 353, 250];
const turnBgs = ["#5C2DD5", "#FD6687", "#FFCE67"];

const redSmallBallSrc = "./images/counter-red-small.svg";
const yellowSmallBallSrc = "./images/counter-yellow-small.svg";
const redLargeBallSrc = "./images/counter-red-large.svg";
const yellowLargeBallSrc = "./images/counter-yellow-large.svg";

//timer
let timer;
let timerID;
function startTimer(seconds) {
  timer = seconds ?? 30;
  timerID = setInterval(() => {
    time.innerHTML = timer;
    timer--;
    if (timer === -1) {
      togglePlayer();
      showWinner();
      playingPreventer.style.zIndex = "2";
      if (player === 1) {
        scoreRed++;
        pScoreRed.innerHTML = scoreRed;
      } else {
        scoreYellow++;
        pScoreYellow.innerHTML = scoreYellow;
      }
      togglePlayer();
      timer = 30;
    }
  }, 1000);
}

startTimer();

if (cpu === "true") {
  currentPlayer.innerHTML = `${player === 1 ? "your" : "cpu's"}`;
} else {
  currentPlayer.innerHTML = `player ${player}'s`;
}

function togglePlayer() {
  player = player === 1 ? 2 : 1;
  if (cpu === "true") {
    currentPlayer.innerHTML = `${player === 1 ? "your" : "cpu's"}`;
  } else {
    currentPlayer.innerHTML = `player ${player}'s`;
  }
  turn.classList.toggle("turn-red");
  turn.classList.toggle("turn-yellow");
  marker.classList.toggle("marker-red");
  marker.classList.toggle("marker-yellow");
  timer = 30;
  time.innerHTML = 30;
}
//check winner
function checkWinner(i, j) {
  let range = [],
    k = i,
    p = j;
  //check row
  while (k < 7 && boardMatrix[k][p] === player) {
    range.push(boardMatrix[k][p]);
    k++;
  }
  k = i - 1;
  while (k > -1 && boardMatrix[k][p] === player) {
    range.unshift(boardMatrix[k][p]);
    k--;
  }
  if (range.length > 3) {
    setTimeout(() => {
      k++;
      for (let n = 0; n < range.length; n++) {
        setTimeout(() => {
          document.getElementById(`black-col${k + n}`).children[
            p
          ].children[1].style.display = "inline";
        }, (n + 1) * 75);
      }
    }, delays[j]);
    return true;
  } else range = [];
  //check column
  k = i;
  while (p < 6 && boardMatrix[k][p] === player) {
    range.push(boardMatrix[k][p]);
    p++;
  }
  p = j - 1;
  while (p > -1 && boardMatrix[k][p] === player) {
    range.unshift(boardMatrix[k][p]);
    p--;
  }
  if (range.length > 3) {
    setTimeout(() => {
      p++;
      for (let n = 0; n < range.length; n++) {
        setTimeout(() => {
          document.getElementById(`black-col${k}`).children[
            p + n
          ].children[1].style.display = "inline";
        }, (n + 1) * 75);
      }
    }, delays[j]);
    return true;
  } else range = [];
  // check y=x line
  p = j;
  while (k < 7 && p < 6 && boardMatrix[k][p] === player) {
    range.push(boardMatrix[k][p]);
    k++;
    p++;
  }
  k = i - 1;
  p = j - 1;
  while (k > -1 && p > -1 && boardMatrix[k][p] === player) {
    range.unshift(boardMatrix[k][p]);
    k--;
    p--;
  }
  if (range.length > 3) {
    setTimeout(() => {
      p++;
      k++;
      for (let n = 0; n < range.length; n++) {
        setTimeout(() => {
          document.getElementById(`black-col${k + n}`).children[
            p + n
          ].children[1].style.display = "inline";
        }, (n + 1) * 75);
      }
    }, delays[j]);
    return true;
  } else range = [];
  //check y=-x line
  k = i;
  p = j;
  while (k > -1 && p < 6 && boardMatrix[k][p] === player) {
    range.push(boardMatrix[k][p]);
    k--;
    p++;
  }
  k = i + 1;
  p = j - 1;
  while (k < 7 && p > -1 && boardMatrix[k][p] === player) {
    range.unshift(boardMatrix[k][p]);
    k++;
    p--;
  }
  if (range.length > 3) {
    setTimeout(() => {
      p++;
      k--;
      for (let n = 0; n < range.length; n++) {
        setTimeout(() => {
          document.getElementById(`black-col${k - n}`).children[
            p + n
          ].children[1].style.display = "inline";
        }, (n + 1) * 75);
      }
    }, delays[j]);
  }
  return range.length > 3;
}

function removeBalls() {
  for (let i = 0; i < 7; i++) {
    Array.from(document.getElementById(`black-col${i}`).children).forEach(
      (element) =>
        setInterval(() => {
          element.remove();
        }, 75 * i)
    );
    for (let j = 0; j < 6; j++) boardMatrix[i][j] = 0;
  }
}

function showWinner() {
  if (draw) {
    winner.innerHTML = "no winner";
    drawWins.innerHTML = "draw";
    turn.style.display = "none";
    winsRect.style.display = "flex";
  } else {
    if (cpu === "true") {
      winner.innerHTML = `${player === 1 ? "you" : "cpu"}`;
      drawWins.innerHTML = `${player === 1 ? "win" : "wins"}`;
    } else {
      winner.innerHTML = `player ${player}`;
      drawWins.innerHTML = "wins";
    }
    turn.style.display = "none";
    winsRect.style.display = "flex";
    turnBg.style.backgroundColor = turnBgs[player];
  }
  clearInterval(timerID);
}

function hideWinner() {
  winner.innerHTML = `player`;
  turn.style.display = "flex";
  winsRect.style.display = "none";
  turnBg.style.backgroundColor = turnBgs[0];
  time.innerHTML = 30;
  startTimer();
}

function playAgain() {
  hideWinner();
  removeBalls();
  draw = false;
  playedBalls = 0;
  playingPreventer.style.zIndex = "-1";
  if (cpu === "true" && player !== 1) letCpuPlay();
}

function restart() {
  scoreRed = 0;
  scoreYellow = 0;
  pScoreRed.innerHTML = scoreRed;
  pScoreYellow.innerHTML = scoreYellow;
  clearInterval(timerID);
  if (player === 2) {
    togglePlayer();
  }
  playAgain();
}

function letCpuPlay() {
  if (playedBalls < 42) {
    let randomCol;
    let bestColValue = bestCol();
    let bedColsArray = bedCols();
    if (bestColValue !== -1) randomCol = bestColValue;
    else {
      if (emptyCols() === bedColsArray.length) {
        randomCol = bedColsArray[0];
      } else {
        while (true) {
          let random = Math.floor(Math.random() * 7);
          if (
            boardMatrix[random].includes(0) &&
            !bedColsArray.includes(random)
          ) {
            randomCol = random;
            break;
          }
        }
      }
    }
    playedBalls++;
    let i = boardMatrix[randomCol].indexOf(0);
    const ball = document.createElement("div");
    ball.classList.add("ball");
    ball.classList.add(rows[i]);
    const img1 = document.createElement("img");
    const img2 = document.createElement("img");
    if (window.innerWidth < 650) {
      img1.src = player === 1 ? redSmallBallSrc : yellowSmallBallSrc;
      img2.src = "./images/winner-circle-small.svg";
    } else {
      img1.src = player === 1 ? redLargeBallSrc : yellowLargeBallSrc;
      img2.src = "./images/winner-circle-large.svg";
    }
    ball.appendChild(img1);
    ball.appendChild(img2);
    document.getElementById(`black-col${randomCol}`).appendChild(ball);
    boardMatrix[randomCol][i] = player;
    if (checkWinner(randomCol, i)) {
      showWinner();
      playingPreventer.style.zIndex = "2";
      if (player === 1) {
        scoreRed++;
        pScoreRed.innerHTML = scoreRed;
      } else {
        scoreYellow++;
        pScoreYellow.innerHTML = scoreYellow;
      }
    } else if (playedBalls === 42) {
      draw = true;
      showWinner();
    }
    togglePlayer();
  }
}

function emptyCols() {
  let n = 0;
  for (let i = 0; i < 7; i++) if (boardMatrix[i].includes(0)) n++;
  return n;
}

function bestCol() {
  for (let i = 0; i < 7; i++) {
    let j = boardMatrix[i].indexOf(0);
    if (j !== -1) {
      //check column
      let n = 1;
      while (j - n > -1)
        if (boardMatrix[i][j - n] === 2) n++;
        else break;
      if (n === 4) return i;
      //check row
      else n = 1;
      let p = 1;
      while (i + n < 7)
        if (boardMatrix[i + n][j] === 2) n++;
        else break;
      if (n === 4) return i;
      while (i - p > -1)
        if (boardMatrix[i - p][j] === 2) {
          n++;
          p++;
        } else break;
      if (n > 3) return i;
      //check y=x
      n = 1;
      p = 1;
      while (i + n < 7 && j + n < 6)
        if (boardMatrix[i + n][j + n] === 2) n++;
        else break;
      if (n === 4) return i;
      while (i - p > -1 && j - p > -1)
        if (boardMatrix[i - p][j - p] === 2) {
          n++;
          p++;
        } else break;
      if (n > 3) return i;
      //check y=-x
      n = 1;
      p = 1;
      while (i - n > -1 && j + n < 6)
        if (boardMatrix[i - n][j + n] === 2) n++;
        else break;
      if (n === 4) return i;
      while (i + p < 7 && j - p > -1)
        if (boardMatrix[i + p][j - p] === 2) {
          n++;
          p++;
        } else break;
      if (n > 3) return i;
      // prevent opponent from winning
      //ckeck column
      n = 1;
      while (j - n > -1)
        if (boardMatrix[i][j - n] === 1) n++;
        else break;
      if (n === 4) return i;
      //check row
      n = 1;
      p = 1;
      while (i + n < 7)
        if (boardMatrix[i + n][j] === 1) n++;
        else break;
      if (n === 4) return i;
      while (i - p > -1)
        if (boardMatrix[i - p][j] === 1) {
          n++;
          p++;
        } else break;
      if (n > 3) return i;
      //check y=x
      n = 1;
      p = 1;
      while (i + n < 7 && j + n < 6)
        if (boardMatrix[i + n][j + n] === 1) n++;
        else break;
      if (n === 4) return i;
      while (i - p > -1 && j - p > -1)
        if (boardMatrix[i - p][j - p] === 1) {
          n++;
          p++;
        } else break;
      if (n > 3) return i;
      //check y=-x
      n = 1;
      p = 1;
      while (i - n > -1 && j + n < 6)
        if (boardMatrix[i - n][j + n] === 1) n++;
        else break;
      if (n === 4) return i;
      while (i + p < 7 && j - p > -1)
        if (boardMatrix[i + p][j - p] === 1) {
          n++;
          p++;
        } else break;
      if (n > 3) return i;
    }
  }
  return -1;
}

function bedCols() {
  let cols = [];
  for (let i = 0; i < 7; i++) {
    let j = boardMatrix[i].indexOf(0);
    if (j !== -1) {
      // check row
      let n = 1;
      let p = 1;
      while (i + n < 7)
        if (boardMatrix[i + n][j + 1] === 1) n++;
        else break;
      if (n === 4) cols.push(i);
      else {
        while (i - p > -1)
          if (boardMatrix[i - p][j + 1] === 1) {
            n++;
            p++;
          } else break;
        if (n > 3) cols.push(i);
      }
      //check y=x
      n = 1;
      p = 1;
      while (i + n < 7 && j + 1 + n < 6)
        if (boardMatrix[i + n][j + 1 + n] === 1) n++;
        else break;
      if (n === 4 && !cols.includes(i)) cols.push(i);
      else {
        while (i - p > -1 && j + 1 - p > -1)
          if (boardMatrix[i - p][j + 1 - p] === 1) {
            n++;
            p++;
          } else break;
        if (n > 3 && !cols.includes(i)) cols.push(i);
      }
      //check y=-x
      n = 1;
      p = 1;
      while (i - n > -1 && j + 1 + n < 6)
        if (boardMatrix[i - n][j + 1 + n] === 1) n++;
        else break;
      if (n === 4 && !cols.includes(i)) cols.push(i);
      else {
        while (i + p < 7 && j + 1 - p > -1)
          if (boardMatrix[i + p][j + 1 - p] === 1) {
            n++;
            p++;
          } else break;
        if (n > 3 && !cols.includes(i)) cols.push(i);
      }
    }
  }
  return cols;
}

whiteCol0.addEventListener("click", () => {
  for (let i = 0; i < 7; i++) {
    if (boardMatrix[0][i] === 0) {
      playedBalls++;
      const ball = document.createElement("div");
      ball.classList.add("ball");
      ball.classList.add(rows[i]);
      const img1 = document.createElement("img");
      const img2 = document.createElement("img");
      if (window.innerWidth < 650) {
        img1.src = player === 1 ? redSmallBallSrc : yellowSmallBallSrc;
        img2.src = "./images/winner-circle-small.svg";
      } else {
        img1.src = player === 1 ? redLargeBallSrc : yellowLargeBallSrc;
        img2.src = "./images/winner-circle-large.svg";
      }
      ball.appendChild(img1);
      ball.appendChild(img2);
      blackCol0.appendChild(ball);
      boardMatrix[0][i] = player;
      let checkWinnerValue = checkWinner(0, i);
      if (checkWinnerValue) {
        showWinner();
        playingPreventer.style.zIndex = "2";
        if (player === 1) {
          scoreRed++;
          pScoreRed.innerHTML = scoreRed;
        } else {
          scoreYellow++;
          pScoreYellow.innerHTML = scoreYellow;
        }
      } else if (playedBalls === 42) {
        draw = true;
        showWinner();
      }
      togglePlayer();
      if (!checkWinnerValue && cpu === "true" && player !== 1) letCpuPlay();
      break;
    }
  }
});

whiteCol1.addEventListener("click", () => {
  for (let i = 0; i < 7; i++) {
    if (boardMatrix[1][i] === 0) {
      playedBalls++;
      const ball = document.createElement("div");
      ball.classList.add("ball");
      ball.classList.add(rows[i]);
      const img1 = document.createElement("img");
      const img2 = document.createElement("img");
      if (window.innerWidth < 650) {
        img1.src = player === 1 ? redSmallBallSrc : yellowSmallBallSrc;
        img2.src = "./images/winner-circle-small.svg";
      } else {
        img1.src = player === 1 ? redLargeBallSrc : yellowLargeBallSrc;
        img2.src = "./images/winner-circle-large.svg";
      }
      ball.appendChild(img1);
      ball.appendChild(img2);
      blackCol1.appendChild(ball);
      boardMatrix[1][i] = player;
      let checkWinnerValue = checkWinner(1, i);
      if (checkWinnerValue) {
        showWinner();
        playingPreventer.style.zIndex = "2";
        if (player === 1) {
          scoreRed++;
          pScoreRed.innerHTML = scoreRed;
        } else {
          scoreYellow++;
          pScoreYellow.innerHTML = scoreYellow;
        }
      } else if (playedBalls === 42) {
        draw = true;
        showWinner();
      }
      togglePlayer();
      if (!checkWinnerValue && cpu === "true" && player !== 1) letCpuPlay();
      break;
    }
  }
});

whiteCol2.addEventListener("click", () => {
  for (let i = 0; i < 7; i++) {
    if (boardMatrix[2][i] === 0) {
      playedBalls++;
      const ball = document.createElement("div");
      ball.classList.add("ball");
      ball.classList.add(rows[i]);
      const img1 = document.createElement("img");
      const img2 = document.createElement("img");
      if (window.innerWidth < 650) {
        img1.src = player === 1 ? redSmallBallSrc : yellowSmallBallSrc;
        img2.src = "./images/winner-circle-small.svg";
      } else {
        img1.src = player === 1 ? redLargeBallSrc : yellowLargeBallSrc;
        img2.src = "./images/winner-circle-large.svg";
      }
      ball.appendChild(img1);
      ball.appendChild(img2);
      blackCol2.appendChild(ball);
      boardMatrix[2][i] = player;
      let checkWinnerValue = checkWinner(2, i);
      if (checkWinnerValue) {
        showWinner();
        playingPreventer.style.zIndex = "2";
        if (player === 1) {
          scoreRed++;
          pScoreRed.innerHTML = scoreRed;
        } else {
          scoreYellow++;
          pScoreYellow.innerHTML = scoreYellow;
        }
      } else if (playedBalls === 42) {
        draw = true;
        showWinner();
      }
      togglePlayer();
      if (!checkWinnerValue && cpu === "true" && player !== 1) letCpuPlay();
      break;
    }
  }
});

whiteCol3.addEventListener("click", () => {
  for (let i = 0; i < 7; i++) {
    if (boardMatrix[3][i] === 0) {
      playedBalls++;
      const ball = document.createElement("div");
      ball.classList.add("ball");
      ball.classList.add(rows[i]);
      const img1 = document.createElement("img");
      const img2 = document.createElement("img");
      if (window.innerWidth < 650) {
        img1.src = player === 1 ? redSmallBallSrc : yellowSmallBallSrc;
        img2.src = "./images/winner-circle-small.svg";
      } else {
        img1.src = player === 1 ? redLargeBallSrc : yellowLargeBallSrc;
        img2.src = "./images/winner-circle-large.svg";
      }
      ball.appendChild(img1);
      ball.appendChild(img2);
      blackCol3.appendChild(ball);
      boardMatrix[3][i] = player;
      let checkWinnerValue = checkWinner(3, i);
      if (checkWinnerValue) {
        showWinner();
        playingPreventer.style.zIndex = "2";
        if (player === 1) {
          scoreRed++;
          pScoreRed.innerHTML = scoreRed;
        } else {
          scoreYellow++;
          pScoreYellow.innerHTML = scoreYellow;
        }
      } else if (playedBalls === 42) {
        draw = true;
        showWinner();
      }
      togglePlayer();
      if (!checkWinnerValue && cpu === "true" && player !== 1) letCpuPlay();
      break;
    }
  }
});

whiteCol4.addEventListener("click", () => {
  for (let i = 0; i < 7; i++) {
    if (boardMatrix[4][i] === 0) {
      playedBalls++;
      const ball = document.createElement("div");
      ball.classList.add("ball");
      ball.classList.add(rows[i]);
      const img1 = document.createElement("img");
      const img2 = document.createElement("img");
      if (window.innerWidth < 650) {
        img1.src = player === 1 ? redSmallBallSrc : yellowSmallBallSrc;
        img2.src = "./images/winner-circle-small.svg";
      } else {
        img1.src = player === 1 ? redLargeBallSrc : yellowLargeBallSrc;
        img2.src = "./images/winner-circle-large.svg";
      }
      ball.appendChild(img1);
      ball.appendChild(img2);
      blackCol4.appendChild(ball);
      boardMatrix[4][i] = player;
      let checkWinnerValue = checkWinner(4, i);
      if (checkWinnerValue) {
        showWinner();
        playingPreventer.style.zIndex = "2";
        if (player === 1) {
          scoreRed++;
          pScoreRed.innerHTML = scoreRed;
        } else {
          scoreYellow++;
          pScoreYellow.innerHTML = scoreYellow;
        }
      } else if (playedBalls === 42) {
        draw = true;
        showWinner();
      }
      togglePlayer();
      if (!checkWinnerValue && cpu === "true" && player !== 1) letCpuPlay();
      break;
    }
  }
});

whiteCol5.addEventListener("click", () => {
  for (let i = 0; i < 7; i++) {
    if (boardMatrix[5][i] === 0) {
      playedBalls++;
      const ball = document.createElement("div");
      ball.classList.add("ball");
      ball.classList.add(rows[i]);
      const img1 = document.createElement("img");
      const img2 = document.createElement("img");
      if (window.innerWidth < 650) {
        img1.src = player === 1 ? redSmallBallSrc : yellowSmallBallSrc;
        img2.src = "./images/winner-circle-small.svg";
      } else {
        img1.src = player === 1 ? redLargeBallSrc : yellowLargeBallSrc;
        img2.src = "./images/winner-circle-large.svg";
      }
      ball.appendChild(img1);
      ball.appendChild(img2);
      blackCol5.appendChild(ball);
      boardMatrix[5][i] = player;
      let checkWinnerValue = checkWinner(5, i);
      if (checkWinnerValue) {
        showWinner();
        playingPreventer.style.zIndex = "2";
        if (player === 1) {
          scoreRed++;
          pScoreRed.innerHTML = scoreRed;
        } else {
          scoreYellow++;
          pScoreYellow.innerHTML = scoreYellow;
        }
      } else if (playedBalls === 42) {
        draw = true;
        showWinner();
      }
      togglePlayer();
      if (!checkWinnerValue && cpu === "true" && player !== 1) letCpuPlay();
      break;
    }
  }
});

whiteCol6.addEventListener("click", () => {
  for (let i = 0; i < 7; i++) {
    if (boardMatrix[6][i] === 0) {
      playedBalls++;
      const ball = document.createElement("div");
      ball.classList.add("ball");
      ball.classList.add(rows[i]);
      const img1 = document.createElement("img");
      const img2 = document.createElement("img");
      if (window.innerWidth < 650) {
        img1.src = player === 1 ? redSmallBallSrc : yellowSmallBallSrc;
        img2.src = "./images/winner-circle-small.svg";
      } else {
        img1.src = player === 1 ? redLargeBallSrc : yellowLargeBallSrc;
        img2.src = "./images/winner-circle-large.svg";
      }
      ball.appendChild(img1);
      ball.appendChild(img2);
      blackCol6.appendChild(ball);
      boardMatrix[6][i] = player;
      let checkWinnerValue = checkWinner(6, i);
      if (checkWinnerValue) {
        showWinner();
        playingPreventer.style.zIndex = "2";
        if (player === 1) {
          scoreRed++;
          pScoreRed.innerHTML = scoreRed;
        } else {
          scoreYellow++;
          pScoreYellow.innerHTML = scoreYellow;
        }
      } else if (playedBalls === 42) {
        draw = true;
        showWinner();
      }
      togglePlayer();
      if (!checkWinnerValue && cpu === "true" && player !== 1) letCpuPlay();
      break;
    }
  }
});

whiteCol0.addEventListener("mouseover", () => {
  marker.style.left = "35px";
});

whiteCol1.addEventListener("mouseover", () => {
  marker.style.left = "125px";
});

whiteCol2.addEventListener("mouseover", () => {
  marker.style.left = "210px";
});

whiteCol3.addEventListener("mouseover", () => {
  marker.style.left = "300px";
});

whiteCol4.addEventListener("mouseover", () => {
  marker.style.left = "385px";
});

whiteCol5.addEventListener("mouseover", () => {
  marker.style.left = "475px";
});

whiteCol6.addEventListener("mouseover", () => {
  marker.style.left = "560px";
});
