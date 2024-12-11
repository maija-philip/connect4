/*
    Maija Philip
    Connect 4
*/

const Error = require("./public/errors.js");
const error = new Error();

const Database = require("./../DataAccess/queries.js");
const db = new Database();

const {
  PLAYER_PINK,
  PLAYER_YELLOW,
  NO_PLAYER,
  PLAYER_PINK_WINNING_SPOT,
  PLAYER_YELLOW_WINNING_SPOT,
  COLUMN_NUM,
  ROW_NUM,
} = require("./public/gameConsts.js");

async function move(username, gameId, column) {
  // check if it's within the board
  // 7 across
  // 6 down
  if (column < 0 || column >= 7) {
    return { valid: false };
  }

  // get the gameboard from the db
  const game = await db.getGame(gameId);
  if (game.length < 1) {
    return { error: error.gameDNE };
  }
  const board = game[0].gameboard.board;
  const whoseTurn = game[0].turn;

  // check user is whose turn it is
  if ((whoseTurn === PLAYER_PINK && game[0].playerPink !== username) || (whoseTurn === PLAYER_YELLOW && game[0].playerYellow !== username)) {
    return { error: error.notYourGame }
  }

  // check if there is already a winner
  if (game[0].winner !== NO_PLAYER) {
    return { error: error.noTurnAfterWinner }
  }

  // drop the piece down the column
  let dropTo = ROW_NUM;
  for (let y = 0; y < ROW_NUM; y++) {
    if (board[y][column] != NO_PLAYER) {
      break;
    }
    dropTo = y;
  }

  // is column full?
  if (dropTo === ROW_NUM) {
    return { error: error.columnFull };
  }

  // update game in db
  board[dropTo][column] = whoseTurn;
  let newTurn = whoseTurn === PLAYER_PINK ? PLAYER_YELLOW : PLAYER_PINK;
  await db.takeTurn(gameId, newTurn, JSON.stringify({ board: board }));

  let hasWinner = await checkIfWinner(
    gameId,
    board,
    { x: column, y: dropTo },
    whoseTurn
  );

  return { valid: true, x: column, y: dropTo, hasWinner: hasWinner };
}

async function checkIfWinner(gameId, board, lastMove, playerKey) {
  // four pieces in a line is a win, all these directions:
  /*

  - - - x    - - - -    - - x -    x - - - 
  - - x -    x x x x    - - x -    - x - - 
  - x - -    - - - -    - - x -    - - x - 
  x - - -    - - - -    - - x -    - - - x 

  */

  /*
  
  Numbers for each direction
  1 2 3 
  4 x 5
  6 7 8

  */

  // Must search each direction (doesn't count the new move)
  //                           x   y
  let count1 = checkDirection(-1, -1, board, playerKey, lastMove) || [];
  let count2 = checkDirection(0, -1, board, playerKey, lastMove) || [];
  let count3 = checkDirection(1, -1, board, playerKey, lastMove) || [];
  let count4 = checkDirection(-1, 0, board, playerKey, lastMove) || [];
  let count5 = checkDirection(1, 0, board, playerKey, lastMove) || [];
  let count6 = checkDirection(-1, 1, board, playerKey, lastMove) || [];
  let count7 = checkDirection(0, 1, board, playerKey, lastMove) || [];
  let count8 = checkDirection(1, 1, board, playerKey, lastMove) || [];

  // add them up

  let winningPieces = undefined;

  // up and down
  if (count2.length + count7.length + 1 >= 4) {
    winningPieces = count2.concat(count7)
    winningPieces.push(lastMove)

    // side to side
  } else if (count4.length + count5.length + 1 >= 4) {
    winningPieces = count4.concat(count5)
    winningPieces.push(lastMove);

    // positive diagonal
  } else if (count3.length + count6.length + 1 >= 4) {
    winningPieces = count3.concat(count6)
    winningPieces.push(lastMove);

    // negative diagonal
  } else if (count1.length + count8.length + 1 >= 4) {
    winningPieces = count1.concat(count8);
    winningPieces.push(lastMove)
  }

  // if no winning pieces return false
  if (!winningPieces) {
    return false;
  }

  // mark winning pieces and set them to db
  let winningPieceCode =
    playerKey == PLAYER_PINK
      ? PLAYER_PINK_WINNING_SPOT
      : PLAYER_YELLOW_WINNING_SPOT;


  winningPieces.forEach((move) => {
    board[move.y][move.x] = winningPieceCode;
  });

  await db.setWinner(gameId, winningPieceCode, JSON.stringify({ board: board }));

  return true;
}

/**
 * Recursive function to count how many valid spaces with the same color piece go in the direction specified
 * @param {-1, 0, 1} top
 * @param {-1, 0, 1} left
 * @param {[[int]]} board
 * @param {1,2} playerKey
 * @param {x: int, y: int} move
 * @returns
 */
function checkDirection(left, top, board, playerKey, move) {
  let newX = move.x + 1 * left;
  let newY = move.y + 1 * top;

//   console.log(`Check Direction, last move: x: ${move.x}, y: ${move.y} new move: x: ${newX}, y: ${newY}`)

  if (
    newX < 0 ||
    newX >= COLUMN_NUM ||
    newY < 0 ||
    newY >= ROW_NUM ||
    board[newY][newX] !== playerKey
  ) {
    // console.log("\tReturn Undefined")
    return undefined;
  } else {
    let result = [{ x: newX, y: newY }];
    let next = checkDirection(left, top, board, playerKey, {
      x: newX,
      y: newY,
    });
    if (next) {
      result = result.concat(next);
    }
    // console.log("\tAdd to result and return")
    return result;
  }
}

module.exports = { move };
