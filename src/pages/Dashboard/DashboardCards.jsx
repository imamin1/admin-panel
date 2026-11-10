const dashboardCards = [
  {
    value: "7",
    title: "سبد خرید امروز",
    description: "سبد های خرید مانده امروز",
    icon: "fa-shopping-basket",
    accent: "border-t-brand-dark",
    iconStyle: "bg-brand-dark text-brand-surface",
    weekly: "13",
    monthly: "18",
  },
  {
    value: "5",
    title: "سفارشات مانده امروز",
    description: "سفارشات معلق و فاقد پرداختی",
    icon: "fa-dolly",
    accent: "border-t-brand",
    iconStyle: "bg-brand/15 text-brand-dark",
    weekly: "9",
    monthly: "16",
  },
  {
    value: "45",
    title: "سفارشات امروز",
    description: "سفارشات کامل و دارای پرداختی",
    icon: "fa-luggage-cart",
    accent: "border-t-brand-surface",
    iconStyle: "bg-brand-surface text-brand-dark",
    weekly: "263",
    monthly: "1038",
  },
  {
    value: "1,500,000",
    title: "درآمد امروز",
    description: "جمع مبالغ پرداختی (تومان)",
    icon: "fa-money-check-alt",
    accent: "border-t-brand-dark/60",
    iconStyle: "bg-brand-dark/10 text-brand-dark",
    weekly: "6,380,000",
    monthly: "22,480,000",
  },
];

export default function DashboardCards() {
  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {dashboardCards.map((card) => (
        <article
          key={card.title}
          className={`min-w-0 overflow-hidden rounded-2xl border border-brand/20 border-t-4 ${card.accent} bg-white text-brand-dark shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}
        >
          <div className="flex items-center justify-between gap-3 p-4">
            <div className="min-w-0">
              <p className="truncate text-2xl font-bold">{card.value}</p>
              <h2 className="mt-2 truncate text-sm font-semibold">{card.title}</h2>
              <p className="mt-1 truncate text-xs text-brand-dark/70">
                {card.description}
              </p>
            </div>
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.iconStyle}`}
            >
              <i aria-hidden="true" className={`fas ${card.icon} text-lg`} />
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 border-t border-brand/15 bg-brand-surface/30 px-3 py-2 text-[10px] sm:text-xs">
            <span className="min-w-0 text-brand-dark/70">
              <b className="block truncate text-brand-dark">{card.weekly}</b>
              در هفته گذشته
            </span>
            <span className="min-w-0 text-brand-dark/70">
              <b className="block truncate text-brand-dark">{card.monthly}</b>
              در ماه گذشته
            </span>
          </div>
        </article>
      ))}
    </section>
  );
}
