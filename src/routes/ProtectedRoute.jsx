import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getApiErrorMessage } from "../api";
import { useAuth } from "../contexts/auth-context";
import { hasDashboardAccess } from "../services/auth.service";

const AccessMessage = ({ title, children, action }) => (
  <div
    dir="rtl"
    className="flex min-h-screen items-center justify-center bg-gray-50 px-4"
  >
    <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-xl shadow-gray-200/60">
      <h1 className="mb-3 text-xl font-bold text-gray-900">{title}</h1>
      <p className="text-sm leading-7 text-gray-600">{children}</p>
      {action}
    </div>
  </div>
);

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { status, user, error, logout, refreshUser } = useAuth();

  if (status === "loading") {
    return (
      <AccessMessage title="در حال بررسی ورود">
        لطفا چند لحظه صبر کنید.
      </AccessMessage>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (status === "error") {
    return (
      <AccessMessage
        title="بررسی دسترسی ناموفق بود"
        action={
          <button
            type="button"
            onClick={() => void refreshUser()}
            className="mt-5 rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-lime-700"
          >
            تلاش دوباره
          </button>
        }
      >
        {error || "ارتباط با سرور برقرار نشد."}
      </AccessMessage>
    );
  }

  if (!hasDashboardAccess(user)) {
    const handleLogout = async () => {
      try {
        await logout();
        navigate("/auth/login", { replace: true });
      } catch (logoutError) {
        navigate("/auth/login", {
          replace: true,
          state: { notice: getApiErrorMessage(logoutError) },
        });
      }
    };

    return (
      <AccessMessage
        title="دسترسی به داشبورد مجاز نیست"
        action={
          <button
            type="button"
            onClick={() => void handleLogout()}
            className="mt-5 rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-lime-700"
          >
            خروج
          </button>
        }
      >
        حساب کاربری شما مجوز ورود به پنل مدیریت را ندارد.
      </AccessMessage>
    );
  }

  return children;
}
