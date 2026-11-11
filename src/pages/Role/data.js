const roleConfig = {
  title: "مدیریت نقش‌ها",
  itemLabel: "نقش",
  searchPlaceholder: "عنوان نقش را جست‌وجو کنید",
  fields: [
    { key: "title", label: "عنوان نقش" },
    { key: "description", label: "توضیحات", type: "textarea" },
    {
      key: "permissions",
      label: "مجوزها (برای انتخاب چند مورد، Ctrl را نگه دارید)",
      type: "multiselect",
      options: [
        "مشاهده سفارشات",
        "مدیریت محصولات",
        "مدیریت کاربران",
        "مدیریت تخفیف‌ها",
      ],
    },
    { key: "isActive", label: "وضعیت فعال", type: "checkbox" },
  ],
  columns: [
    { key: "title", label: "عنوان" },
    { key: "description", label: "توضیحات" },
    { key: "permissions", label: "مجوزها", format: "list" },
    { key: "isActive", label: "وضعیت", format: "status" },
  ],
  records: [
    {
      id: 1,
      title: "مدیر فروشگاه",
      description: "مدیریت محصولات و سفارش‌ها",
      permissions: ["مشاهده سفارشات", "مدیریت محصولات"],
      isActive: true,
    },
  ],
};

export default roleConfig;
