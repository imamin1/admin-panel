const userConfig = {
  title: "مدیریت کاربران",
  itemLabel: "کاربر",
  searchPlaceholder: "نام، شماره موبایل یا ایمیل را جست‌وجو کنید",
  fields: [
    { key: "name", label: "نام و نام خانوادگی" },
    { key: "mobile", label: "شماره موبایل", type: "tel" },
    { key: "email", label: "ایمیل", type: "email" },
    {
      key: "role",
      label: "نقش",
      type: "select",
      options: ["کاربر", "مدیر", "نویسنده"],
    },
    { key: "registeredAt", label: "تاریخ ثبت‌نام", type: "date" },
  ],
  columns: [
    { key: "name", label: "نام و نام خانوادگی" },
    { key: "mobile", label: "موبایل" },
    { key: "email", label: "ایمیل" },
    { key: "role", label: "نقش" },
    { key: "registeredAt", label: "تاریخ ثبت‌نام", format: "date" },
  ],
  records: [
    {
      id: 1,
      name: "قاسم بساکی",
      mobile: "09110110011",
      email: "ghasem@example.com",
      role: "کاربر",
      registeredAt: "2026-10-12",
    },
  ],
};

export default userConfig;
