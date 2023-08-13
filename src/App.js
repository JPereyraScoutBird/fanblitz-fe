import './App.css';

import ErrorPage from './pages/Error';
import { Provider } from 'react-redux';
import store from './store';
import * as React from "react";
import ROUTES from "./routes"
import {
  createBrowserRouter,
  RouterProvider,
  Router, 
  Routes, 
  Route
} from "react-router-dom";

import RenderPage, { loader } from "./pages/Template";
import Pages from './pages';
import PATH_LIST from './routes/constant';
import { Amplify } from "@aws-amplify/core";
import awsconfig from "./aws-exports";
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsconfig);

// const router = createBrowserRouter([...ROUTES[count]]);

const router = (user, signOut) => createBrowserRouter([
  {
    path: `${PATH_LIST.HOME}`,
    element: <Pages.mlb.Home user={user} signOut={signOut}/>,
    errorElement: <ErrorPage />,
  },
  {
    path: `mlb/${PATH_LIST.HOME}`,
    element: <Pages.mlb.Home user={user} signOut={signOut}/>,
    errorElement: <ErrorPage />,
  },
  {
    path: `tennis/${PATH_LIST.HOME}`,
    element: <Pages.tennis.Home user={user} signOut={signOut}/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <RenderPage user={user} signOut={signOut} />,
    errorElement: <ErrorPage />,
    children: ROUTES.MLB,
    loader: loader,
  },
  {
    path: "/mlb/",
    element: <RenderPage user={user} signOut={signOut} />,
    errorElement: <ErrorPage />,
    children: ROUTES.MLB,
    loader: loader,
  },
  {
    path: "/tennis/",
    element: <RenderPage user={user} signOut={signOut} />,
    errorElement: <ErrorPage />,
    children: ROUTES.TENNIS,
    loader: loader,
  },
  {
    path: `/mlb${PATH_LIST.PLAYER_DETAIL}/:playerId`,
    element: <Pages.mlb.Player user={user} signOut={signOut}/>,
    errorElement: <ErrorPage />,
    loader: ({ params }) => {
      return (params);
    },
  },
  {
    path: `/mlb${PATH_LIST.TEAM_DETAIL}/:teamId`,
    element: <Pages.mlb.TeamDetail user={user} signOut={signOut}/>,
    errorElement: <ErrorPage />,
    loader: ({ params }) => {
      return (params);
    },
  },
  {
    path: `/mlb${PATH_LIST.GAME_DETAIL}/:gameId`,
    element: <Pages.mlb.GamePlays user={user} signOut={signOut}/>,
    errorElement: <ErrorPage />,
    loader: ({ params }) => {
      return (params);
    },
  },
  {
    path: `/tennis${PATH_LIST.PLAYER_DETAIL}/:playerId`,
    element: <Pages.tennis.Playe user={user} signOut={signOut}/>,
    errorElement: <ErrorPage />,
    loader: ({ params }) => {
      return (params);
    },
  },
]);



function App({ signOut, user }) {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router(user, signOut)}/>
      </Provider>
    </React.StrictMode>
  );
}

export default withAuthenticator(App);
