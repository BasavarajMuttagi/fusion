import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AllFiles from "../pages/AllFiles";
import Starred from "../pages/Starred";
import Settings from "../pages/Settings";
import HelpCenter from "../pages/HelpCenter";
import Private from "./Private";
import AuthLayout from "../layouts/AuthLayout";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import Public from "./Public";
import HandleRedirect from "../components/HandleRedirect";
import Profile from "../pages/Profile";

const routes = createBrowserRouter([
  {
    element: (
      <AuthLayout>
        <Public />
      </AuthLayout>
    ),
    children: [
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/redirect",
        element: <HandleRedirect />,
      },
    ],
  },
  {
    element: (
      <MainLayout>
        <Private />
      </MainLayout>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allfiles",
        element: <AllFiles />,
      },
      {
        path: "/starred",
        element: <Starred />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/help",
        element: <HelpCenter />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <AuthLayout>
        <div className="text-white font-bold text-3xl">
          404 - page not found
        </div>
      </AuthLayout>
    ),
  },
]);

export default routes;
