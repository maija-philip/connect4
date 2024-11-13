import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

import { useParams } from "react-router-dom";
import { API_METHODS, getAPIData } from "../utils/callAPI";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../Connect4Router";
import { NO_PLAYER, PLAYER_PINK, PLAYER_YELLOW } from "../utils/gameConst";
import Board from "../components/Board";
import { CircularProgress } from "@mui/material";
import GameStatus from "../components/GameStatus";
import DraggableBoardPiece from "../components/DraggableBoardPiece";
import GameChat from "../components/GameChat";

export default function GamePage() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  /**
   * Game State Variables
   */
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [opponent, setOpponent] = React.useState(undefined);
  const [isPink, setIsPink] = React.useState(false);
  const [board, setBoard] = React.useState(undefined);
  const [isYourTurn, setIsYourTurn] = React.useState(false);
  const [winner, setWinner] = React.useState(undefined);

  /**
   * Set the game data from the api game result
   */
  const setGameData = React.useCallback(
    (game) => {
      // are you pink or yellow? and who is your opponent
      if (game.playerPink === currentUser) {
        setIsPink(true);
        setOpponent(game.playerYellow);
      } else if (game.playerYellow === currentUser) {
        setIsPink(false);
        setOpponent(game.playerPink);
      } else {
        // you are not a player in this game
        navigate("/");
      }

      if (
        (game.turn === PLAYER_PINK && isPink) ||
        (game.turn === PLAYER_YELLOW && !isPink)
      ) {
        setIsYourTurn(true);
      } else {
        setIsYourTurn(false);
      }

      if (game.winner !== NO_PLAYER) {
        setWinner(game.winner);
      }

      setBoard(game.gameboard.board);
    },
    [currentUser, isPink, navigate]
  );

  /**
   * Initial Use Effect
   */
  React.useEffect(() => {
    async function fetchData() {

      setIsLoading(true)

      // check session
      let result = await getAPIData("/session", API_METHODS.get, {});
      if (result.error) {
        navigate("/login");
        return;
      }
      await setCurrentUser(result.username);

      if (!currentUser) {
        return;
      }
      // get game data
      result = await getAPIData(`/game/${gameId}`, API_METHODS.get, {});
      if (result.error) {
        return;
      }
      setGameData(result.game[0]);
      setIsLoading(false)
    }

    fetchData();
  }, [navigate, setGameData, gameId, currentUser, setCurrentUser]);

  return (
    <div className="gameWrap">
      {isLoading ? (
        <div className="gameLoadingWrap">
          <CircularProgress />
        </div>
      ) : (
        <>
          <h1>
            <span className={isPink ? "pink" : "yellow"}>{currentUser}</span> vs{" "}
            <span className={isPink ? "yellow" : "pink"}>{opponent}</span>
          </h1>
          <Board board={board} />
          <GameStatus opponent={opponent} isPink={isPink} isYourTurn={isYourTurn} winner={winner} />
          <DraggableBoardPiece isPink={isPink} />
          <GameChat gameId={gameId} isPink={isPink}/>
        </>
      )}
    </div>
  );
}
