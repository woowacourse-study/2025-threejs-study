import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
]);
