export const productCategories = [
  {
    id: 1,
    title: "لوازم جانبی دیجیتال",
    attributes: [
      { id: 101, title: "حافظه", unit: "گیگابایت" },
      { id: 102, title: "وزن", unit: "گرم" },
    ],
  },
  {
    id: 2,
    title: "خانه و آشپزخانه",
    attributes: [
      { id: 201, title: "ابعاد", unit: "سانتی‌متر" },
      { id: 202, title: "تعداد", unit: "عدد" },
    ],
  },
];

export const productBrands = ["سامسونگ", "سونی", "اپل"];
export const productColors = [
  { name: "مشکی", value: "#1f2937" },
  { name: "سفید", value: "#f8fafc" },
  { name: "قرمز", value: "#ef4444" },
];
export const productWarranties = [
  "گارانتی ۱۸ ماهه شرکتی",
  "ضمانت اصالت و سلامت فیزیکی کالا",
  "۷ روز ضمانت بازگشت کالا",
];

export const initialProducts = [
  {
    id: 1,
    categoryIds: [1],
    title: "هدفون بی‌سیم انکر مدل Soundcore Q20i",
    price: 3480000,
    weight: 250,
    brand: "انکر",
    colorNames: ["مشکی"],
    warranties: ["گارانتی ۱۸ ماهه شرکتی"],
    description: "هدفون دورگوشی با اتصال بی‌سیم، حذف نویز فعال و شارژدهی مناسب استفادهٔ روزانه.",
    imageName: "",
    imageAlt: "",
    tags: ["هدفون", "بلوتوث"],
    stock: 6,
    discount: 5,
    isActive: true,
    likes: 18,
    dislikes: 1,
    attributeValues: { 101: "بلوتوث", 102: "250" },
  },
  {
    id: 2,
    categoryIds: [2],
    title: "ماگ استیل دوجداره ۴۵۰ میلی‌لیتری",
    price: 725000,
    weight: 320,
    brand: "زیبو",
    colorNames: ["سفید"],
    warranties: ["ضمانت اصالت و سلامت فیزیکی کالا"],
    description: "ماگ استیل دوجداره با درِ ضدنشت و ظرفیت مناسب نوشیدنی‌های گرم و سرد.",
    imageName: "",
    imageAlt: "",
    tags: ["ماگ", "استیل"],
    stock: 3,
    discount: 0,
    isActive: true,
    likes: 9,
    dislikes: 0,
    attributeValues: { 201: "۸ × ۸ × ۱۷", 202: "۱" },
  },
];
