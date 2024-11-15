import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

export default function DraggableBoardPiece({ isPink }) {
  const pink = "#F887B0";
  const yellow = "#E4D67B";

  React.useEffect(() => {
    window.addEventListener("mouseup", stopDrag);
  }, [])

  const [startingPos, setStartingPos] = React.useState({x: 25, y: 25});
  const [coords, setCoords] = React.useState({x: 25, y: 25});
  const [isDragging, setIsDragging] = React.useState(false);


  const startDrag = (event) => {
    event.preventDefault();
    console.log("Start Drag", event)
    setIsDragging(true)
  }

  const drag = (event) => {
    event.preventDefault();
    if (isDragging) {
      console.log("Drag", event)
    }
  }

  const stopDrag = (event) => {
    event.preventDefault();
    console.log("Stop Drag", event)
    setIsDragging(false)
  }

  return (
    <div>
      <svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
        {/* width 50, height: 50 */}
        <rect x="0" y="0" height={500} width={500} fill="#ffffff"/>
        <circle r="25" cx={coords.x} cy={coords.y} fill={isPink ? pink : yellow} onMouseDown={startDrag} onMouseMove={drag} onMouseUp={stopDrag}/>
      </svg>
    </div>
  );
}
