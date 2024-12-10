import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

import Snackbar from "@mui/material/Snackbar";

export default function PlayerConnectedToast({ ws }) {
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState(undefined);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setUsername(undefined);
    setOpen(false)
  };

  // display messages ws sent
  React.useEffect(() => {
    if (!ws.current) return;

    // getting message
    ws.current.onmessage = (e) => {
      const messageData = JSON.parse(e.data);

      if (messageData.connection) {
        console.log("open toast");
        setUsername(messageData.user);
        setOpen(true)
      }
    };
  }, [ws]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      message={`${username} joined the lobby`}
    />
  );
}
