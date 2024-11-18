import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";
// import svgBoard from "./../assets/media/board.svg";
import SvgBoard from "./SvgBoard";
import dropBoardButton from "./../assets/media/DropBoardButton.svg";
import DraggableBoardPiece from "./DraggableBoardPiece";


export default function Board({ board, isPink }) {

  const [isDragging, setIsDragging] = React.useState(false);

  const forfeit = () => {
    console.log("Drop Pieces & Forfeit")
  }

  return (
    <div className="board">
      <SvgBoard board={board}/>
      <br />
      <br />
      <img
        id="drop-pieces-button"
        src={dropBoardButton}
        alt="Drop pieces"
        onClick={forfeit}
        data-pin-no-hover="true"
      />
      <DraggableBoardPiece isPink={isPink} setIsDragging={setIsDragging} />
    </div>
  );
}
