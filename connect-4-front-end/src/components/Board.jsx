import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";
import svgBoard from "./../assets/media/board.svg";
import dropBoardButton from "./../assets/media/DropBoardButton.svg";

export default function Board({ board }) {
  return (
    <div className="board">
      <img src={svgBoard} alt="Blank Connect 4 Board" />
      <br />
      <br />
      <img src={dropBoardButton} alt="Drop pieces" />
    </div>
  );
}
