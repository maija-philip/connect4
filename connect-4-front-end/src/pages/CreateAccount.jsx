import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

import { Link } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import Input from "../components/Input";

export default function CreateAccountPage() {
    
  return (
    <div className="loginPageWrap createPageWrap">
    <div
      className="logo"
      aria-label="connect 4 graphical interpretation with 2 by 2 purple board alternating pink and purple tiles"
    ></div>
    <h1>
      Create <span>Account</span>
    </h1>

    <form method="POST">
      <Input label="Username" />
      <PasswordInput />
      <Link to={`/`} className="noUnderline">
        <input type="submit" value="Create Account" />
      </Link>
    </form>

    <Link to={`/login`}>
      <p>Login</p>
    </Link>
  </div>
    );
}