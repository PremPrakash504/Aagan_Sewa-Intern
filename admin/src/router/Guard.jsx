import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useVerifyTokenQuery } from "../redux/features/authSlice";
import { useEffect } from "react";
import { clearUser } from "../redux/features/authState";

const Guard = ({ children }) => {
  const isAuth = useSelector((state) => state?.user?.isAuth);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useVerifyTokenQuery();

  useEffect(() => {
    if (error) {
      dispatch(clearUser());
    } else if (data?.user?.exp) {
      const isExpired = data.user.exp * 1000 < Date.now();
      if (isExpired) {
        dispatch(clearUser());
      }
    }
  }, [data, error, dispatch]);

  return isAuth ? children : <Navigate to="/" />;
};

export default Guard;
