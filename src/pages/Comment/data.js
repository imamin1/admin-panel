const commentConfig = {
  title: "مدیریت نظرات",
  itemLabel: "نظر",
  searchPlaceholder: "نام کاربر، محصول یا متن نظر را جست‌وجو کنید",
  fields: [
    { key: "author", label: "نام و نام خانوادگی" },
    {
      key: "type",
      label: "نوع نظر",
      type: "select",
      options: ["نظر", "نقد و بررسی"],
    },
    { key: "target", label: "محصول" },
    { key: "content", label: "متن نظر", type: "textarea" },
    { key: "date", label: "تاریخ", type: "date" },
    { key: "isActive", label: "وضعیت فعال", type: "checkbox" },
  ],
  columns: [
    { key: "author", label: "نام و نام خانوادگی" },
    { key: "type", label: "نوع نظر" },
    { key: "target", label: "برای" },
    { key: "content", label: "متن نظر", format: "excerpt" },
    { key: "isActive", label: "وضعیت", format: "status" },
    { key: "date", label: "تاریخ", format: "date" },
  ],
  records: [
    {
      id: 1,
      author: "قاسم بساکی",
      type: "نظر",
      target: "محصول شماره ۱",
      content: "کیفیت محصول خوب بود و به‌موقع به دستم رسید.",
      date: "2026-10-12",
      isActive: true,
    },
  ],
};

export default commentConfig;
