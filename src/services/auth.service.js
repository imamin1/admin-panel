import api, {
  createApiError,
  clearAuthToken as clearStoredAuthToken,
  getAuthToken as getStoredAuthToken,
  setAuthToken,
} from "../api";

export const getAuthToken = getStoredAuthToken;

export const clearAuthToken = clearStoredAuthToken;

export const signIn = async ({ phone, password, remember }) => {
  const response = await api.post("/auth/login", {
    phone,
    password,
    remember: remember ? 1 : 0,
  });

  if (
    response.status !== 200 ||
    typeof response.data?.token !== "string" ||
    !response.data.token
  ) {
    throw createApiError(response, { context: "login" });
  }

  setAuthToken(response.data.token, Boolean(remember));
  return response.data;
};

export const fetchCurrentUser = async () => {
  const response = await api.get("/auth/user");
  if (!Array.isArray(response.data?.roles)) {
    const error = createApiError(response);
    error.code = "INVALID_AUTH_RESPONSE";
    if (response.status === 200) {
      error.message = "ساختار پاسخ اطلاعات کاربر از سرور معتبر نیست.";
    }
    throw error;
  }

  return response.data;
};

export const signOut = async () => {
  if (!getAuthToken()) return;

  try {
    await api.get("/auth/logout");
  } finally {
    clearAuthToken();
  }
};

export const isInvalidSessionError = (error) =>
  error.response?.status === 401 || error.code === "INVALID_AUTH_RESPONSE";

export const hasDashboardAccess = (user) =>
  user?.roles?.some(
    (role) =>
      role?.title === "admin" ||
      (Array.isArray(role?.permissions) && role.permissions.length > 0)
  ) ?? false;
