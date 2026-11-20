export default {
  resource: "permissions",
  title: "مدیریت مجوزها",
  itemLabel: "مجوز",
  searchPlaceholder: "عنوان یا توضیحات مجوز را جست‌وجو کنید",
  canCreate: true,
  canEdit: true,
  canDelete: true,
  fields: [
    { key: "title", label: "عنوان مجوز" },
    { key: "description", label: "توضیحات", type: "textarea" },
    { key: "isActive", label: "وضعیت فعال", type: "checkbox" },
  ],
  columns: [
    { key: "title", label: "عنوان" },
    { key: "description", label: "توضیحات" },
    { key: "isActive", label: "وضعیت", format: "status" },
  ],
  records: [
    {
      id: 1,
      title: "مشاهده سفارشات",
      description: "دسترسی به فهرست و جزئیات سفارش‌ها",
      isActive: true,
    },
    {
      id: 2,
      title: "مدیریت محصولات",
      description: "افزودن و ویرایش محصولات فروشگاه",
      isActive: true,
    },
    {
      id: 3,
      title: "مدیریت کاربران",
      description: "مشاهده و مدیریت حساب‌های کاربری",
      isActive: false,
    },
  ],
};
