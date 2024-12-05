import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";
import Draggable from "react-draggable";
import { PINK, YELLOW } from "../utils/gameConst";
import { checkDropPosition } from "../utils/checkDropPosition";

export default function DraggableBoardPiece({ ws, isPink, gameId, takeTurn }) {
  const nodeRef = React.useRef(null);

  const onDrop = async (event) => {
    let result = checkDropPosition(event);
    if (!result.isValid) {
      return;
    }
    takeTurn('takeTurn', { moveColumn: result.column })
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
