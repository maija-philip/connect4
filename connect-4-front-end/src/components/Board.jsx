import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";
import SvgBoard from "./SvgBoard";
import dropBoardButton from "./../assets/media/DropBoardButton.svg";
import DraggableBoardPiece from "./DraggableBoardPiece";

export default function Board({ ws, board, isPink, isYourTurn, gameId }) {
  const [isPieceShown, setIsPieceShown] = React.useState(isYourTurn);

  const forfeit = () => {
    console.log("Drop Pieces & Forfeit");
  };

  return (
    <div className="board">
      <SvgBoard board={board} />
      <br />
      <br />
      <img
        id="drop-pieces-button"
        src={dropBoardButton}
        alt="Drop pieces"
        onClick={forfeit}
        data-pin-no-hover="true"
      />
      {isPieceShown ? (
        <DraggableBoardPiece
          ws={ws}
          isPink={isPink}
          gameId={gameId}
          disappear={() => {
            setIsPieceShown(false);
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
