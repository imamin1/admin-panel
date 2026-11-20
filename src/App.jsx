import { useLocation } from "react-router-dom";
import AdminLayout from "./layout/admin/AdminLayout";
import AuthLayout from "./layout/auth/AuthLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const location = useLocation();
  return location.pathname.startsWith("/auth") ? (
    <AuthLayout />
  ) : (
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  );
}

export default App;
