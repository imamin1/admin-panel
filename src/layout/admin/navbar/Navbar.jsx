
import {
  Menu,
  Search,
  Bell,
  UserRound,
} from "lucide-react";

export default function Navbar({ onMenuClick }) {
  return (
    <header
      dir="rtl"
      className="z-30 flex h-20 shrink-0 items-center justify-between
        border-b border-white/70 bg-white/65 px-4 backdrop-blur-xl sm:px-6 lg:px-8"
    >
      {/* Right Side */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="باز کردن منو"
          className="rounded-xl p-2 text-gray-600 transition
          hover:bg-brand-surface/60 hover:text-brand-dark lg:hidden"
        >
          <Menu size={23} />
        </button>

        <div>
          <h2 className="text-base font-bold text-gray-950 sm:text-lg">
            خوش اومدی 👋
          </h2>
          <p className="hidden text-xs text-gray-500 sm:block">
            وضعیت فعالیت‌های خودت رو بررسی کن
          </p>
        </div>
      </div>

      {/* Left Side */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button type="button" className="hidden items-center gap-2 rounded-xl
          border border-gray-200/80 bg-white/60 px-3 py-2 text-sm
          text-gray-500 transition hover:border-brand hover:bg-white sm:flex">
          <Search size={17} />
          جستجو...
        </button>

        <button type="button" aria-label="اعلان‌ها" className="relative rounded-xl p-2
          text-gray-500 transition hover:bg-brand-surface/60 hover:text-brand-dark">
          <Bell size={21} />
          <span className="absolute right-1 top-1
            h-2 w-2 rounded-full bg-brand ring-2 ring-white" />
        </button>

        <button type="button" aria-label="حساب کاربری" className="flex h-10 w-10 items-center
          justify-center rounded-full border border-brand/30 bg-brand-surface/70
          text-brand-dark transition hover:bg-brand-surface">
          <UserRound size={20} />
        </button>
      </div>
    </header>
  );
}
