import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

import { Link } from "react-router-dom";

export default function Logout() {
  return (
    <Link to={`/login`} className="logout">
        <p>Sign out</p>
      </Link>
  );
}
