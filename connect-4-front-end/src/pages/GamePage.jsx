import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

import { Link, useParams } from "react-router-dom";

export default function GamePage() {
  const { gameId } = useParams();

  return (
    <div>
      <p>Game Page</p>
      <p>Game: {gameId}</p>
      <Link to={`/`}>
        <p>back to lobby</p>
      </Link>
    </div>
  );
}
