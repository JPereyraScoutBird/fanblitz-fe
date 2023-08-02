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

// const router = createBrowserRouter([...ROUTES[count]]);

const router = createBrowserRouter([
  {
    path: `${PATH_LIST.HOME}`,
    element: <Pages.mlb.Home/>,
    errorElement: <ErrorPage />,
  },
  {
    path: `mlb/${PATH_LIST.HOME}`,
    element: <Pages.mlb.Home/>,
    errorElement: <ErrorPage />,
  },
  {
    path: `tennis/${PATH_LIST.HOME}`,
    element: <Pages.tennis.Home/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <RenderPage />,
    errorElement: <ErrorPage />,
    children: ROUTES.MLB,
    loader: loader,
  },
  {
    path: "/mlb/",
    element: <RenderPage />,
    errorElement: <ErrorPage />,
    children: ROUTES.MLB,
    loader: loader,
  },
  {
    path: "/tennis/",
    element: <RenderPage />,
    errorElement: <ErrorPage />,
    children: ROUTES.TENNIS,
    loader: loader,
  },
  {
    path: `mlb/${PATH_LIST.PLAYER_DETAIL}/:playerId`,
    element: <Pages.mlb.Player/>,
    errorElement: <ErrorPage />,
    loader: ({ params }) => {
      return (params);
    },
  },
  {
    path: `${PATH_LIST.PLAYER_DETAIL_TENNIS}/:playerId`,
    element: <Pages.PlayerTennis/>,
    errorElement: <ErrorPage />,
    loader: ({ params }) => {
      return (params);
    },
  },
  {
    path: `tennis/${PATH_LIST.PLAYER_DETAIL}/:playerId`,
    element: <Pages.tennis.Player/>,
    errorElement: <ErrorPage />,
    loader: ({ params }) => {
      return (params);
    },
  },
  {
    path: `tennis/${PATH_LIST.TEAM_DETAIL}/:teamId`,
    element: <Pages.tennis.TeamDetail/>,
    errorElement: <ErrorPage />,
    loader: ({ params }) => {
      return (params);
    },
  },
]);


function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
