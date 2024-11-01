import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
import LoginPage from "./pages/LoginPage.jsx";
import LobbyPage from "./pages/LobbyPage.jsx";
import CreateAccountPage from "./pages/CreateAccount.jsx";
import GamePage from "./pages/GamePage.jsx";

export const UsernameContext = React.createContext(null);

export const Connect4Router = () => {
  // Create username context so it can be used across the app
  const [username, setUsername] = React.useState("");

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

  return (
    <RouterProvider router={router}>
      <UsernameContext.Provider
        value={{ username: username, setUsername: setUsername }}
      >
        <GamePage props={undefined} />
      </UsernameContext.Provider>
    </RouterProvider>
  );
};
