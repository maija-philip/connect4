import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

export default function Avatar({ color, username }) {

  const getColor = () => {
    if (color && color === "yellow") {
        return "var(--yellow)";
    } 
    if (color && color === "pink") {
        return "var(--pink)";
    }

    // https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
    let hash = 0;
    username.split('').forEach(char => {
      hash = char.charCodeAt(0) + ((hash << 5) - hash)
    })
    let createdColor = '#'
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff
      createdColor += value.toString(16).padStart(2, '0')
    }
    return createdColor
  };
  
  
  return (
    <div className="chat-avatar" style={{ backgroundColor: getColor()}}>
    </div>
  );
}
