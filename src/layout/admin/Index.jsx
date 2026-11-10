
import { useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import Content from "./content/Content";
import Category from "../../pages/Category/Category";
import Product from "../../pages/Product/Product";

export default function Index({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard_section");

  const pageContent =
    children ??
    (activeSection === "manage_product_category" ? (
      <Category />
    ) : activeSection === "manage_product_section" ? (
      <Product />
    ) : undefined);

  return (
    <div
      dir="rtl"
      className="flex h-dvh w-full overflow-hidden bg-[#f6f5f1]"
    >
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="بستن منو"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-gray-950/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNavigate={setActiveSection}
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="min-h-0 flex-1 overflow-y-auto">
          <Content>{pageContent}</Content>
        </div>
      </div>
    </div>
  );
}
