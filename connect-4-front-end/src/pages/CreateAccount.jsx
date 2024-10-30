import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import Input from "../components/Input";
import { API_METHODS, getAPIData } from "../utils/callAPI";

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

  console.log(token);
  
  /**
   * Validate Form
   */

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validateData = () => {
    return false;
  }



  /**
   * Send Login Request
   */
  const navigate = useNavigate();
  const createUser = (event) => {

    if (!validateData()) {
      return;
    }

    const data = new URLSearchParams();
    data.append('username', username)
    data.append('password', password)
    data.append('token', token)

    getAPIDataFormParams("/user/createNewUser", API_METHODS.post, data)
    .then(response => {
      // do something
      console.log('Success', response)
      navigate("/");
    })
    .catch(error => {
      // do something
      console.log('Error', error)
    })

  }



  /**
   * HTML Return
   */
  return (
    <div className="loginPageWrap createPageWrap">
      <div
        className="logo"
        aria-label="connect 4 graphical interpretation with 2 by 2 purple board alternating pink and purple tiles"
      ></div>
      <h1>
        Create <span>Account</span>
      </h1>

      <form 
        onSubmit={createUser}
      >
        <Input label="Username" name="username" />
        <PasswordInput />

        <input type="submit" value="Create Account" />
      </form>

      <Link to={`/login`}>
        <p>Login</p>
      </Link>
    </div>
  );
}
