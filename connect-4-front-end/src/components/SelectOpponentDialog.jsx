import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { CircularProgress } from "@mui/material";
import { API_METHODS, getAPIData } from "../utils/callAPI";
import { useCurrentUser } from "../Connect4Router.jsx";

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
  p: 4,
};

export default function SelectOpponentDialog({ sendRequest }) {
  /**
   * Handle Open, Close, Sending Results
   */
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    fetchAvailableUsers()
    setOpen(true)
};
  const handleClose = () => setOpen(false);

  const sendTheRequest = (event) => {
    event.preventDefault();

    const username = document.getElementById("opponent-select").value;

    // console.log("Picked person: ", username);
    sendRequest(username);
    handleClose();
  };

  /**
   * Get available users
   */
  const [availableUsers, setAvailableUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { currentUser } = useCurrentUser();

  const fetchAvailableUsers = async function () {
    setIsLoading(true);
    let result = await getAPIData("/user", API_METHODS.get, {});
    if (result.error) {
      handleClose();
    }

    let users = []
    result.users.forEach((userObj) => {
        if (userObj.username !== currentUser) {
            users.push(userObj.username)
        }
    })
    setIsLoading(false);
    setAvailableUsers(users)
  };

  return (
    <div>
      <button onClick={handleOpen}>Find Opponent</button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-label="Select an opponent dialog"
      >
        <Box sx={style}>
          {isLoading ? (
            <div className="select-opponent-dialog-loading">
                <CircularProgress />
            </div>
          ) : (
            <div className="select-opponent-dialog">
              <h2>Select an Opponent</h2>

              <select name="players" id="opponent-select">
                {availableUsers.map((username, index) => {
                    return <option key={index} value={username}>{username}</option>
                })}
              </select>

              <button onClick={sendTheRequest}>Send Request</button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
