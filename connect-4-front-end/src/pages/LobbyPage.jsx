import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

import { Link } from "react-router-dom";

export default function LobbyPage() {
  return (
    <div className="loginPageWrap lobbyWrap">
      <div
        className="logo"
        aria-label="connect 4 graphical interpretation with 2 by 2 purple board alternating pink and purple tiles"
      ></div>
      <h1>
        Connect <span>4</span>
      </h1>
      <p>Lobby Page</p>
      <Link to={`/login`}>
        <p>login</p>
      </Link>
      <Link to={`/game/123`}>
        <p>play game</p>
      </Link>
    </div>
  );
}
