import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";
import { PLAYER_PINK, PLAYER_YELLOW } from "../utils/gameConst";

export default function GameStatus({ opponent, isPink, isYourTurn, winner }) {
  const [title, setTitle] = React.useState("error");
  const [desc, setDesc] = React.useState("");
  const [titleColor, setTitleColor] = React.useState("pink");
  const [shouldHaveLeaveButton, setShouldHaveLeaveButton] = React.useState(false);

  React.useEffect(() => {

    if (
      winner &&
      ((winner === PLAYER_PINK && isPink) ||
        (winner === PLAYER_YELLOW && !isPink))
    ) {
      setTitleColor(isPink ? "pink" : "yellow")
      setTitle("You Won! Congratulations!");
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

  return (
    <div>
      <h1 className={titleColor}>{title}</h1>
      <p>{desc}</p>
      {
        shouldHaveLeaveButton ? <button>Leave Game</button> : <></>
      }
    </div>
  );
}
