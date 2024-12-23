import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";
import SvgBoard from "./SvgBoard";
import dropBoardButton from "./../assets/media/DropBoardButton.svg";
import DraggableBoardPiece from "./DraggableBoardPiece";
import { CircularProgress } from "@mui/material";
import { API_METHODS, getAPIData } from "../utils/callAPI";
import { dropPieces } from "../utils/dropPieces";

export default function Board({ ws, board, isPink, isYourTurn, gameId, reloadGame }) {
  const [isPieceShown, setIsPieceShown] = React.useState(isYourTurn);
  const [isLoading, setIsLoading] = React.useState(false);
  const [moveErr, setMoveErr] = React.useState("");

  const takeTurn = async (query, payload) => {
    setIsLoading(true)
    setMoveErr("")

    // take turn game
    let apiResult = await getAPIData(
      `/game/${gameId}/${query}`,
      API_METHODS.post,
      payload
    );

    setIsLoading(false)
    if (apiResult.error) {
      // display error
      setMoveErr(apiResult.error);
      return;
    }

    setIsPieceShown(false);
    reloadGame();
  }

  const forfeit = async () => {
    await takeTurn('forfeit', {})
    dropPieces()
  }

  React.useEffect(() => {
    setIsPieceShown(isYourTurn)
  }, [isYourTurn])

  React.useEffect(() => {
    console.log("Is piece shown?", isPieceShown, ", is your turn?", isYourTurn)
  }, [isPieceShown, isYourTurn])

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
              takeTurn={takeTurn}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}
