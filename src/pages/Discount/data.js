export default {
  resource: "discounts",
  title: "مدیریت تخفیف‌ها",
  itemLabel: "تخفیف",
  addLabel: "افزودن تخفیف",
  searchPlaceholder: "عنوان یا کد تخفیف را جست‌وجو کنید",
  emptyMessage: "تخفیفی برای نمایش پیدا نشد.",
  fields: [
    { key: "title", label: "عنوان تخفیف" },
    { key: "code", label: "کد تخفیف" },
    { key: "percentage", label: "درصد", type: "number", min: 1 },
    { key: "expiresAt", label: "تاریخ انقضا", type: "date" },
    { key: "appliesTo", label: "شامل محصولات" },
  ],
  columns: [
    { key: "title", label: "عنوان" },
    { key: "code", label: "کد" },
    { key: "percentage", label: "درصد" },
    { key: "expiresAt", label: "انقضا", format: "date" },
    { key: "appliesTo", label: "شامل محصولات" },
  ],
};
