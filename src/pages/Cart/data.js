const cartConfig = {
  title: "مدیریت سبدهای خرید",
  itemLabel: "سبد خرید",
  searchPlaceholder: "نام مشتری یا شماره سبد را جست‌وجو کنید",
  fields: [
    { key: "customerId", label: "شناسه مشتری", type: "number", min: 1 },
    { key: "customer", label: "نام مشتری" },
    { key: "date", label: "تاریخ", type: "date" },
    { key: "total", label: "مبلغ کل (تومان)", type: "number", min: 0 },
    {
      key: "status",
      label: "وضعیت",
      type: "select",
      options: ["فعال", "ثبت سفارش", "رهاشده"],
    },
  ],
  columns: [
    { key: "customerId", label: "شناسه مشتری" },
    { key: "customer", label: "نام مشتری" },
    { key: "date", label: "تاریخ", format: "date" },
    { key: "total", label: "مبلغ کل", format: "money" },
    { key: "status", label: "وضعیت" },
  ],
  records: [
    {
      id: 1,
      customerId: 50,
      customer: "قاسم بساکی",
      date: "2026-10-15",
      total: 100000,
      status: "فعال",
    },
  ],
};

export default cartConfig;
