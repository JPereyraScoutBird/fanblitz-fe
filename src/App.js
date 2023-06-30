import './App.css';
import Home from './pages/Home';
import Forecasts from './pages/Forecasts';
import News from './pages/News';
import Player from './pages/Player';
import SocialBets from './pages/SocialBets';
import Stats from './pages/Stats';
import Team from './pages/Team';
import Tutorial from './pages/Tutorial';
import Error from './pages/Error';
import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Router, 
  Routes, 
  Route
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    // children: route_list,
    // loader: loader,
  },
  {
    path: "/News",
    element: <News />,
  },
  {
    path: "/Player",
    element: <Player />,
  },
  {
    path: "/Team",
    element: <Team />,
  },
  {
    path: "/News",
    element: <News />,
  },
  {
    path: "/Forecasts",
    element: <Forecasts />,
  },
  {
    path: "/SocialBets",
    element: <SocialBets />,
  },
  {
    path: "/Stats",
    element: <Stats />,
  },
  {
    path: "/Tutorial",
    element: <Tutorial />,
  },
]);


function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
