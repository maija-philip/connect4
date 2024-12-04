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
  const getGameData = React.useCallback(async () => {
    const result = await getAPIData(`/game/${gameId}`, API_METHODS.get, {});
    if (result.error) {
      return;
    }
    let game = result.game[0];

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

    console.log("Game Data: ", game)
    console.log("Who am I? ", currentUser)

    return game;
  }, [gameId, currentUser, isPink]);

  /**
   * Initial Use Effect, get session + game data
   */
  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

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
      let game = await getGameData();

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
      setIsLoading(false);
    }

    fetchData();
  }, [navigate, getGameData, gameId, currentUser, setCurrentUser]);

  /**
   *  Web Sockets
   */

  // web socket variables
  const ws = React.useRef(null);
  //const socketUrl = "ws://localhost:8080";
  const socketUrl = "ws://connect4service-281256585027.us-central1.run.app";

  // start websocket
  React.useEffect(() => {
    console.log("Starting web socket");
    ws.current = new WebSocket(socketUrl);
    // ws.current.onopen = () => console.log("ws opened");
    // ws.current.onclose = () => console.log("ws closed");

    const wsCurrent = ws.current;
    return () => {
      wsCurrent.close();
    };
  }, []);

  // see when to reload game data
  React.useEffect(() => {
    if (!ws.current) return;

    // getting message
    ws.current.onmessage = async (e) => {
      const messageData = JSON.parse(e.data);

      console.log("message", messageData);
      console.log(
        "has turn been taken?",
        messageData.tookTurn &&
          messageData.gameId &&
          messageData.gameId === gameId
      );

      // has turn been taken?
      if (
        messageData.tookTurn &&
        messageData.gameId &&
        messageData.gameId === gameId
      ) {
        console.log("Reload Game");
        // reload game until turn is changed
        getGameData();
      }
    };
  }, [ws, gameId, getGameData, isYourTurn]);

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
          <Board
            ws={ws}
            board={board}
            isPink={isPink}
            isYourTurn={isYourTurn}
            gameId={gameId}
            reloadGame={getGameData}
          />
          <GameStatus
            opponent={opponent}
            isPink={isPink}
            isYourTurn={isYourTurn}
            winner={winner}
          />
          <br />
          <br />
          <GameChat ws={ws} gameId={gameId} isPink={isPink} />
        </>
      )}
    </div>
  );
}
