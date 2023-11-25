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
import { withAuthenticator, Button, Heading, AmplifySignIn, Authenticator   } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import '@aws-amplify/ui-react/styles.css';
import RequireAuth from './RequireAuth';

// withAuthenticator
Amplify.configure(awsconfig);

const BetsWithAuthMLB = RequireAuth(Pages.mlb.SocialBets);
const BetsWithAuthCBB = RequireAuth(Pages.cbb.SocialBets);
const BetsWithAuthNBA = RequireAuth(Pages.nba.SocialBets);
const BetsWithAuthTENNIS = RequireAuth(Pages.tennis.SocialBets);

const router = (user="", signOut=undefined) => createBrowserRouter([
  {
    path: `mlb/${PATH_LIST.HOME}`,
    element: <Pages.mlb.Home user={user}/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/mlb/",
    element: <RenderPage user={user}  />,
    errorElement: <ErrorPage />,
    children: ROUTES.MLB,
    loader: loader,
  },
  {
    path: `/mlb${PATH_LIST.PLAYER_DETAIL}/:playerId`,
    element: <Pages.mlb.Player user={user} />,
    errorElement: <ErrorPage />,
    loader: ({ params }) => {
      return (params);
    },
  },
  {
    path: `/mlb${PATH_LIST.TEAM_DETAIL}/:teamId`,
    element: <Pages.mlb.TeamDetail user={user} />,
    errorElement: <ErrorPage />,
    loader: ({ params }) => {
      return (params);
    },
  },
  {
    path: `/mlb${PATH_LIST.GAME_DETAIL}/:gameId`,
    element: <Pages.mlb.GamePlays user={user} />,
    errorElement: <ErrorPage />,
    loader: ({ params }) => {
      return (params);
    },
  },
  {
    path: `/mlb${PATH_LIST.LIVE}`,
    element: <Pages.mlb.LiveGame />,
    errorElement: <ErrorPage />,
    loader: ({ params }) => {
      return (params);
    },
  },
  {
    path: `/mlb${PATH_LIST.BOX}/:gameId`,
    element: <Pages.mlb.Box />,
    errorElement: <ErrorPage />,
    loader: ({ params }) => {
      return (params);
    },
  },
  {
    path: `/mlb${PATH_LIST.SOCIAL_BETS}`,
    element: <BetsWithAuthMLB user={user} signOut={signOut} />,
    errorElement: <ErrorPage />,
    loader: ({ params }) => {
      return (params);
    },
  },
  {
    path: `tennis/${PATH_LIST.HOME}`,
    element: <Pages.tennis.Home user={user}/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/tennis/",
    element: <RenderPage user={user} />,
    errorElement: <ErrorPage />,
    children: ROUTES.TENNIS,
    loader: loader,
  },
  {
    path: `/tennis${PATH_LIST.PLAYER_DETAIL}/:playerId`,
    element: <Pages.tennis.Player user={user} />,
    errorElement: <ErrorPage />,
    loader: ({ params }) => {
      return (params);
    },
  },
  {
    path: `/tennis${PATH_LIST.SOCIAL_BETS}`,
    element: <BetsWithAuthTENNIS user={user} signOut={signOut}/>,
    errorElement: <ErrorPage />,
    loader: ({ params }) => {
      return (params);
    },
  },



  {
    path: `${PATH_LIST.HOME}`,
    element: <Pages.cbb.Home user={user}/>,
    errorElement: <ErrorPage />,
  },
  {
    path: `cbb/${PATH_LIST.HOME}`,
    element: <Pages.cbb.Home user={user}/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <RenderPage user={user} />,
    errorElement: <ErrorPage />,
    children: ROUTES.CBB,
    loader: loader,
  },
  {
    path: "/cbb",
    element: <RenderPage user={user}  />,
    errorElement: <ErrorPage />,
    children: ROUTES.CBB,
    loader: loader,
  },
  {
    path: `/cbb${PATH_LIST.PLAYER_DETAIL}/:playerId`,
    element: <Pages.cbb.Player user={user}/>,
    errorElement: <ErrorPage />,
    loader: ({ params }) => {
      return (params);
    },
  },
  {
    path: `/cbb${PATH_LIST.TEAM_DETAIL}/:teamId`,
    element: <Pages.cbb.TeamDetail user={user}/>,
    errorElement: <ErrorPage />,
    loader: ({ params }) => {
      return (params);
    },
  },
  {
    path: `/cbb${PATH_LIST.GAME_DETAIL}/:gameId`,
    element: <Pages.cbb.GamePlays user={user} />,
    errorElement: <ErrorPage />,
    loader: ({ params }) => {
      return (params);
    },
  },
  {
    path: `/cbb${PATH_LIST.LIVE}`,
    element: <Pages.cbb.LiveGame />,
    errorElement: <ErrorPage />,
    loader: ({ params }) => {
      return (params);
    },
  },
  {
    path: `/cbb${PATH_LIST.BOX}/:gameId`,
    element: <Pages.cbb.Box />,
    errorElement: <ErrorPage />,
    loader: ({ params }) => {
      return (params);
    },
  },
  {
    path: `/cbb${PATH_LIST.SOCIAL_BETS}`,
    element: <BetsWithAuthNBA />,
    errorElement: <ErrorPage />,
    loader: ({ params }) => {
      return (params);
    },
  },


  {
    path: "/nba",
    element: <RenderPage user={user}  />,
    errorElement: <ErrorPage />,
    children: ROUTES.NBA,
    loader: loader,
  },

  
  {
    path: `nba/${PATH_LIST.HOME}`,
    element: <Pages.nba.Home user={user}/>,
    errorElement: <ErrorPage />,
  },
  {
    path: `/nba${PATH_LIST.SOCIAL_BETS}`,
    element: <BetsWithAuthNBA />,
    errorElement: <ErrorPage />,
    loader: ({ params }) => {
      return (params);
    },
  },
  {
    path: `/nba${PATH_LIST.LIVE}`,
    element: <Pages.nba.LiveGame />,
    errorElement: <ErrorPage />,
    loader: ({ params }) => {
      return (params);
    },
  },
  {
    path: `/nba${PATH_LIST.PLAYER_DETAIL}/:playerId`,
    element: <Pages.nba.Player user={user}/>,
    errorElement: <ErrorPage />,
    loader: ({ params }) => {
      return (params);
    },
  },
  {
    path: `/nba${PATH_LIST.TEAM_DETAIL}/:teamId`,
    element: <Pages.nba.TeamDetail user={user}/>,
    errorElement: <ErrorPage />,
    loader: ({ params }) => {
      return (params);
    },
  },
  {
    path: `/nba${PATH_LIST.GAME_DETAIL}/:gameId`,
    element: <Pages.nba.GamePlays user={user} />,
    errorElement: <ErrorPage />,
    loader: ({ params }) => {
      return (params);
    },
  },
  {
    path: `/nba${PATH_LIST.BOX}/:gameId`,
    element: <Pages.nba.Box />,
    errorElement: <ErrorPage />,
    loader: ({ params }) => {
      return (params);
    },
  },

]);

function App({ signOut, user }) {
  return (
    // <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router(user, signOut)}/>
      </Provider>
    // </React.StrictMode>
  );
}

export default App;
