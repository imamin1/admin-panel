import { useState } from "react";
import Modal from "../../../components/Modal";

export default function ProductAttributesModal({
  product,
  categories,
  onClose,
  onSave,
}) {
  const attributes = categories
    .filter((category) => product.categoryIds.includes(category.id))
    .flatMap((category) => category.attributes);
  const [values, setValues] = useState(product.attributeValues ?? {});
  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaveError("");
    setIsSaving(true);
    try {
      const saved = await onSave(values);
      if (!saved) setSaveError("ذخیره ویژگی‌های محصول ناموفق بود. دوباره تلاش کنید.");
    } catch (error) {
      setSaveError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      title={`ویژگی‌های ${product.title}`}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {attributes.length > 0 ? (
        attributes.map((attribute) => (
          <label
            key={attribute.id}
            className="block space-y-2 text-sm font-medium text-brand-dark"
          >
            <span>
              {attribute.title}
              {attribute.unit ? ` (${attribute.unit})` : ""}
            </span>
            <input
              value={values[attribute.id] ?? ""}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  [attribute.id]: event.target.value,
                }))
              }
              className="w-full rounded-xl border border-brand/20 px-3 py-2.5 outline-none focus:border-brand"
            />
          </label>
        ))
      ) : (
        <p className="rounded-xl bg-brand-surface/40 p-4 text-sm text-brand-dark/70">
          برای دسته‌های این محصول هنوز ویژگی‌ای ثبت نشده است.
        </p>
      )}
      {saveError && <p role="alert" className="text-sm text-red-700">{saveError}</p>}
      {isSaving && <p role="status" className="text-sm text-brand-dark/70">در حال ذخیره...</p>}
    </Modal>
  );
}
