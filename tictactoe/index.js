// TODO:
// Prevent over-writing of marks
// ADD AI to play against

const createPlayer = function(name, mark) {
  const playerName = name;
  const playerMark = mark;

  return {playerName, playerMark};
};

const board = (() => {
  const grid = [];
  let gameOver = false;

  const getGameOver = () => gameOver;
  const setGameOver = value => gameOver = value;

  const resetBoard = () => {
    for (let i = 0; i < 9; i++) {
      grid[i] = null;
    }
    setGameOver(false);
  }

  const setBoardItem = (index, mark) => {
    grid[index] = mark;
  }

  const getBoard = () => grid;
  const getBoardItem = index => grid[index];

  const checkWinCondition = () => {
    if (grid[0] !== null && grid[0] === grid[1] && grid[1] === grid[2] // 1st row horizontal
      || grid[3] !== null && grid[3] === grid[4] && grid[4] === grid[5] // 2nd row horizontal
      || grid[6] !== null && grid[6] === grid[7] && grid[7] === grid[8] // 3rd row horizontal
      || grid[0] !== null && grid[0] === grid[3] && grid[3] === grid[6] // 1st column vertical
      || grid[1] !== null && grid[1] === grid[4] && grid[4] === grid[7] // 2nd column vertical
      || grid[2] !== null && grid[2] === grid[5] && grid[5] === grid[8] // 3rd column vertical
      || grid[0] !== null && grid[0] === grid[4] && grid[4] === grid[8] // left to right diagonal
      || grid[2] !== null && grid[2] === grid[4] && grid[4] === grid[6] // right to left diagonal
      ) {
      setGameOver(true);
      return true;
    }
    return false;
  }

  resetBoard();

  return {
    checkWinCondition,
    setBoardItem,
    getBoard,
    getBoardItem,
    getGameOver,
    setGameOver,
    resetBoard,
  }
})();

const game = (() => {
  const resetButton = document.getElementById("reset");
  const cells = document.getElementsByClassName("cell")
  const gameMessage = document.getElementById("game-message");

  const playerOne = createPlayer("PlayerOne", "X");
  const playerTwo = createPlayer("PlayerTwo", "O");

  let currentPlayer = playerOne;

  document.getElementById("player1").innerHTML = `${playerOne.playerName}: ${playerOne.playerMark}`;
  document.getElementById("player2").innerHTML = `${playerTwo.playerName}: ${playerTwo.playerMark}`;
  document.getElementById("current-player").innerHTML = currentPlayer.playerName;

  const gameBoard = board.getBoard();

  const finishGame = () => {
    gameMessage.innerHTML = `Game has been won by ${currentPlayer.playerName}! Click 'Reset' to play again.`
  }

  const advanceGame = (index) => {
    board.setBoardItem(index, currentPlayer.playerMark);
    if (board.checkWinCondition()) {
      finishGame();
      return;
    }
    currentPlayer = toggleCurrentPlayer();
  }

  for (let i = 0; i < cells.length; i++) {
    const index = i;
    cells[i].addEventListener("click", function(e){
      if (!board.getGameOver()) {
        this.innerHTML = currentPlayer.playerMark;
        advanceGame(index);
      }
    });
  }

  resetButton.addEventListener("click", function() {
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerHTML = "";
    }
    gameMessage.innerHTML = '';
    board.resetBoard()

  });

  const toggleCurrentPlayer = function() {
    const newCurrentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;

    document.getElementById("current-player").innerHTML = newCurrentPlayer.playerName;

    return newCurrentPlayer;
  }
})();
