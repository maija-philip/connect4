import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";
import Draggable from "react-draggable";
import { PINK, YELLOW } from "../utils/gameConst";

export default function DraggableBoardPiece({ isPink, setIsDragging }) {
  
  return (
    <Draggable
        bounds="body"
        onStart={() => {setIsDragging(true)}}
        onStop={() => {setIsDragging(false)}}
    >
      <div>
        <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
          <circle r="25" cx={25} cy={25} fill={isPink ? PINK : YELLOW} />
        </svg>
      </div>
    </Draggable>
  );
}