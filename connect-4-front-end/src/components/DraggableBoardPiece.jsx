import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";
import Draggable from "react-draggable";
import { PINK, YELLOW } from "../utils/gameConst";
import { checkDropPosition } from "../utils/checkDropPosition";
import { API_METHODS, getAPIData } from "../utils/callAPI";

export default function DraggableBoardPiece({ ws, isPink, gameId, disappear }) {
  const nodeRef = React.useRef(null);

  const onDrop = (event) => {
    let result = checkDropPosition(event);
    if (!result.isValid) {
      return;
    }
    // do something with column value
    disappear()

    getAPIData(`/game/${gameId}/takeTurn`, API_METHODS.post, { column: result.column }).then((response) => {
      if (response.error) {
        console.log("error: ", response.error)
      }
    });


    // send message over web socket
    if (!ws.current) return;
    ws.current.send(
      JSON.stringify({
        gameId: gameId,
        tookTurn: true
      })
    );
  }

  return (
    <Draggable bounds="body" onStop={onDrop} nodeRef={nodeRef}>
      <div ref={nodeRef}>
        <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
          <circle r="25" cx={25} cy={25} fill={isPink ? PINK : YELLOW} />
        </svg>
      </div>
    </Draggable>
  );
}
