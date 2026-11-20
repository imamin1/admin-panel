export default {
  resource: "colors",
  title: "مدیریت رنگ‌ها",
  itemLabel: "رنگ",
  addLabel: "افزودن رنگ",
  searchPlaceholder: "عنوان رنگ را جست‌وجو کنید",
  emptyMessage: "رنگی برای نمایش پیدا نشد.",
  fields: [
    { key: "title", label: "عنوان رنگ" },
    { key: "value", label: "کد رنگ", type: "color" },
  ],
  columns: [
    { key: "title", label: "عنوان" },
    { key: "value", label: "کد رنگ" },
  ],
};
