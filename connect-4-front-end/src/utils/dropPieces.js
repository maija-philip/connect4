import { BACKGROUND } from "./gameConst";

export function dropPieces() {
  const boardPieces = document.getElementsByClassName("board-piece");

  // drop svg box so pieces have room
  dropSVGBox();

  for (let piece of boardPieces) {
    const circle = piece.firstChild;

    // don't want to animate background pieces
    if (circle.attributes.fill.value === BACKGROUND) {
      continue; // continue with the loop, just not for this piece
    }

    // do animation
    dropBoardPiece(piece, circle);
  }
}

async function dropSVGBox() {
  const svgBox = document.getElementById("svg-box");
  let height = 620;

  let interval = setInterval(() => {
    height += 5;
    svgBox.attributes.viewBox.value = `0 0 700 ${height}`;
    if (height >= 700) {
      clearInterval(interval);
    }
  }, 30);
}

async function dropBoardPiece(piece, circle) {
  let height = Math.floor(circle.attributes.cy.value);

  let interval = setInterval(() => {
    height += Math.floor(Math.random() * 16);
    piece.firstChild.attributes.cy.value = height;
    if (height >= 640) {
      clearInterval(interval);
      rollBoardPiece(piece, circle);
    }
  }, 20);
}

async function rollBoardPiece(piece, circle) {
  let count = 0;
  let posX = Math.floor(circle.attributes.cx.value);
  let rollDirection = Math.random() < 0.5 ? -1 : 1;

  let rollInterval = setInterval(() => {
    count++;

    posX += rollDirection * Math.floor(Math.random() * 16);
    piece.firstChild.attributes.cx.value = posX;

    // 32 is radius, 0 is end of board and so is 700 (don't want half pieces)
    if (count >= 15 || posX < 32 || posX > 668) {
      clearInterval(rollInterval);
    }
  }, 20);
}

export function dropIntoPlace() {
  const boardPieces = document.getElementsByClassName("board-piece");
  if (!boardPieces || boardPieces.length === 0) return false;

  // run animation to drop board pieces
  for (let piece of boardPieces) {
    const circle = piece.firstChild;

    // don't want to animate background pieces
    if (circle.attributes.fill.value === BACKGROUND) {
      continue; // continue with the loop, just not for this piece
    }

    // do animation
    const targetHeight = Math.floor(circle.attributes.cy.value);
    piece.firstChild.attributes.cy.value = 0;

    let height = 0

    let interval = setInterval(() => {
      height += Math.floor(Math.random() * 16);
      piece.firstChild.attributes.cy.value = height;
      if (height >= targetHeight) {
        clearInterval(interval);
        piece.firstChild.attributes.cy.value = targetHeight;
      }
    }, 20);
  }
}
