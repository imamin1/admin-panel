import DashboardCards from "../../../pages/Dashboard/DashboardCards";
import LowStockProductsTable from "../../../pages/Dashboard/LowStockProductsTable";
import ProductSalesChart from "../../../pages/Dashboard/ProductSalesChart";

export default function Content({ children }) {
  return (
    <main dir="rtl" className="min-w-0 p-4 sm:p-6 lg:p-8">
      {children || (
        <div id="dashboard_section" className="space-y-8">
          <DashboardCards />
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <LowStockProductsTable />
            <ProductSalesChart />
          </section>
        </div>
      )}
    </main>
  );
}
