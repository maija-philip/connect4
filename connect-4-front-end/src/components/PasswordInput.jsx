import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function PasswordInput() {
  // make show/hide work
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div>
      <label htmlFor="password">Password</label>
      <div className="inputWithIcon">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          placeholder="Password"
        />
        <div>
          <IconButton
            aria-label={showPassword ? "Hide Password" : "Show Password"}
            size="medium"
            onClick={() => {setShowPassword(!showPassword)} }
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </div>
      </div>
    </div>
  );
}
