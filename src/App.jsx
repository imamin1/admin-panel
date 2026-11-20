// import Index from "./layout/admin/AdminLayout";
import AuthLayout from "./layout/auth/AuthLayout";
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <>
  {/* <Index /> */}
    <AuthLayout/>
    <SpeedInsights />
    </>
);
}

export default App;
