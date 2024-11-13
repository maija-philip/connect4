import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";
import Avatar from "./Avatar";

export default function ChatMessage({ username, message, isSentByMe, color }) {
  return (
    <div className={isSentByMe ? "chat-message chat-message-me" : "chat-message"}>
      <Avatar username={username} color={color}/>
      <div>
        { isSentByMe ? <></> : <p className="username">{username}</p> }
        <p className="message">{message}</p>
      </div>
    </div>
  );
}
