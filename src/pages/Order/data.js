const orderConfig = {
  title: "مدیریت سفارشات",
  itemLabel: "سفارش",
  searchPlaceholder: "نام کاربر یا شماره سفارش را جست‌وجو کنید",
  fields: [
    { key: "customerId", label: "شناسه مشتری", type: "number", min: 1 },
    { key: "customer", label: "نام مشتری" },
    {
      key: "status",
      label: "وضعیت پرداخت",
      type: "select",
      options: ["پرداخت شده", "در انتظار پرداخت", "لغو شده"],
    },
    { key: "paymentDate", label: "تاریخ پرداخت", type: "date" },
    { key: "amount", label: "مبلغ پرداختی (تومان)", type: "number", min: 0 },
  ],
  columns: [
    { key: "customerId", label: "شناسه مشتری" },
    { key: "customer", label: "نام مشتری" },
    { key: "status", label: "وضعیت" },
    { key: "paymentDate", label: "تاریخ پرداخت", format: "date" },
    { key: "amount", label: "مبلغ پرداختی", format: "money" },
  ],
  records: [
    {
      id: 1,
      customerId: 50,
      customer: "قاسم بساکی",
      status: "پرداخت شده",
      paymentDate: "2026-10-15",
      amount: 100000,
    },
  ],
};

export default orderConfig;
