import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

import IconButton from "@mui/material/IconButton";
import Send from "@mui/icons-material/Send";

export default function MessageInput({ id }) {
  const sendMessage = () => {
    console.log("Send Message ... ");
    // TODO
  };

  return (
    <div className="inputWithIcon">
      <input type="text" id={id} name={id} placeholder="Send Message" />
      <div>
        <IconButton
          aria-label="Send Message"
          size="medium"
          onClick={sendMessage}
        >
          <Send />
        </IconButton>
      </div>
    </div>
  );
}
