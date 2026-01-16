import { createBrowserRouter } from "react-router-dom";
import { adminRoutes } from "./AdminRoutes";
import { publicRoutes } from "./PublicRoutes";

import PublicLayout from "../layout/PublicLayout";
import Login from "../pages/Login";
import AdminLayout from "../layout/AdminLayout";

const NotFound = () => <div>Not Found</div>;
export const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: adminRoutes,
  },
  {
    path: "",
    element: <PublicLayout />,
    children: publicRoutes,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);
