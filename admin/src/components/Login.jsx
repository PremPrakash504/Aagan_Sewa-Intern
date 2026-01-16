
import Input from "./shared/Input";
import { useLoginMutation } from "../redux/features/authSlice";
import { setUser } from "../redux/features/authState";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";


const Login = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [Login] = useLoginMutation();
  const isAuth = useSelector((state) => state.user.isAuth);
  const [formData, setData] = useState({
    email: "",
    password: "",
  });
  useEffect(() =>{
    if(isAuth){
      Navigate("/admin/dashboard");
    }
  })
  const handleClick = (e) => {
    const { id, value } = e.target;
    setData({
      ...formData,
      [id]: value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await Login(formData).unwrap();

      dispatch(setUser(data.user));
      Navigate("/admin/dashboard");
      toast.success(data.message);
    
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Login Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">LOGIN</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email:"
            type="text"
            placeholder="Enter the email"
            id="email"
            value={formData.email}
            onChange={handleClick}
            required
          />

          <Input
            label="Password:"
            type="password"
            placeholder="Enter the password"
            id="password"
            value={formData.password}
            onChange={handleClick}
            required
          />
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
