import BranchManagement from "../pages/Branch/BranchManagement";
import Dashboard from "../pages/dashboard/Dashboard";
import DistrictManagement from "../pages/districts/DistrictManagement";
import ManagerManagement from "../pages/manager/ManagerManagement";
import ProfileManagement from "../pages/profile/ProfileManagement";
import ProvienceManagement from "../pages/provience/ProvienceManagement";


export const adminRoutes = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "province",
    element: <ProvienceManagement />,
  },
  {
    path: "district",
    element: <DistrictManagement />,
  },
  {
    path: "Branch",
    element: <BranchManagement />,
  },
 
{
    path: "profile",
    element: <ProfileManagement />,
},
{
  path:"manager",
  element:<ManagerManagement/>,
},

];
