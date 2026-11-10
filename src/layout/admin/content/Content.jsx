import { useEffect, useRef } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
);

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

const lowStockProducts = [
  { category: "دسته شماره فلان", title: "محصول فلان", status: "پایان یافته" },
  { category: "دسته شماره فلان", title: "محصول فلان", status: "رو به اتمام - 4" },
  { category: "دسته شماره فلان", title: "محصول فلان", status: "پایان یافته" },
  { category: "دسته شماره فلان", title: "محصول فلان", status: "پایان یافته" },
  { category: "دسته شماره فلان", title: "محصول فلان", status: "رو به اتمام - 2" },
];

const salesChartData = {
  labels: ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"],
  datasets: [
    {
      label: "محصول اول",
      data: [18, 24, 21, 30, 27, 35, 32],
      borderColor: "#20352b",
      backgroundColor: "#20352b",
      tension: 0.35,
    },
    {
      label: "محصول دوم",
      data: [12, 16, 14, 19, 23, 21, 28],
      borderColor: "#b49a62",
      backgroundColor: "#b49a62",
      tension: 0.35,
    },
    {
      label: "محصول سوم",
      data: [9, 11, 13, 12, 16, 18, 17],
      borderColor: "#3d8b73",
      backgroundColor: "#3d8b73",
      tension: 0.35,
    },
  ],
};

export default function Content({ children }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = new Chart(chartRef.current, {
      type: "line",
      data: salesChartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          legend: {
            position: "bottom",
            rtl: true,
            textDirection: "rtl",
            labels: {
              usePointStyle: true,
              pointStyle: "circle",
              padding: 16,
              font: { family: "Vazirmatn, sans-serif" },
            },
          },
          tooltip: {
            rtl: true,
            textDirection: "rtl",
            bodyFont: { family: "Vazirmatn, sans-serif" },
            titleFont: { family: "Vazirmatn, sans-serif" },
            callbacks: {
              label: (context) =>
                `${context.dataset.label}: ${context.parsed.y.toLocaleString("fa-IR")} عدد فروش`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { family: "Vazirmatn, sans-serif" } },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "تعداد فروش (عدد)",
              font: { family: "Vazirmatn, sans-serif" },
            },
            ticks: { font: { family: "Vazirmatn, sans-serif" } },
          },
        },
      },
    });

    return () => chart.destroy();
  }, []);

  if (children) {
    return (
      <main dir="rtl" className="min-w-0 p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    );
  }

  return (
    <main dir="rtl" className="min-w-0 p-4 sm:p-6 lg:p-8">
      <div id="dashboard_section" className="space-y-8">
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
                  <p className="mt-1 truncate text-xs text-brand-dark/70">{card.description}</p>
                </div>
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.iconStyle}`}>
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

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="min-w-0">
            <h2 className="mb-3 text-center font-semibold text-brand-dark">
              محصولات رو به اتمام
            </h2>
            <div className="overflow-x-auto rounded-xl border border-brand/20 bg-white">
              <table className="min-w-full text-center text-sm text-brand-dark">
                <thead className="bg-brand-dark text-brand-surface">
                  <tr>
                    <th scope="col" className="px-3 py-3">#</th>
                    <th scope="col" className="px-3 py-3">دسته</th>
                    <th scope="col" className="px-3 py-3">عنوان</th>
                    <th scope="col" className="px-3 py-3">وضعیت</th>
                    <th scope="col" className="px-3 py-3">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand/15">
                  {lowStockProducts.map((product, index) => (
                    <tr
                      key={`${product.title}-${index}`}
                      className="transition-colors hover:bg-brand-surface/50"
                    >
                      <td className="whitespace-nowrap px-3 py-3">{index + 1}</td>
                      <td className="whitespace-nowrap px-3 py-3">{product.category}</td>
                      <td className="whitespace-nowrap px-3 py-3">{product.title}</td>
                      <td className="whitespace-nowrap px-3 py-3">{product.status}</td>
                      <td className="px-3 py-3">
                        <i
                          aria-label="نادیده گرفتن"
                          className="fas fa-times mx-1 cursor-pointer text-brand hover:text-brand-dark"
                          title="نادیده گرفتن"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="min-w-0 rounded-2xl border border-brand/20 bg-white p-4 shadow-sm">
            <h2 className="mb-1 text-center font-semibold text-brand-dark">
              آمار فروش محصولات
            </h2>
            <p className="mb-3 text-center text-xs text-brand-dark/70">
              تعداد فروش روزانه محصولات در هفته گذشته (آمار نمونه)
            </p>
            <div className="h-64">
              <canvas ref={chartRef} aria-label="نمودار فروش ارزهای دیجیتال" role="img" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
