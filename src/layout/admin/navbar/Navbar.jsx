import { Bell, Menu, Moon, Search, Sun, UserRound } from "lucide-react";

export default function Navbar({ onMenuClick, theme, onThemeToggle }) {
  const isDark = theme === "dark";

  return (
    <header
      dir="rtl"
      className="z-30 flex h-20 shrink-0 items-center justify-between border-b border-app-border bg-app-panel/80 px-4 text-app-text backdrop-blur-xl transition-colors sm:px-6 lg:px-8"
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="باز کردن منو"
          className="rounded-xl p-2 text-app-muted transition hover:bg-brand-surface/60 hover:text-app-text lg:hidden"
        >
          <Menu size={23} />
        </button>

        <div>
          <h2 className="text-base font-bold text-app-text sm:text-lg">
            خوش اومدی 👋
          </h2>
          <p className="hidden text-xs text-app-muted sm:block">
            وضعیت فعالیت‌های خودت رو بررسی کن
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          aria-label={isDark ? "فعال‌کردن حالت روشن" : "فعال‌کردن حالت تاریک"}
          aria-pressed={isDark}
          title={isDark ? "حالت روشن" : "حالت تاریک"}
          onClick={onThemeToggle}
          className="rounded-xl p-2 text-app-muted transition hover:bg-brand-surface/60 hover:text-app-text"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button
          type="button"
          className="hidden items-center gap-2 rounded-xl border border-app-border bg-app-panel/60 px-3 py-2 text-sm text-app-muted transition hover:border-brand hover:bg-app-panel sm:flex"
        >
          <Search size={17} />
          جستجو...
        </button>

        <button
          type="button"
          aria-label="اعلان‌ها"
          className="relative rounded-xl p-2 text-app-muted transition hover:bg-brand-surface/60 hover:text-app-text"
        >
          <Bell size={21} />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-brand ring-2 ring-app-panel" />
        </button>

        <button
          type="button"
          aria-label="حساب کاربری"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-brand/30 bg-brand-surface/70 text-app-text transition hover:bg-brand-surface"
        >
          <UserRound size={20} />
        </button>
      </div>
    </header>
  );
}
