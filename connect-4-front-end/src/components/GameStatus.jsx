import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";
import { PLAYER_PINK, PLAYER_PINK_WINNING_SPOT, PLAYER_YELLOW, PLAYER_YELLOW_WINNING_SPOT } from "../utils/gameConst";
import { useNavigate } from "react-router-dom";
import { API_METHODS, getAPIData } from "../utils/callAPI";


export default function GameStatus({ opponent, isPink, isYourTurn, winner, gameId }) {
  const [title, setTitle] = React.useState("error");
  const [desc, setDesc] = React.useState("");
  const [titleColor, setTitleColor] = React.useState("pink");
  const [shouldHaveLeaveButton, setShouldHaveLeaveButton] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {

    if (
      winner &&
      ((winner === PLAYER_PINK && isPink) ||
        (winner === PLAYER_YELLOW && !isPink))
    ) {
      setTitleColor(isPink ? "pink" : "yellow")
      setTitle(`You Won! ${opponent} forfeited the game`);
      setShouldHaveLeaveButton(true)
      return;
    }
    if (
      winner && 
      ((winner === PLAYER_PINK_WINNING_SPOT && isPink) ||
      (winner === PLAYER_YELLOW_WINNING_SPOT && !isPink))
    ) {
      setTitleColor(isPink ? "pink" : "yellow")
      setTitle("You Won! Congratulations!");
      setShouldHaveLeaveButton(true)
      return;
    }
    if (
      winner && 
      ((winner === PLAYER_PINK && !isPink) ||
      (winner === PLAYER_YELLOW && isPink))
    ) {
      setTitleColor(isPink ? "yellow" : "pink")
      setTitle(`You forfeited the game, ${opponent} won`);
      setDesc("Try to finish the game next time")
      setShouldHaveLeaveButton(true)
      return;
    }
    if (winner) {
      setTitleColor(isPink ? "yellow" : "pink")
      setTitle(`${opponent} Won!`);
      setDesc("Wanna play another game?")
      setShouldHaveLeaveButton(true)
      return;
    }
    if (isYourTurn) {
      setTitleColor(isPink ? "pink" : "yellow")
      setTitle("Your turn!");
      setDesc("Drag your piece into your chosen column")
      setShouldHaveLeaveButton(false)
      return;
    }
    setTitleColor(isPink ? "yellow" : "pink")
    setTitle(`${opponent}'s Turn`);
    setDesc("Waiting them to complete their move")
    setShouldHaveLeaveButton(false)
  }, [isPink, isYourTurn, opponent, winner]);

  const leaveGame = () => {
    getAPIData(`/game/${gameId}/deleteGame`, API_METHODS.post, {})
    navigate("/");
  }

  return (
    <div>
      <h1 className={titleColor}>{title}</h1>
      <p>{desc}</p>
      {
        shouldHaveLeaveButton ? <button onClick={leaveGame}>Leave Game</button> : <></>
      }
    </div>
  );
}
