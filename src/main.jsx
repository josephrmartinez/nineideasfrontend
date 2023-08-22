import React from 'react'
import { Suspense } from 'react';
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
import ViewList, {loader as listLoader} from './routes/viewList';
import ViewUser, {loader as userLoader} from './routes/viewUser';
import ViewCurrentUser from './routes/viewCurrentUser';
import EditCurrentUser from './routes/editCurrentUser';
import Lists, {loader as listsLoader} from './routes/lists';
import {action as deleteListAction} from './routes/deleteList';
// import CurrentUserDataLoader from './utils/CurrentUserDataLoader';


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
        loader: listsLoader,
      },
      {
        path: "/lists/:listId",
        element: <ViewList />,
        loader: listLoader,
      },
      {
        path: "/lists/:listId/delete",
        action: deleteListAction,
      },
      {
        path: "/user/:userId",
        element: <ViewUser />,
        loader: userLoader
      },
      {
        path: "/user/current",
        element: <ViewCurrentUser/>
      },
      {
        path: "/user/current/edit",
        element: <EditCurrentUser/>
      },
    ],
  },
]);


  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <AuthProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </AuthProvider>
    </React.StrictMode>
  )
;