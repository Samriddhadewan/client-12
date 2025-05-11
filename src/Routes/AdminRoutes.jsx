import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";
import Spinner from "../Components/Spinner/Spinner";

const AdminRoutes = ({ children }) => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <Spinner></Spinner>;
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoutes;
