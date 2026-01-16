import BranchServices from "../pages/BranchServices";
import Home from "../pages/Home";

import Login from "../pages/Login";

export const publicRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "services/:places",
    element: <BranchServices />,
  },
];
