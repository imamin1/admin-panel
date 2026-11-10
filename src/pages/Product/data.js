export const productCategories = [
  {
    id: 1,
    title: "دسته شماره یک",
    attributes: [
      { id: 101, title: "حافظه", unit: "گیگابایت" },
      { id: 102, title: "وزن", unit: "گرم" },
    ],
  },
  {
    id: 2,
    title: "دسته شماره دو",
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
  "گارانتی فلان ۱",
  "گارانتی فلان ۲",
  "گارانتی فلان ۳",
];

export const initialProducts = [
  {
    id: 1,
    categoryIds: [1],
    title: "محصول شماره ۱",
    price: 20000,
    weight: 1,
    brand: "سامسونگ",
    colorNames: ["مشکی"],
    warranties: ["گارانتی فلان ۱"],
    description: "توضیحات نمونه محصول",
    imageName: "",
    imageAlt: "",
    tags: ["نمونه", "پرفروش"],
    stock: 10,
    discount: 0,
    isActive: true,
    likes: 30,
    dislikes: 10,
    attributeValues: { 101: "128", 102: "180" },
  },
];
