import axios from "axios";

export const AUTH_TOKEN_KEY = "loginToken";
export const AUTH_UNAUTHORIZED_EVENT = "auth:unauthorized";

export const getAuthToken = () =>
  window.localStorage.getItem(AUTH_TOKEN_KEY) ??
  window.sessionStorage.getItem(AUTH_TOKEN_KEY);

export const setAuthToken = (token, remember = false) => {
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  window.sessionStorage.removeItem(AUTH_TOKEN_KEY);

  const storage = remember ? window.localStorage : window.sessionStorage;
  storage.setItem(AUTH_TOKEN_KEY, token);
};

export const clearAuthToken = () => {
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
};

const apiOrigin = (
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"
).replace(/\/+$/, "");

const api = axios.create({
  baseURL: `${apiOrigin}/api`,
  timeout: 15000,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthToken();
      window.dispatchEvent(new Event(AUTH_UNAUTHORIZED_EVENT));
    }

    return Promise.reject(error);
  }
);

const getValidationMessage = (data) => {
  if (!data || typeof data !== "object") return undefined;
  const errors = data.errors ?? data;

  return Object.values(errors)
    .flatMap((value) => (Array.isArray(value) ? value : [value]))
    .find((message) => typeof message === "string");
};

export const getApiErrorMessage = (error, { context } = {}) => {
  const status = error?.response?.status ?? error?.status;
  const data = error?.response?.data ?? error?.data;

  if (status === 401) {
    return context === "login"
      ? "شماره موبایل یا رمز عبور صحیح نیست."
      : "نشست شما منقضی یا نامعتبر است؛ دوباره وارد شوید.";
  }
  if (status === 403) return "شما مجوز دسترسی به این بخش را ندارید.";
  if (status === 404) return "منبع درخواستی پیدا نشد.";
  if (status === 422 || status === 202) {
    return (
      getValidationMessage(data) ??
      data?.message ??
      "اطلاعات واردشده معتبر نیست."
    );
  }
  if (status === 203) {
    return data?.message ?? "درخواست از طرف سرور پذیرفته نشد.";
  }
  if (status >= 500) return "خطای داخلی سرور رخ داد. لطفا بعدا تلاش کنید.";
  if (!error?.response) {
    return "ارتباط با سرور برقرار نشد. آدرس API و وضعیت سرور را بررسی کنید.";
  }

  return data?.message ?? "در انجام درخواست خطایی رخ داد.";
};

export const createApiError = (response, options) => {
  const error = new Error(getApiErrorMessage({ response }, options));
  error.response = response;
  return error;
};

export default api;
