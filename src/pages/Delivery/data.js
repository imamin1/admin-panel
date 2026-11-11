const deliveryConfig = {
  title: "مدیریت روش‌های ارسال",
  itemLabel: "روش ارسال",
  searchPlaceholder: "عنوان روش ارسال را جست‌وجو کنید",
  fields: [
    { key: "title", label: "عنوان روش ارسال" },
    { key: "cost", label: "هزینه (تومان)", type: "number", min: 0 },
    { key: "duration", label: "مدت ارسال", type: "number", min: 1 },
    {
      key: "unit",
      label: "واحد زمان",
      type: "select",
      options: ["روز", "ساعت", "هفته"],
    },
  ],
  columns: [
    { key: "title", label: "عنوان" },
    { key: "cost", label: "هزینه", format: "money" },
    { key: "duration", label: "زمان ارسال" },
    { key: "unit", label: "واحد زمان" },
  ],
  records: [
    { id: 1, title: "پست پیشتاز", cost: 25000, duration: 2, unit: "روز" },
  ],
};

export default deliveryConfig;
