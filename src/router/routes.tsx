import { createBrowserRouter } from "react-router-dom";
import Test from "../pages/Main";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Test />,
  },
]);
