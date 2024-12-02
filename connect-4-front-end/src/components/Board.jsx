import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";
import SvgBoard from "./SvgBoard";
import dropBoardButton from "./../assets/media/DropBoardButton.svg";
import DraggableBoardPiece from "./DraggableBoardPiece";
import { CircularProgress } from "@mui/material";

export default function Board({ ws, board, isPink, isYourTurn, gameId, reloadGame }) {
  const [isPieceShown, setIsPieceShown] = React.useState(isYourTurn);
  const [isLoading, setIsLoading] = React.useState(false);
  const [moveErr, setMoveErr] = React.useState("");

  const forfeit = () => {
    console.log("Drop Pieces & Forfeit");
  };

  React.useEffect(() => {
    console.log("Is piece shown?", isPieceShown)
  }, [])

  return (
    <div className="board">
      {isLoading ? (
        <div style={{ margin: "auto" }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          {moveErr !== "" ? <p className="red">{moveErr}</p> : <></>}
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
              setIsLoading={setIsLoading}
              setMoveErr={setMoveErr}
              reloadGame={reloadGame}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}
