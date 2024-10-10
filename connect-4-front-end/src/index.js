import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// pages
import LoginPage from "./pages/LoginPage.jsx";
import LobbyPage from "./pages/LobbyPage.jsx";
import CreateAccountPage from "./pages/CreateAccount.jsx";
import GamePage from "./pages/GamePage.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

// all the pages you can navigate to
const router = createBrowserRouter([
  {
    path: "/",
    element: <LobbyPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/createAccount",
    element: <CreateAccountPage />,
  },
  {
    path: "/game/:gameId",
    element: <GamePage />,
  },
]);

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
      <RouterProvider router={router}>
        <GamePage props={undefined} />
      </RouterProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
