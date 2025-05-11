import { Navigate, useLocation} from "react-router-dom";
import Spinner from "../Components/Spinner/Spinner";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const location = useLocation();

  const { user, loading } = useAuth();
  if (loading) {
    return <Spinner></Spinner>
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{from:location}} replace></Navigate>;
};

export default PrivateRoute;