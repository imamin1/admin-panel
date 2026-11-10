import { useRef, useState } from "react";
import { X } from "lucide-react";
import Modal from "../../../components/Modal";
import { productBrands, productColors, productWarranties } from "../data";

const emptyProduct = {
  categoryIds: [],
  title: "",
  price: "",
  weight: "",
  brand: "",
  colorNames: [],
  warranties: [],
  description: "",
  imageName: "",
  imageAlt: "",
  tags: [],
  stock: "",
  discount: "",
  isActive: true,
  likes: 0,
  dislikes: 0,
  attributeValues: {},
};

function ProductField({ label, children }) {
  return (
    <label className="block space-y-1.5 text-sm font-medium text-brand-dark">
      <span>{label}</span>
      {children}
    </label>
  );
}

const inputClassName =
  "w-full rounded-xl border border-brand/20 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand";

export default function ProductFormModal({
  product,
  categories,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(() => ({
    ...emptyProduct,
    ...product,
    categoryIds: product?.categoryIds ?? [],
    colorNames: product?.colorNames ?? [],
    warranties: product?.warranties ?? [],
    tags: product?.tags ?? [],
  }));
  const [imageFile, setImageFile] = useState(null);
  const categorySelectRef = useRef(null);
  const titleInputRef = useRef(null);

  const updateForm = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));

  const addCategory = (event) => {
    const categoryId = Number(event.target.value);
    if (!categoryId || form.categoryIds.includes(categoryId)) return;
    updateForm("categoryIds", [...form.categoryIds, categoryId]);
    event.target.value = "";
  };

  const removeCategory = (id) =>
    updateForm(
      "categoryIds",
      form.categoryIds.filter((categoryId) => categoryId !== id),
    );

  const toggleSelection = (key, value) => {
    const selected = form[key];
    updateForm(
      key,
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value],
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const normalizedTitle = form.title.trim();
    if (!normalizedTitle) {
      titleInputRef.current?.reportValidity();
      return;
    }

    onSave({
      ...form,
      title: normalizedTitle,
      price: Number(form.price),
      weight: Number(form.weight) || 0,
      stock: Number(form.stock) || 0,
      discount: Number(form.discount) || 0,
      tags:
        typeof form.tags === "string"
          ? form.tags.split("-").map((tag) => tag.trim()).filter(Boolean)
          : form.tags,
      imageName: imageFile?.name ?? form.imageName,
    });
  };

  return (
    <Modal
      title={product ? "ویرایش محصول" : "افزودن محصول جدید"}
      onClose={onClose}
      onSubmit={handleSubmit}
      initialFocusRef={titleInputRef}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ProductField label="دسته محصول">
          <select
            ref={categorySelectRef}
            defaultValue=""
            onChange={addCategory}
            className={inputClassName}
          >
            <option value="">انتخاب دسته محصول</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </ProductField>

        <div className="flex flex-wrap items-end gap-2 pb-1">
          {form.categoryIds.map((id) => {
            const category = categories.find((item) => item.id === id);
            if (!category) return null;
            return (
              <span
                key={id}
                className="inline-flex items-center gap-1 rounded-full bg-brand-surface px-3 py-1.5 text-xs text-brand-dark"
              >
                {category.title}
                <button
                  type="button"
                  onClick={() => removeCategory(id)}
                  aria-label={`حذف دسته ${category.title}`}
                  className="rounded-full text-brand-dark/60 hover:text-red-600"
                >
                  <X size={14} />
                </button>
              </span>
            );
          })}
        </div>

        <ProductField label="عنوان محصول">
          <input
            ref={titleInputRef}
            required
            value={form.title}
            onChange={(event) => updateForm("title", event.target.value)}
            placeholder="عنوان محصول"
            className={inputClassName}
          />
        </ProductField>
        <ProductField label="قیمت (تومان)">
          <input
            required
            min="0"
            type="number"
            value={form.price}
            onChange={(event) => updateForm("price", event.target.value)}
            placeholder="قیمت محصول"
            className={inputClassName}
          />
        </ProductField>
        <ProductField label="وزن (کیلوگرم)">
          <input
            min="0"
            type="number"
            step="any"
            value={form.weight}
            onChange={(event) => updateForm("weight", event.target.value)}
            placeholder="وزن محصول"
            className={inputClassName}
          />
        </ProductField>
        <ProductField label="برند">
          <select
            value={form.brand}
            onChange={(event) => updateForm("brand", event.target.value)}
            className={inputClassName}
          >
            <option value="">انتخاب برند</option>
            {productBrands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </ProductField>

        <ProductField label="رنگ‌ها">
          <div className="flex flex-wrap gap-2 rounded-xl border border-brand/20 bg-white p-2.5">
            {productColors.map((color) => (
              <button
                key={color.name}
                type="button"
                aria-pressed={form.colorNames.includes(color.name)}
                onClick={() => toggleSelection("colorNames", color.name)}
                className={`rounded-full border px-3 py-1.5 text-xs ${
                  form.colorNames.includes(color.name)
                    ? "border-brand-dark bg-brand-dark text-white"
                    : "border-brand/20 text-brand-dark"
                }`}
              >
                {color.name}
              </button>
            ))}
          </div>
        </ProductField>
        <ProductField label="گارانتی‌ها">
          <div className="flex flex-wrap gap-2 rounded-xl border border-brand/20 bg-white p-2.5">
            {productWarranties.map((warranty) => (
              <button
                key={warranty}
                type="button"
                aria-pressed={form.warranties.includes(warranty)}
                onClick={() => toggleSelection("warranties", warranty)}
                className={`rounded-full border px-3 py-1.5 text-xs ${
                  form.warranties.includes(warranty)
                    ? "border-brand-dark bg-brand-dark text-white"
                    : "border-brand/20 text-brand-dark"
                }`}
              >
                {warranty}
              </button>
            ))}
          </div>
        </ProductField>

        <ProductField label="توضیحات">
          <textarea
            rows={4}
            value={form.description}
            onChange={(event) => updateForm("description", event.target.value)}
            placeholder="توضیحات محصول"
            className={inputClassName}
          />
        </ProductField>
        <ProductField label="تصویر محصول">
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
            className={`${inputClassName} file:ml-3 file:rounded-lg file:border-0 file:bg-brand-surface file:px-3 file:py-2`}
          />
          {(imageFile?.name || form.imageName) && (
            <span className="block text-xs text-brand-dark/60">
              {imageFile?.name ?? form.imageName}
            </span>
          )}
        </ProductField>
        <ProductField label="توضیح تصویر">
          <input
            value={form.imageAlt}
            onChange={(event) => updateForm("imageAlt", event.target.value)}
            placeholder="یک کلمه در مورد تصویر"
            className={inputClassName}
          />
        </ProductField>
        <ProductField label="تگ‌ها">
          <input
            value={Array.isArray(form.tags) ? form.tags.join("-") : form.tags}
            onChange={(event) => updateForm("tags", event.target.value)}
            placeholder="تگ‌ها را با - جدا کنید"
            className={inputClassName}
          />
        </ProductField>
        <ProductField label="موجودی">
          <input
            min="0"
            type="number"
            value={form.stock}
            onChange={(event) => updateForm("stock", event.target.value)}
            placeholder="موجودی"
            className={inputClassName}
          />
        </ProductField>
        <ProductField label="درصد تخفیف">
          <input
            min="0"
            max="100"
            type="number"
            value={form.discount}
            onChange={(event) => updateForm("discount", event.target.value)}
            placeholder="درصد تخفیف"
            className={inputClassName}
          />
        </ProductField>
        <label className="flex items-center gap-2 self-end rounded-xl border border-brand/15 px-4 py-3 text-sm text-brand-dark">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(event) => updateForm("isActive", event.target.checked)}
            className="h-4 w-4 accent-brand-dark"
          />
          وضعیت فعال
        </label>
      </div>
    </Modal>
  );
}
