import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

import { Link } from "react-router-dom";

export default function CreateAccountPage() {
    
  return (
        <div>
            <p>Create Account</p>
            <Link to={`/`}><p>lobby</p></Link>
        </div>
    );
}