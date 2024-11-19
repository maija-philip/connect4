/**
 * See which column of the board, the mouse is in.
 * @param {*} event 
 * @returns {isValid: bool} if this is false, there are no other values given, otherwise there will be a column value given
 */
export const checkDropPosition = (event) => {
    const emptyReturn = {isValid: false}
    const boardObj = document.getElementsByClassName("svg-board-container")[0];

    // console.dir(boardObj)
    // console.log(event)

    let boardHeight = boardObj.offsetHeight,
      boardWidth = boardObj.offsetWidth,
      boardTop = boardObj.offsetTop,
      boardLeft = boardObj.offsetLeft;

    // our board has a border, so we don't need to include that in the width/height
    // because it will effect when we divide up the columns

    // magic number is the percent of the board that is valid board squares
    let newBoardWidth = boardWidth * 0.868,
      newBoardHeight = boardHeight * 0.87;

    let newBoardLeft = boardLeft + (boardWidth - newBoardWidth) / 2,
      newBoardTop = boardTop + (boardHeight - newBoardHeight) / 2;

    let clientX = event.clientX,
      clientY = event.clientY;

    // console.log(`Board left: ${newBoardLeft}, top: ${newBoardTop}, width: ${newBoardWidth}, height: ${newBoardHeight}`)
    // console.log(`Client x: ${clientX}, y: ${clientY}`)

    // is the mouse inside the accepted part of the board?
    let isInsideBoard =
      clientX > newBoardLeft &&
      clientX < newBoardWidth + newBoardLeft &&
      clientY > newBoardTop &&
      clientY < newBoardHeight + newBoardTop;

    console.log("Is in board: ", isInsideBoard);

    if (!isInsideBoard) {
        // mouse isn't inside of the board
      return emptyReturn;
    }

    // what column is the mouse in?
    // 7 Columns
    let columnWidth = newBoardWidth / 7;
    let column = -1;

    for (let i = 1; i <= 7; i++) {
      let columnEnd = newBoardLeft + columnWidth * i;
      if (clientX < columnEnd) {
        // column found
        column = i;
        break;
      }
    }

    if (column === -1) {
        // no column so not valid
      return emptyReturn;
    }

    return {isValid: true, column: column}
  };