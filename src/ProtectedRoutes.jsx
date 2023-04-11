import { Navigate, Outlet } from "react-router";

const useAuth = () => {
  return localStorage.getItem("token") ? true : false;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
