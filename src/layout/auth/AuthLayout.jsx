
import Login from "../../pages/auth/Login";
import { Routes, Route, Navigate } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div
      dir="rtl"
      className="min-h-screen w-full bg-gray-50 flex items-center justify-center px-4 py-8"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-9 shadow-xl shadow-gray-200/60 border border-gray-100">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default AuthLayout;
