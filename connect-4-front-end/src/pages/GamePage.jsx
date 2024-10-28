import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

import { Link, useParams } from "react-router-dom";
import { API_METHODS, getAPIData } from "../utils/callAPI";

export default function GamePage() {
  const { gameId } = useParams();

  React.useEffect(() => {

    async function fetchData() {
      let result = await getAPIData("/session", API_METHODS.get, {})
      console.log(result);
    }
    
    fetchData();
  }, []);

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
