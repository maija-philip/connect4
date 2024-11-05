import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

import MessageInput from "../components/MessageInput.jsx";
import ChatMessage from "./ChatMessage.jsx";
import { useCurrentUser } from "../Connect4Router.jsx";

export default function Chat({ messages, sendMessage }) {
  
  const { currentUser } = useCurrentUser();

  return (
    <div className="chat">
      {messages.length < 1 ? <p>No Messages</p> : <></>}
      {messages.map((item, index) => {
        return (
          <ChatMessage
            key={index}
            username={item.user}
            message={item.message}
            isSentByMe={item.user === currentUser}
          />
        );
      })}
      <MessageInput id="lobby" sendMessage={sendMessage}/>
    </div>
  );
}
