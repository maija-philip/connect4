import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

import IconButton from "@mui/material/IconButton";
import Send from "@mui/icons-material/Send";

export default function MessageInput({ id, sendMessage }) {
  const sendTheMessage = () => {
    const input = document.getElementById(id);
    if (input.value === "") {
      return;
    }

    if (input.value.length > 200) {
      console.log("Message too long");
      return;
    }

    sendMessage(input.value);
    input.value = "";
  };

  // send message when enter is pressed
  const onKeyDownHandler = (e) => {
    // if key is 'enter'
    if (e.keyCode === 13) {
      sendTheMessage();
    }
  };

  return (
    <div className="inputWithIcon">
      <input
        type="text"
        onKeyDown={onKeyDownHandler}
        id={id}
        name={id}
        placeholder="Send Message"
      />
      <div>
        <IconButton
          aria-label="Send Message"
          size="medium"
          onClick={sendTheMessage}
        >
          <Send />
        </IconButton>
      </div>
    </div>
  );
}
