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

export default function ProductSalesChart() {
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

  return (
    <section className="min-w-0 rounded-2xl border border-brand/20 bg-white p-4 shadow-sm">
      <h2 className="mb-1 text-center font-semibold text-brand-dark">
        آمار فروش محصولات
      </h2>
      <p className="mb-3 text-center text-xs text-brand-dark/70">
        تعداد فروش روزانه محصولات در هفته گذشته (آمار نمونه)
      </p>
      <div className="h-64">
        <canvas
          ref={chartRef}
          aria-label="نمودار آمار فروش محصولات"
          role="img"
        />
      </div>
    </section>
  );
}
