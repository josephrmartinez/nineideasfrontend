import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './contexts/authContext';
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './error-page.jsx'
import Root from './routes/root';
import AddList from './routes/addList';
import LogIn from './routes/logIn';
import SignUp from './routes/signUp';
import ViewList from './routes/viewList';
import ViewUser from './routes/viewUser';
import Lists from './routes/lists';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <AddList />,
        index: true,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/lists",
        element: <Lists />,
      },
      {
        path: "/lists/:listId",
        element: <ViewList />,
      },
      {
        path: "/user/:userId",
        element: <ViewUser />,
      },
    ],
  },
]);


  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      {/* <AuthProvider> */}
        <RouterProvider router={router} />
      {/* </AuthProvider> */}
    </React.StrictMode>
  )
;