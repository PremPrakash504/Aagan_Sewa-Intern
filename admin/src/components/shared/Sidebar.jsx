import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSignoutMutation } from "../../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/features/authState";

const Sidebar = () => {
  const [signout] = useSignoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuItems = [
      {name: "Dashboard", path: "/admin/dashboard" },
      { name: "Province", path: "/admin/province" },
      { name: "District", path: "/admin/district" },
      { name: "Branch ", path: "/admin/branch" },
      {name:"Managers", path:"/admin/manager" },
      { name: "Profile", path: "/admin/profile" },
    
    ];
  const handleSignOut = async () => {
    
    try {
      const res = await signout().unwrap();
      toast.success(res.message || "Signout Succesfully");
      dispatch(clearUser());
      return navigate("/");
    } catch (error) {
      toast.error(error.data?.message || "Signout Failed");
    }
  };
  return (
  <div className="w-64 bg-gray-800 text-white h-screen p-4 flex flex-col">
    
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>

    {/* Logout button ekdam bottom ma */}
    <div className="mt-auto">
      <button
        onClick={handleSignOut}
        className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
      >
        Logout
      </button>
    </div>
  </div>
);

};

export default Sidebar;
