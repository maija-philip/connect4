import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

import MessageInput from "../components/MessageInput.jsx";
import ChatMessage from "./ChatMessage.jsx";
import { useCurrentUser } from "../Connect4Router.jsx";

export default function GameChat({ ws, gameId, isPink }) {
  const { currentUser } = useCurrentUser();
  const [messages, setMessages] = React.useState([]);

  /**
   * TODO:
   * - store old messages -> server,
   * - put ready for websocket back in,
   * - save messages for 10m,
   * - get old messages on load
   */

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
  }, [ws, messages, gameId]);

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

      <MessageInput id="gameChat" sendMessage={sendMessage} />
    </div>
  );
}
