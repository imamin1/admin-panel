import { lazy, Suspense, useEffect, useState } from "react";
import api, { getApiErrorMessage } from "../../../api";
import DashboardCards from "../../../pages/Dashboard/DashboardCards";
import LowStockProductsTable from "../../../pages/Dashboard/LowStockProductsTable";

const ProductSalesChart = lazy(() => import("../../../pages/Dashboard/ProductSalesChart"));

export default function Content({ children }) {
  const [dashboard, setDashboard] = useState(null);
  const [dashboardError, setDashboardError] = useState("");

  useEffect(() => {
    if (children) return undefined;
    const controller = new AbortController();
    api.get("/admin/dashboard", { signal: controller.signal })
      .then((response) => setDashboard(response.data.data))
      .catch((error) => {
        if (error.name !== "CanceledError") {
          setDashboardError(getApiErrorMessage(error));
        }
      });

    return () => controller.abort();
  }, [children]);

  return (
    <main
      dir="rtl"
      className="theme-content min-w-0 p-4 text-app-text sm:p-6 lg:p-8"
    >
      {children ? (
        <Suspense fallback={<p role="status" className="p-8 text-center text-sm text-brand-dark/70">در حال بارگذاری بخش...</p>}>
          {children}
        </Suspense>
      ) : (
        <div id="dashboard_section" className="space-y-8">
          {dashboardError && (
            <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {dashboardError}
            </p>
          )}
          <DashboardCards data={dashboard} />
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <LowStockProductsTable products={dashboard?.lowStockProducts ?? []} loading={!dashboard && !dashboardError} />
            <ProductSalesChart revenue={dashboard?.revenue} loading={!dashboard && !dashboardError} />
          </section>
        </div>
      )}
    </main>
  );
}
