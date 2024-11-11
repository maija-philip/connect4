import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "var(--background-variant)",
  border: "none",
  borderRadius: "20px",
  boxShadow: 24,
  outline: "none",
  p: 4,
};

export default function GameRequestDialog({
  username,
  isOpen,
  accept,
  decline,
}) {
  return (
    <Modal open={isOpen} onClose={decline} aria-label="Game Request Dialog">
      <Box sx={style}>
        <div className="select-opponent-dialog game-request-dialog">
          <h2>Game Request</h2>

          <p>
            <span>{username}</span> is requesting a game with you
          </p>

          <div>
            <button onClick={decline}>Decline</button>
            <button onClick={accept} className="yellow-button">
              Accept
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
