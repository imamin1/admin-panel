
const stats = [
  { title: "کل پروژه‌ها", value: "۲۴", color: "bg-brand-surface text-brand-dark" },
  { title: "وظایف انجام‌شده", value: "۸۶", color: "bg-brand/15 text-brand-dark" },
  { title: "در حال انجام", value: "۱۲", color: "bg-gray-100 text-gray-700" },
  { title: "درصد پیشرفت", value: "۷۸٪", color: "bg-brand/25 text-brand-dark" },
];

export default function Content({ children }) {
  if (children) {
    return (
      <main dir="rtl" className="min-w-0 p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    );
  }

  return (
    <main dir="rtl" className="min-w-0 p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-white/60 px-3 py-1 text-xs font-semibold text-brand-dark shadow-sm backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-brand" />
          نمای کلی
        </span>
        <h1 className="text-2xl font-bold text-gray-950">
          داشبورد
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          خلاصه وضعیت پروژه‌ها و فعالیت‌های شما
        </p>
      </div>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/80
            bg-white/65 p-5 shadow-lg shadow-gray-900/[0.03] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:bg-white/85"
          >
            <p className="text-sm font-medium text-gray-500">
              {item.title}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-950">
                {item.value}
              </span>

              <span className={`rounded-xl p-3 ${item.color}`}>
                <span className="text-lg">✦</span>
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Main Dashboard */}
      <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="min-h-72 rounded-2xl border
          border-white/80 bg-white/65 p-6 shadow-lg shadow-gray-900/[0.03] backdrop-blur-xl xl:col-span-2">
          <h3 className="font-bold text-gray-950">
            گزارش فعالیت هفتگی
          </h3>

          <div className="mt-8 flex h-44 items-center
            justify-center rounded-xl border border-white/80 bg-gray-50/80 text-sm text-gray-500">
            نمودار فعالیت‌ها
          </div>
        </div>

        <div className="min-h-72 rounded-2xl border
          border-white/80 bg-white/65 p-6 shadow-lg shadow-gray-900/[0.03] backdrop-blur-xl">
          <h3 className="font-bold text-gray-950">
            پیشرفت ماهانه
          </h3>

          <div className="mt-8 flex h-44 items-center
            justify-center rounded-xl border border-white/80 bg-gray-50/80 text-sm text-gray-500">
            نمودار پیشرفت
          </div>
        </div>
      </section>
    </main>
  );
}
