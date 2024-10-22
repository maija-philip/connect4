import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

import MessageInput from "../components/MessageInput.jsx";
import ChatMessage from "./ChatMessage.jsx";

export default function Chat() {
  return (
    <div className="chat"> 
        <MessageInput id="lobby"/>
       <ChatMessage username="maijaphilip" message="you are going down" isSentByMe={true}/>
       <ChatMessage username="kelseyyy" message="I'm gonna win" isSentByMe={false}/>
    </div>
  );
}
