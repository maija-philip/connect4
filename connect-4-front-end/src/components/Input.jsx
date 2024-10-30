import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

export default function Input({ label, name }) {
  return (
    <div className="input"> 
        <label htmlFor={name}>{label}</label>
        <input type="text" id={name} name={name} placeholder={label} />
    </div>
  );
}
