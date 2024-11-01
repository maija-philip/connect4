import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import Input from "../components/Input";
import { API_METHODS, getAPIData } from "../utils/callAPI";
import { validateUsernameAndPassword } from "../utils/validateUsernameAndPassword";

export default function LoginPage() {
  /**
   * Send Login Request
   */
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const validateLogin = (event) => {
    event.preventDefault();
    setErrorMessage("");

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const validationResult = validateUsernameAndPassword(username, password);

    if (validationResult.error !== false) {
      setErrorMessage(validationResult.error);
      return;
    }

    const data = {
      username: username,
      password: password,
    };

    getAPIData("/user/verifyUser", API_METHODS.post, data)
      .then((response) => {
        console.log("Success", response);
        if (response.error) {
          setErrorMessage(response.error);
        } else {
          navigate("/");
        }
      })
  };

  /**
   * HTML Return
   */
  return (
    <div className="loginPageWrap">
      <div
        className="logo"
        aria-label="connect 4 graphical interpretation with 2 by 2 purple board alternating pink and purple tiles"
      ></div>
      <h1>
        Connect <span>4</span>
      </h1>

      <form onSubmit={validateLogin}>
        <p className="red">{errorMessage}</p>

        <Input label="Username" name="username" />
        <PasswordInput />

        <input type="submit" value="Login" />
      </form>

      <Link to={`/createAccount`}>
        <p>Create Account</p>
      </Link>
    </div>
  );
}
