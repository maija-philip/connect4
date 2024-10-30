import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

import { Link } from "react-router-dom";
import Logout from "../components/Logout";
import Chat from "../components/Chat";
import { API_METHODS, getAPIData } from "../utils/callAPI";
import { useNavigate } from "react-router-dom";

export default function LobbyPage() {

  const navigate = useNavigate();

  React.useEffect(() => {

    async function fetchData() {
      let result = await getAPIData("/session", API_METHODS.get, {})
      if (result.error) {
        navigate("/login");
      }
    }
    
    fetchData();
  }, [navigate]);

  return (
    <div className="loginPageWrap lobbyWrap chatWrap">
      <Logout />
      <div
        className="logo"
        aria-label="connect 4 graphical interpretation with 2 by 2 purple board alternating pink and purple tiles"
      ></div>
      <h1>
        Connect <span>4</span>
      </h1>
      <button>Find Opponent</button>

      <Link to={`/game/123`}>
        <p>play game</p>
      </Link>

      <Chat/>
    </div>
  );
}
