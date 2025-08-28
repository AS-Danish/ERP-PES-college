import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import PrivateRoute from "./lib/PrivateRoutes";
import { AuthProvider } from "./context/authContext";
import { useAuth } from "./context/authContext";

import Login from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./layout/DashboardLayout";
import StudentDashboard from "./pages/studentDashboard";
import FacultyDashboard from "./pages/facultyDashboard";
import HodDashboard from "./pages/hodDashboard";
import AdminDashboard from "./pages/adminDashboard";
import AdmissionDashboard from "./pages/AdmissionDashboard";

const Placeholder = ({ title }) => (
  <div className="space-y-2">
    <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
    <p className="text-gray-600">Content coming soon.</p>
  </div>
);

function LoginOrRedirect() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Login />;
  if (user.role === "admin") return <Navigate to="/admin/dashboard" replace />;
  if (user.role === "faculty") return <Navigate to="/faculty/dashboard" replace />;
  if (user.role === "hod") return <Navigate to="/hod/dashboard" replace />;
  return <Navigate to="/student/dashboard" replace />;
}

const router = createBrowserRouter([
  { path: "/", element: <LoginOrRedirect /> },
  { path: "/register", element: <RegisterPage /> },
  {
    element: <PrivateRoute allowedRoles={["admin", "student", "faculty", "hod"]}><DashboardLayout /></PrivateRoute>,
    children: [
      { path: "/admin/dashboard", element: <AdminDashboard /> },
      { path: "/admin/admissions/dashboard", element: <AdmissionDashboard/> },
      { path: "/admin/users", element: <Placeholder title="Manage Users" /> },
      { path: "/admin/departments", element: <Placeholder title="Departments" /> },
      { path: "/admin/programs", element: <Placeholder title="Programs" /> },
      { path: "/admin/naac/ssr", element: <Placeholder title="NAAC SSR Overview" /> },
      { path: "/admin/naac/criteria-1", element: <Placeholder title="NAAC Criteria 1 - Curricular Aspects" /> },
      { path: "/admin/naac/criteria-2", element: <Placeholder title="NAAC Criteria 2 - Teaching-Learning" /> },
      { path: "/admin/naac/criteria-3", element: <Placeholder title="NAAC Criteria 3 - Research & Extension" /> },
      { path: "/admin/naac/criteria-4", element: <Placeholder title="NAAC Criteria 4 - Infrastructure" /> },
      { path: "/admin/naac/criteria-5", element: <Placeholder title="NAAC Criteria 5 - Student Support" /> },
      { path: "/admin/naac/criteria-6", element: <Placeholder title="NAAC Criteria 6 - Governance" /> },
      { path: "/admin/naac/criteria-7", element: <Placeholder title="NAAC Criteria 7 - Best Practices" /> },
      { path: "/admin/reports/analytics", element: <Placeholder title="Reports - Analytics" /> },
      { path: "/admin/reports/exports", element: <Placeholder title="Reports - Exports" /> },
      { path: "/student/dashboard", element: <StudentDashboard /> },
      { path: "/faculty/dashboard", element: <FacultyDashboard /> },
      { path: "/hod/dashboard", element: <HodDashboard /> },
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
