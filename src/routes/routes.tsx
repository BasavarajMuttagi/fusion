import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Public from "./Public";
import AllFiles from "../pages/AllFiles";
import Starred from "../pages/Starred";
import Settings from "../pages/Settings";
import HelpCenter from "../pages/HelpCenter";

const routes = createBrowserRouter([
  {
    element: (
      <MainLayout>
        <Public />
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
    ],
  },
]);

export default routes;
