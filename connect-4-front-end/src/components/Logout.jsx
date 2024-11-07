import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";

import { API_METHODS, getAPIData } from "../utils/callAPI";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const logout = () => {
    getAPIData("/session/logout", API_METHODS.post, {}).then((response) => {
      navigate("/login");
    });
  };

  return <p onClick={logout} className="logout">Sign out</p>;
}
