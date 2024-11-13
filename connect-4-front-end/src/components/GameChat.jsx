import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

import MessageInput from "../components/MessageInput.jsx";
import ChatMessage from "./ChatMessage.jsx";
import { useCurrentUser } from "../Connect4Router.jsx";

export default function GameChat({ gameId, isPink }) {
  const { currentUser } = useCurrentUser();
  const [messages, setMessages] = React.useState([]);

  // web socket variables
  const ws = React.useRef(null);
  //const socketUrl = "ws://localhost:8080";
  const socketUrl = "ws://connect4service-281256585027.us-central1.run.app";

/**
 * TODO: 
 * - store old messages -> server, 
 * - put ready for websocket back in, 
 * - save messages for 10m, 
 * - get old messages on load 
 */

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

  // display messages ws sent
  React.useEffect(() => {
    if (!ws.current) return;

    // getting message
    ws.current.onmessage = (e) => {
      const messageData = JSON.parse(e.data);

      // is Chat Message?
      if (
        messageData.gameMessage &&
        messageData.gameId &&
        messageData.gameId === gameId
      ) {
        setMessages(
          messages.concat([
            {
              user: messageData.user,
              message: messageData.gameMessage,
            },
          ])
        );
      }
    };
  }, [messages, gameId]);

  // send a message
  const sendMessage = (message) => {
    if (!ws.current) return;
    ws.current.send(
      JSON.stringify({
        gameId: gameId,
        user: currentUser,
        gameMessage: message,
      })
    );
  };

  return (
    <div className="chat">
      <MessageInput id="gameChat" sendMessage={sendMessage} />
      {messages.length < 1 ? <p>Start the conversation!</p> : <></>}

      {[...messages].reverse().map((item, index) => {
        const isSentByMe = item.user === currentUser;
        const messageColor =
          (isSentByMe && isPink) || (!isSentByMe && !isPink)
            ? "pink"
            : "yellow";

        return (
          <ChatMessage
            key={index}
            username={item.user}
            message={item.message}
            isSentByMe={isSentByMe}
            color={messageColor}
          />
        );
      })}
    </div>
  );
}
