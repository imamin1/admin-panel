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

export default function ProductSalesChart({ revenue, loading }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !revenue) return;

    const chart = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: ["امروز", "هفت روز گذشته", "سی روز گذشته"],
        datasets: [{
          label: "درآمد (تومان)",
          data: [revenue.today, revenue.lastWeek, revenue.lastMonth],
          borderColor: "#20352b",
          backgroundColor: "#20352b",
          tension: 0.35,
        }],
      },
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
                `${context.dataset.label}: ${context.parsed.y.toLocaleString("fa-IR")}`,
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
  }, [revenue]);

  return (
    <section className="min-w-0 rounded-2xl border border-brand/20 bg-white p-4 shadow-sm">
      <h2 className="mb-1 text-center font-semibold text-brand-dark">
        درآمد سفارش‌های پرداخت‌شده
      </h2>
      <p className="mb-3 text-center text-xs text-brand-dark/70">
        جمع مبلغ پرداخت‌شده در بازه‌های زمانی گزارش‌شده
      </p>
      <div className="h-64">
        {loading ? (
          <p className="pt-20 text-center text-sm text-brand-dark/60">در حال دریافت اطلاعات...</p>
        ) : revenue ? (
          <canvas ref={chartRef} aria-label="نمودار درآمد سفارش‌های پرداخت‌شده" role="img" />
        ) : (
          <p className="pt-20 text-center text-sm text-brand-dark/60">اطلاعات درآمد در دسترس نیست.</p>
        )}
      </div>
    </section>
  );
}
