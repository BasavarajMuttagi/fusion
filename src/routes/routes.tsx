import { createBrowserRouter } from "react-router-dom";
import NavBar from "../components/NavBar";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
  },
]);

export default routes;
