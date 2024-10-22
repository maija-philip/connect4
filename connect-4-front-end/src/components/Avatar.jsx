import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

export default function Avatar({ color }) {
  const randomColor = () => {
    if (color && color === "yellow") {
        return "var(--yellow)";
    } 
    if (color && color === "pink") {
        return "var(--pink)";
    }
    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)
    return `rgba(${r}, ${g}, ${b}, 1)`;
  };
  
  return (
    <div className="chat-avatar" style={{ backgroundColor: randomColor()}}>
    </div>
  );
}
