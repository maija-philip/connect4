import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";
import Draggable from "react-draggable";
import { PINK, YELLOW } from "../utils/gameConst";
import { checkDropPosition } from "../utils/checkDropPosition";
import { API_METHODS, getAPIData } from "../utils/callAPI";

export default function DraggableBoardPiece({ ws, isPink, gameId, disappear, setIsLoading, setMoveErr, reloadGame }) {
  const nodeRef = React.useRef(null);

  const onDrop = async (event) => {
    let result = checkDropPosition(event);
    if (!result.isValid) {
      return;
    }

    setIsLoading(true)
    setMoveErr("")

    // take turn with column value
    let apiResult = await getAPIData(
      `/game/${gameId}/takeTurn`,
      API_METHODS.post,
      { moveColumn: result.column }
    );

    console.log("apiREsult:", apiResult)

    setIsLoading(false)
    if (apiResult.error) {
      // display error
      console.log("error:", apiResult.error)
      setMoveErr(apiResult.error);
      return;
    }

    disappear();
    reloadGame();

    // send message over web socket
    console.log("!ws.current", !ws.current)
    if (!ws.current) return;
    console.log("Sending")
    ws.current.send(
      JSON.stringify({
        gameId: gameId,
        tookTurn: true,
      })
    );
  };

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
