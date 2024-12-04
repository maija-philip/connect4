import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

import MessageInput from "../components/MessageInput.jsx";
import ChatMessage from "./ChatMessage.jsx";
import { useCurrentUser } from "../Connect4Router.jsx";
import { CircularProgress } from "@mui/material";
import { API_METHODS, getAPIData } from "../utils/callAPI.js";

export default function GameChat({ ws, gameId, isPink }) {
  const { currentUser } = useCurrentUser();
  const [messages, setMessages] = React.useState([]);
  const [isChatLoading, setIsChatLoading] = React.useState(false);

  /**
   * Initial Use Effect
   */
  React.useEffect(() => {
    async function fetchData() {
      setIsChatLoading(true);

      // GET LOBBY MESSAGES
      const result = await getAPIData(`/game/${gameId}/getMessages`, API_METHODS.get, {});
      setMessages(result.messages);
      setIsChatLoading(false);
    }

    fetchData();
  }, [gameId]);

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
      {isChatLoading ? (
        <div style={{margin: "auto"}}>
        <CircularProgress />
        </div>
      ) : (
        <>
          {messages.length < 1 ? <p>Start the conversation!</p> : <></>}

          {[...messages].map((item, index) => {
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
        </>
      )}
    </div>
  );
}
