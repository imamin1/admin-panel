
import { useEffect, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import Content from "./content/Content";
import Category from "../../pages/Category/Category";
import Product from "../../pages/Product/Product";
import Color from "../../pages/Color/Color";
import Guarantee from "../../pages/Guarantee/Guarantee";
import Brand from "../../pages/Brand/Brand";
import Discount from "../../pages/Discount/Discount";
import Cart from "../../pages/Cart/Cart";
import Order from "../../pages/Order/Order";
import Delivery from "../../pages/Delivery/Delivery";
import User from "../../pages/User/User";
import Role from "../../pages/Role/Role";
import Permission from "../../pages/Permission/Permission";
import Comment from "../../pages/Comment/Comment";
import Question from "../../pages/Question/Question";

export default function Index({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard_section");
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem("admin-panel-theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("admin-panel-theme", theme);
  }, [theme]);

  const pageContent =
    children ??
    (activeSection === "manage_product_category" ? (
      <Category />
    ) : activeSection === "manage_product_section" ? (
      <Product />
    ) : activeSection === "manage_guarantee_section" ? (
      <Guarantee />
    ) : activeSection === "manage_brand_section" ? (
      <Brand />
    ) : activeSection === "manage_color_section" ? (
      <Color />
    ) : activeSection === "manage_discount_section" ? (
      <Discount />
    ) : activeSection === "manage_cart_section" ? (
      <Cart />
    ) : activeSection === "manage_orders_section" ? (
      <Order />
    ) : activeSection === "manage_deliveries_section" ? (
      <Delivery />
    ) : activeSection === "manage_user_section" ? (
      <User />
    ) : activeSection === "manage_role_section" ? (
      <Role />
    ) : activeSection === "manage_permission_section" ? (
      <Permission />
    ) : activeSection === "manage_comments_section" ? (
      <Comment />
    ) : activeSection === "manage_question_section" ? (
      <Question />
    ) : undefined);

  return (
    <div
      dir="rtl"
      className="flex h-dvh w-full overflow-hidden bg-app-background text-app-text transition-colors"
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
        <Navbar
          onMenuClick={() => setIsSidebarOpen(true)}
          theme={theme}
          onThemeToggle={() =>
            setTheme((current) => (current === "dark" ? "light" : "dark"))
          }
        />

        <div className="min-h-0 flex-1 overflow-y-auto">
          <Content>{pageContent}</Content>
        </div>
      </div>
    </div>
  );
}
