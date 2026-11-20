const formatNumber = (value) => Number(value ?? 0).toLocaleString("fa-IR");

export default function DashboardCards({ data }) {
  const cards = [
    {
      value: data?.carts?.today,
      title: "سبد خرید امروز",
      description: "سبدهای خرید ثبت‌شده امروز",
      icon: "fa-shopping-basket",
      accent: "border-t-brand-dark",
      iconStyle: "bg-brand-dark text-brand-surface",
      weekly: data?.carts?.lastWeek,
      monthly: data?.carts?.lastMonth,
    },
    {
      value: data?.orders?.pendingToday,
      title: "سفارش‌های در انتظار پرداخت",
      description: "سفارش‌های معلق امروز",
      icon: "fa-dolly",
      accent: "border-t-brand",
      iconStyle: "bg-brand/15 text-brand-dark",
      weekly: data?.orders?.pendingLastWeek,
      monthly: data?.orders?.pendingLastMonth,
    },
    {
      value: data?.orders?.paidToday,
      title: "سفارش‌های پرداخت‌شده امروز",
      description: "سفارش‌های تکمیل‌شده",
      icon: "fa-luggage-cart",
      accent: "border-t-brand-surface",
      iconStyle: "bg-brand-surface text-brand-dark",
      weekly: data?.orders?.paidLastWeek,
      monthly: data?.orders?.paidLastMonth,
    },
    {
      value: data?.revenue?.today,
      title: "درآمد امروز",
      description: "مبالغ سفارش‌های پرداخت‌شده (تومان)",
      icon: "fa-money-check-alt",
      accent: "border-t-brand-dark/60",
      iconStyle: "bg-brand-dark/10 text-brand-dark",
      weekly: data?.revenue?.lastWeek,
      monthly: data?.revenue?.lastMonth,
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <article
          key={card.title}
          className={`min-w-0 overflow-hidden rounded-2xl border border-brand/20 border-t-4 ${card.accent} bg-white text-brand-dark shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}
        >
          <div className="flex items-center justify-between gap-3 p-4">
            <div className="min-w-0">
              <p className="truncate text-2xl font-bold">
                {data ? formatNumber(card.value) : "—"}
              </p>
              <h2 className="mt-2 truncate text-sm font-semibold">{card.title}</h2>
              <p className="mt-1 truncate text-xs text-brand-dark/70">{card.description}</p>
            </div>
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.iconStyle}`}>
              <i aria-hidden="true" className={`fas ${card.icon} text-lg`} />
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 border-t border-brand/15 bg-brand-surface/30 px-3 py-2 text-[10px] sm:text-xs">
            <span className="min-w-0 text-brand-dark/70">
              <b className="block truncate text-brand-dark">{formatNumber(card.weekly)}</b>
              در هفته گذشته
            </span>
            <span className="min-w-0 text-brand-dark/70">
              <b className="block truncate text-brand-dark">{formatNumber(card.monthly)}</b>
              در ماه گذشته
            </span>
          </div>
        </article>
      ))}
    </section>
  );
}
