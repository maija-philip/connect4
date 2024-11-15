import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";
import svgBoard from "./../assets/media/board.svg";
import dropBoardButton from "./../assets/media/DropBoardButton.svg";
import DraggableBoardPiece from "./DraggableBoardPiece";

export default function Board({ board, isPink }) {
  return (
    <div className="board">
      <img src={svgBoard} alt="Blank Connect 4 Board" nopin="nopin" />
      <br />
      <br />
      <img
        id="drop-pieces-button"
        src={dropBoardButton}
        alt="Drop pieces"
        onClick={() => {
          console.log("Drop pieces");
        }}
        data-pin-no-hover="true"
      />
      <DraggableBoardPiece isPink={isPink} />
    </div>
  );
}
