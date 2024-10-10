import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import PasswordInput from "../components/PasswordInput";

export default function LoginPage() {

  return (
    <div>
      <p>Login Page</p>

      <TextField
        id="filled-basic"
        label="Username"
        variant="filled"
        error={true}
        helperText="Must enter a username"
      />

      <TextField
        id="filled-basic"
        label="Password"
        variant="filled"
        error={true}
        helperText="Must enter a username"
      />

      <PasswordInput/>

      <Link to={`/createAccount`}>
        <p>create account</p>
      </Link>
    </div>
  );
}
