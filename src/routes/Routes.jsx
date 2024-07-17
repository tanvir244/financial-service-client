import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import AuthProvider from "../provider/AuthProvider";

const routes = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
            path: '/register',
            element: <Register />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/check',
            element: <AuthProvider />
        }
      ]
    },
  ]);

export default routes;