import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import PrivateRoute from "./lib/PrivateRoutes";
import { AuthProvider } from "./context/authContext";
import { useAuth } from "./context/authContext";

import Login from "./pages/LoginPage";
import samplePage from "./pages/samplePage";
import AdminPage from "./pages/adminPage";

function LoginOrRedirect() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Login />;
  if (user.role === "admin") return <Navigate to="/admin" replace />;
  return <Navigate to="/dashboard" replace />;
}

const router = createBrowserRouter([
  { path: "/", element: <LoginOrRedirect /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute allowedRoles={["admin", "student", "faculty", "hod"]}>
        <samplePage />
      </PrivateRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminPage />
      </PrivateRoute>
    ),
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
