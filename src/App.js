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

// const router = createBrowserRouter([...ROUTES]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RenderPage />,
    errorElement: <ErrorPage />,
    children: ROUTES,
    loader: loader,
  },
  {
    path: `${PATH_LIST.PLAYER_DETAIL}/:playerId`,
    element: <Pages.Player/>,
    // errorElement: <ErrorPage />,
    // children: ROUTES,
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
