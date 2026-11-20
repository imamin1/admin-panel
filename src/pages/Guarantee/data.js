export default {
  resource: "guarantees",
  title: "مدیریت گارانتی‌ها",
  itemLabel: "گارانتی",
  addLabel: "افزودن گارانتی",
  searchPlaceholder: "عنوان گارانتی را جست‌وجو کنید",
  emptyMessage: "گارانتی‌ای برای نمایش پیدا نشد.",
  fields: [
    { key: "title", label: "عنوان گارانتی" },
    { key: "description", label: "توضیحات", type: "textarea", required: false },
    { key: "duration", label: "مدت (ماه)", type: "number", min: 1 },
  ],
  columns: [
    { key: "title", label: "عنوان" },
    { key: "description", label: "توضیحات" },
    { key: "duration", label: "مدت (ماه)" },
  ],
};
