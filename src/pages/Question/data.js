const questionConfig = {
  title: "مدیریت پرسش‌ها",
  itemLabel: "پرسش",
  searchPlaceholder: "نام کاربر، دسته یا متن پرسش را جست‌وجو کنید",
  fields: [
    { key: "author", label: "نام و نام خانوادگی" },
    {
      key: "type",
      label: "نوع",
      type: "select",
      options: ["پرسش", "پاسخ"],
    },
    { key: "category", label: "دسته" },
    { key: "content", label: "متن پرسش", type: "textarea" },
    { key: "date", label: "تاریخ", type: "date" },
    { key: "isActive", label: "وضعیت فعال", type: "checkbox" },
  ],
  columns: [
    { key: "author", label: "نام و نام خانوادگی" },
    { key: "type", label: "نوع" },
    { key: "category", label: "دسته" },
    { key: "content", label: "متن پرسش", format: "excerpt" },
    { key: "isActive", label: "وضعیت", format: "status" },
    { key: "date", label: "تاریخ", format: "date" },
  ],
  records: [
    {
      id: 1,
      author: "قاسم بساکی",
      type: "پرسش",
      category: "محصولات",
      content: "آیا این محصول شامل ضمانت اصالت کالا است؟",
      date: "2026-10-12",
      isActive: true,
    },
  ],
};

export default questionConfig;
