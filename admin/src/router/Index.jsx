import Login from "../components/Login";
import AdminLayout from "../layout/AdminLayout";
import { adminRoutes } from "./AdminRoutes";
import { createBrowserRouter} from "react-router-dom";
import Guard from "./Guard";
const NotFound =() => <div>NotFound</div>
export const router = createBrowserRouter([
    {
        path:"/admin",
        element:(
        <Guard>
        <AdminLayout/>
        </Guard>),
        children:adminRoutes,
    },
    {
        path:"/",
        element:<Login/>
    },
    {
        path:"*",
        element:<NotFound/>,
    },
])