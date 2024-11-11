import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

import { useCallback } from "react";
import Logout from "../components/Logout";
import Chat from "../components/Chat";
import { API_METHODS, getAPIData } from "../utils/callAPI";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../Connect4Router";
import { CircularProgress } from "@mui/material";
import GameRequestCountdown from "../components/GameRequestCountdown";
import SelectOpponentDialog from "../components/SelectOpponentDialog";
import GameRequestDialog from "../components/GameRequestDialog";

export default function LobbyPage() {
  /**
   * Web Sockets Variables
   */
  const ws = React.useRef(null);
  //const socketUrl = "ws://localhost:8080";
  const socketUrl = "ws://connect4service-281256585027.us-central1.run.app";
  const [readyForWS, setReadyForWS] = React.useState(false);

  /**
   *  Fetch session + chats Variables
   */
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useCurrentUser();

  const [messages, setMessages] = React.useState([]);
  const [isChatLoading, setIsChatLoading] = React.useState(false);

  /**
   * Game Request Variables
   */
  const [isCountdownInProgress, setIsCountdownInProgress] =
    React.useState(false);
  const [requestedUsername, setRequestedUsername] = React.useState(undefined);
  const [usernameRequestingGame, setUsernameRequestingGame] =
    React.useState(undefined);
  const [isGameRequestDialogOpen, setIsGameRequestDialogOpen] =
    React.useState(false);

  const [isPageLoading, setIsPageLoading] = React.useState(false);

  /**
   * Initial Use Effect
   */
  React.useEffect(() => {
    async function fetchData() {
      // GET SESSION + SET CURRENT USER
      let result = await getAPIData("/session", API_METHODS.get, {});
      if (result.error) {
        navigate("/login");
      }
      setCurrentUser(result.username);
      setIsChatLoading(true);

      // GET LOBBY MESSAGES
      result = await getAPIData("/lobby", API_METHODS.get, {});
      setMessages(result.messages);
      setIsChatLoading(false);

      // START WEB SOCKET
      setReadyForWS(true);
    }

    fetchData();
  }, [navigate, setCurrentUser]);

  /**
   * GAME REQUEST
   */

  const countdownFinished = () => {
    setIsCountdownInProgress(false);
    console.log("Countdown finished");
    // send message that request expired
    ws.current.send(
      JSON.stringify({
        expired: "Request Expired",
        receiver: requestedUsername,
        sender: currentUser,
      })
    );
  };

  const sendGameRequest = (username) => {
    if (!ws.current) return;
    ws.current.send(
      JSON.stringify({
        request: username,
        sender: currentUser,
      })
    );
    setRequestedUsername(username);
    setIsCountdownInProgress(true);
  };

  const acceptGameRequest = async () => {
    console.log("accept request");
    setIsPageLoading(true);
    let result = await getAPIData(
      "/lobby/acceptGameRequest",
      API_METHODS.post,
      {
        sender: usernameRequestingGame,
        receiver: currentUser,
      }
    );
    
    setIsPageLoading(false);
    if (result.error) {
      // decline if there's an error
      declineGameRequest();
    }
    ws.current.send(
      JSON.stringify({
        accepted: "Request accepted",
        receiver: currentUser,
        sender: usernameRequestingGame,
        gameId: result.gameId,
      })
    );
    setIsGameRequestDialogOpen(false);
    navigate(`/game/${result.gameId}`);
  };

  const declineGameRequest = useCallback(() => {
    console.log("decline request");
    ws.current.send(
      JSON.stringify({
        declined: "Request Declined",
        receiver: currentUser,
        sender: usernameRequestingGame,
      })
    );
    setIsGameRequestDialogOpen(false);
  }, [currentUser, usernameRequestingGame, setIsGameRequestDialogOpen]);

  /**
   * WEB SOCKETS
   */

  React.useEffect(() => {
    if (readyForWS) {
      console.log("Starting web socket");
      ws.current = new WebSocket(socketUrl);
      // ws.current.onopen = () => console.log("ws opened");
      // ws.current.onclose = () => console.log("ws closed");

      const wsCurrent = ws.current;

      return () => {
        wsCurrent.close();
      };
    }
  }, [readyForWS]);

  // display messages ws sent
  React.useEffect(() => {
    if (!ws.current) return;

    // getting message
    ws.current.onmessage = (e) => {
      const messageData = JSON.parse(e.data);

      // is Chat Message?
      if (messageData.message) {
        setMessages(
          messages.concat([
            {
              user: messageData.user,
              message: messageData.message,
            },
          ])
        );
        return;
      }

      // is game request?
      if (messageData.request && messageData.request === currentUser) {
        // check if they already sent one (auto decline if they are waiting on one)
        console.log("Got a game request from: ", messageData.sender);

        if (isCountdownInProgress) {
          // reject game request
          declineGameRequest();
          return;
        }

        // display incoming request
        setUsernameRequestingGame(messageData.sender);
        setIsGameRequestDialogOpen(true);
      }

      // game request expired
      if (messageData.expired && messageData.receiver === currentUser) {
        setIsGameRequestDialogOpen(false);
        declineGameRequest();
      }

      // game request declined
      if (messageData.declined && messageData.sender === currentUser) {
        setIsCountdownInProgress(false);
      }

      // game request accepted
      if (messageData.accepted && messageData.sender === currentUser) {
        navigate(`/game/${messageData.gameId}`);
      }
    };
  }, [
    messages,
    currentUser,
    isCountdownInProgress,
    declineGameRequest,
    navigate,
  ]);

  // send a message
  const sendMessage = (message) => {
    if (!ws.current) return;
    ws.current.send(
      JSON.stringify({
        user: currentUser,
        message: message,
      })
    );
  };

  /**
   * HTML RETURN
   */

  return (
    <div className="loginPageWrap lobbyWrap chatWrap">
      {isPageLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Logout />
          <div
            className="logo"
            aria-label="connect 4 graphical interpretation with 2 by 2 purple board alternating pink and purple tiles"
          ></div>
          <h1>
            Connect <span>4</span>
          </h1>
          {isCountdownInProgress ? (
            <GameRequestCountdown
              requestedUsername={requestedUsername}
              countdownFinished={countdownFinished}
            />
          ) : (
            <></>
          )}

          <SelectOpponentDialog sendRequest={sendGameRequest} />
          <GameRequestDialog
            username={usernameRequestingGame}
            isOpen={isGameRequestDialogOpen}
            accept={acceptGameRequest}
            decline={declineGameRequest}
          />

          {isChatLoading ? (
            <div
              className="chatWrap"
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <CircularProgress />
            </div>
          ) : (
            <Chat messages={messages} sendMessage={sendMessage} />
          )}
        </>
      )}
    </div>
  );
}
