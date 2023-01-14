const gameContainer = document.querySelector(".gameContainer");

//GameBoard
const gameBoard = () => {
  let grid = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const getGrid = () => grid;

  const changeTile = (x, y, sort) => {
    grid[x][y] = sort;
  };

  const getTile = (x, y) => grid[x][y];

  return { getGrid, changeTile, getTile };
};

//Player
const Player = (sort) => {
  const getSort = () => sort;
  let myTurn = false;

  const changeTurn = () => {
    if (myTurn == false) {
      myTurn = true;
    } else {
      myTurn = false;
    }
  };

  const getTurn = () => myTurn;

  return { getSort, changeTurn, getTurn };
};

//GameFlow
const gameFlow = () => {
  const player1 = Player("X");
  const player2 = Player("O");
  const board = gameBoard();
  let renderGen = gameRenderer();

  const newGame = () => {
    let grid = board.getGrid();
    renderGen.renderGame(grid);
    player1.changeTurn();
  };

  const placeTile = (coor) => {
    let cord1 = coor[0];
    let cord2 = coor[1];
    let tile = gameContainer.querySelectorAll(`[data-coor="${cord1}${cord2}"]`);
    tile = tile[0];
    if (tile.textContent != "") {
      alert("The tile is ocupied");
    } else if (player1.getTurn() == true) {
      board.changeTile(cord1, cord2, "X");
      renderGen.changeTile(tile, "X");
      checkWin();

      player1.changeTurn();
      player2.changeTurn();
    } else if (player2.getTurn() == true) {
      board.changeTile(cord1, cord2, "O");
      renderGen.changeTile(tile, "O");
      checkWin();

      player1.changeTurn();
      player2.changeTurn();
    }
  };

  const checkWin = () => {
    let grid = board.getGrid();
    let combolist = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    combolist.forEach((combos) => {
      let count = 0;
      let symbol = board.getTile(combos[0][0], combos[0][1]);
      if (symbol == "") {
        return;
      }

      combos.forEach((combo) => {
        let sym = board.getTile(combo[0], combo[1]);
        if (sym == "") {
          return;
        }
        if (sym == symbol) {
          count += 1;
        }
      });
      if (count === 3) {
        winnerEvent();
      }
    });
  };

  const winnerEvent = () => {
    if (player1.getTurn()) {
      alert("Player1 won the game!");
    } else if (player2.getTurn()) {
      alert("Player2 won the game!");
    }
  };

  return { newGame, placeTile };
};

const gameRenderer = () => {
  const changeTile = (tile, sort) => {
    tile.textContent = `${sort}`;
  };
  const renderTile = (tile, x, y) => {
    let newTile = document.createElement("div");
    newTile.classList.add("gameTile");
    newTile.textContent = `${tile}`;
    newTile.setAttribute("data-coor", `${x}${y}`);
    gameContainer.appendChild(newTile);
  };

  const renderGame = (grid) => {
    for (i = 0; i < 3; i++) {
      for (y = 0; y < 3; y++) {
        renderTile(grid[i][y], i, y);
      }
    }
  };

  return { renderGame, changeTile };
};

let game1 = gameFlow();
game1.newGame();

let domTiles = document.querySelectorAll(".gameTile");

domTiles.forEach((tile) => {
  tile.addEventListener("click", function () {
    game1.placeTile(tile.getAttribute("data-coor"));
  });
});
