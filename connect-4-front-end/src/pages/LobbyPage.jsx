import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

import { Link } from "react-router-dom";

export default function LobbyPage() {
    
  return (
        <div>
            <p>Lobby Page</p>
            <Link to={`/login`}><p>login</p></Link>
            <Link to={`/game/123`}><p>play game</p></Link>
        </div>
    );
}