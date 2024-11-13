import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";
import { PLAYER_PINK, PLAYER_YELLOW } from "../utils/gameConst";

export default function GameStatus({ opponent, isPink, isYourTurn, winner }) {
  const [title, setTitle] = React.useState("error");
  const [desc, setDesc] = React.useState("");

  React.useEffect(() => {
    if (
      winner &&
      ((winner === PLAYER_PINK && isPink) ||
        (winner === PLAYER_YELLOW && !isPink))
    ) {
      setTitle("You Won! Congratulations!");
      return;
    }
    if (winner) {
      setTitle(`${opponent} Won!`);
      setDesc("Wanna play another game?")
      return;
    }
    if (isYourTurn) {
      setTitle("Your turn!");
      setDesc("Drag your piece into your chosen column")
      return;
    }
    setTitle(`${opponent}'s Turn`);
    setDesc("Waiting them to complete their move")
  }, [isPink, isYourTurn, opponent, winner]);

  return (
    <div>
      <h1 className={isPink ? "pink" : "yellow"}>{title}</h1>
      <p>{desc}</p>
    </div>
  );
}
