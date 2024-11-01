import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Connect4Router } from "./Connect4Router.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Creates the theme for MUI
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#F887B0" },
    secondary: { main: "#E4D67B" },
    text: {
      primary: "#DDDDED",
      secondary: "#DDDDED",
    },
    background: { default: "#101029" },
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Connect4Router />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
