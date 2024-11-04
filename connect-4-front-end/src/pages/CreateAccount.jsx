import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import Input from "../components/Input";
import { API_METHODS, getAPIData } from "../utils/callAPI";
import { validateUsernameAndPassword } from "../utils/validateUsernameAndPassword";
import CircularProgress from '@mui/material/CircularProgress';
import { useCurrentUser } from "../Connect4Router";


export default function CreateAccountPage() {
  /**
   * GET TOKEN
   */
  const [token, setToken] = useState("");

  React.useEffect(() => {
    async function fetchData() {
      let result = await getAPIData("/user/getToken", API_METHODS.get, {});
      if (result.token) {
        setToken(result.token);
      }
    }

    fetchData();
  }, [setToken]);

  // console.log(token);

  /**
   * Send Login Request
   */
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { setCurrentUser } = useCurrentUser();
  const navigate = useNavigate();

  const createUser = (event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsProcessing(true);

    console.log("Creating user ...");

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
      token: token,
    };

    getAPIData("/user/createNewUser", API_METHODS.post, data).then(
      (response) => {
        console.log("Success", response);
        setIsProcessing(false);
        if (response.error && response.error === "Token is invalid") {
          setErrorMessage("Something went wrong, reload and try again");
        } else if (response.error) {
          setErrorMessage(response.error);
        } else {
          setCurrentUser(response.username);
          navigate("/");
        }
      }
    );
  };

  /**
   * HTML Return
   */
  return (
    <div className="loginPageWrap createPageWrap">
      {isProcessing ? (
        <CircularProgress />
      ) : (
        <>
          <div
            className="logo"
            aria-label="connect 4 graphical interpretation with 2 by 2 purple board alternating pink and purple tiles"
          ></div>
          <h1>
            Create <span>Account</span>
          </h1>

          <form onSubmit={createUser}>
            <p className="red">{errorMessage}</p>

            <Input label="Username" name="username" />
            <PasswordInput />

            <input type="submit" value="Create Account" />
          </form>

          <Link to={`/login`}>
            <p>Login</p>
          </Link>
        </>
      )}
    </div>
  );
}
