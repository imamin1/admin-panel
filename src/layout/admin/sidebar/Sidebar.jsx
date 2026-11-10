import { useState } from "react";
import {
  LayoutDashboard,
  Store,
  ShoppingBasket,
  ShoppingCart,
  Truck,
  Users,
  UserRound,
  ShieldCheck,
  MessageCircle,
  HelpCircle,
  Package,
  Tags,
  Palette,
  Percent,
  Copyright,
  Leaf,
  ChevronRight,
} from "lucide-react";

export default function Sidebar({ isOpen, onClose, onNavigate }) {
  const [active, setActive] = useState("dashboard_section");

  const groups = [
    {
      title: "فروشگاه",
      items: [
        {
          id: "manage_product_category",
          title: "مدیریت گروه محصول",
          icon: Tags,
        },
        { id: "manage_product_section", title: "مدیریت محصول", icon: Package },
        { id: "manage_brand_section", title: "مدیریت برندها", icon: Copyright },
        {
          id: "manage_guarantee_section",
          title: "مدیریت گارانتی‌ها",
          icon: Store,
        },
        { id: "manage_color_section", title: "مدیریت رنگ‌ها", icon: Palette },
        {
          id: "manage_discount_section",
          title: "مدیریت تخفیف‌ها",
          icon: Percent,
        },
      ],
    },
    {
      title: "سفارشات و سبد",
      items: [
        {
          id: "manage_cart_section",
          title: "مدیریت سبدها",
          icon: ShoppingBasket,
        },
        {
          id: "manage_orders_section",
          title: "مدیریت سفارشات",
          icon: ShoppingCart,
        },
        {
          id: "manage_deliveries_section",
          title: "مدیریت نحوه ارسال",
          icon: Truck,
        },
      ],
    },
    {
      title: "کاربران و همکاران",
      items: [
        { id: "manage_user_section", title: "مشاهده کاربران", icon: Users },
        { id: "manage_role_section", title: "نقش‌ها", icon: UserRound },
        { id: "manage_permission_section", title: "مجوزها", icon: ShieldCheck },
      ],
    },
    {
      title: "ارتباطات",
      items: [
        { id: "manage_question_section", title: "سوال‌ها", icon: HelpCircle },
        { id: "manage_comments_section", title: "نظرات", icon: MessageCircle },
      ],
    },
  ];

  const menuItem = (id, title, Icon) => (
    <button
      key={id}
      type="button"
      onClick={() => {
        setActive(id);
        onNavigate(id);
        onClose();
      }}
      className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200
        ${
          active === id
            ? "bg-white/10 text-white"
            : "text-white/65 hover:bg-white/[0.06] hover:text-white"
        }`}
    >
      <Icon
        size={19}
        strokeWidth={active === id ? 2.4 : 1.8}
        className={`shrink-0 transition-colors ${
          active === id ? "text-brand" : "text-white/50 group-hover:text-brand-surface"
        }`}
      />

      <span className="whitespace-nowrap">{title}</span>
      {active === id && (
        <span className="mr-auto h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
      )}
    </button>
  );

  return (
    <aside
      dir="rtl"
      className={`fixed inset-y-0 right-0 z-50 flex h-dvh shrink-0 flex-col overflow-hidden
        border-l border-white/10 bg-brand-dark text-white shadow-[0_8px_40px_-16px_rgba(20,35,27,0.35)]
        transition-transform duration-200 ease-in-out lg:static lg:z-auto lg:translate-x-0
        ${isOpen ? "translate-x-0" : "translate-x-full"} w-64`}
    >
      <div className="flex items-center justify-between px-4 pb-4 pt-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-brand text-brand-dark shadow-sm shadow-black/20">
            <Leaf size={21} strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold tracking-tight">پنل مدیریت</p>
            <p className="mt-0.5 truncate text-[11px] text-white/50">فروشگاه آنلاین</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="بستن منو"
          className="rounded-xl p-2 text-white/60 transition hover:bg-white/10 hover:text-white lg:hidden"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="mx-4 h-px bg-white/10" />

      <div className="mx-3 mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-3">
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-brand-surface ring-1 ring-white/10">
          <UserRound size={20} />
          <span className="absolute bottom-0 left-0 h-2.5 w-2.5 rounded-full border-2 border-brand-dark bg-brand" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">محمد امین شیرزاد</p>
          <p className="mt-0.5 truncate text-xs text-white/50">مدیر سیستم</p>
        </div>
      </div>

      <nav className="sidebar-scroll flex-1 overflow-y-auto px-3 pb-4 pt-5">
        <div className="space-y-1">
          <p className="mb-2 px-3 text-[10px] font-bold tracking-widest text-white/35">
            منوی اصلی
          </p>
          {menuItem("dashboard_section", "داشبورد", LayoutDashboard)}

          {groups.map((group) => (
            <div key={group.title} className="pt-5">
              <div className="mb-2 px-3 text-[10px] font-bold tracking-widest text-white/35">
                {group.title}
              </div>

              <div className="space-y-1">
                {group.items.map((item) =>
                  menuItem(item.id, item.title, item.icon),
                )}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}
