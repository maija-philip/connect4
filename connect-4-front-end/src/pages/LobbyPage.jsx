import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

import Logout from "../components/Logout";
import Chat from "../components/Chat";
import { API_METHODS, getAPIData } from "../utils/callAPI";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../Connect4Router";
import { CircularProgress } from "@mui/material";
import GameRequestCountdown from "../components/GameRequestCountdown";

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
   * WEB SOCKETS - Messages
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
      setMessages(
        messages.concat([
          {
            user: messageData.user,
            message: messageData.message,
          },
        ])
      );
    };
  }, [messages]);

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
   * GAME REQUEST
   */
  const [isCountdownInProgress, setIsCountdownInProgress] =
    React.useState(true);

  const countdownFinished = () => {
    setIsCountdownInProgress(false);
    console.log("Countdown finished");
    // send message that request expired
  };

  /**
   * HTML RETURN
   */

  return (
    <div className="loginPageWrap lobbyWrap chatWrap">
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
          requestedUsername="kelseyyy"
          countdownFinished={countdownFinished}
        />
      ) : (
        <></>
      )}
      <button>Find Opponent</button>

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
    </div>
  );
}
