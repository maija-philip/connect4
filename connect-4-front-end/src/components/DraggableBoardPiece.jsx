import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

export default function DraggableBoardPiece({ isPink }) {

    const pink = "#F887B0";
    const yellow = "#E4D67B";

  return (
    <div>
        <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
            <circle r="25" cx="25" cy="25" fill={isPink ? pink : yellow}/>
        </svg>
    </div>
  );
}
