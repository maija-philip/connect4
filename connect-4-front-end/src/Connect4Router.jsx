import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
import LoginPage from "./pages/LoginPage.jsx";
import LobbyPage from "./pages/LobbyPage.jsx";
import CreateAccountPage from "./pages/CreateAccount.jsx";
import GamePage from "./pages/GamePage.jsx";

export const CurrentUserContext = React.createContext();

export const Connect4Router = () => {
  const [currentUser, setCurrentUser] = React.useState(null);

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
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <RouterProvider router={router}>
        <GamePage props={undefined} />
      </RouterProvider>
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => React.useContext(CurrentUserContext)
