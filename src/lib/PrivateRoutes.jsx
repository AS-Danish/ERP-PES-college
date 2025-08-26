import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function PrivateRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // wait for AuthContext init

  if (!user) return <Navigate to="/" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" replace />;

  return children;
}
