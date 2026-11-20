import { useState } from "react";
import Modal from "../Modal";

export default function ManagementFormModal({
  title,
  fields,
  record,
  onClose,
  onSave,
}) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(
      fields.map((field) => [
        field.key,
        record?.[field.key] ??
          (field.type === "checkbox"
            ? true
            : field.type === "multiselect"
              ? []
              : field.defaultValue ?? (field.type === "color" ? "#563d7c" : "")),
      ]),
    ),
  );
  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const updateField = (key, value) =>
    setValues((current) => ({ ...current, [key]: value }));

  return (
    <Modal
      title={`${record ? "ویرایش" : "افزودن"} ${title}`}
      onClose={onClose}
      onSubmit={(event) => {
        event.preventDefault();
        setSaveError("");
        setIsSaving(true);
        Promise.resolve(onSave(values))
          .then((saved) => {
            if (saved === false) setSaveError("ذخیره انجام نشد. خطای نمایش‌داده‌شده را بررسی کنید.");
          })
          .catch((error) => setSaveError(error.message))
          .finally(() => setIsSaving(false));
      }}
    >
      {fields.map((field) => (
        <label
          key={field.key}
          className="block space-y-2 text-sm font-medium text-brand-dark"
        >
          <span>{field.label}</span>
          {field.type === "textarea" ? (
            <textarea
              required={field.required !== false}
              rows={4}
              value={values[field.key]}
              onChange={(event) => updateField(field.key, event.target.value)}
              className="w-full resize-y rounded-xl border border-brand/20 px-3 py-3 outline-none focus:border-brand"
            />
          ) : field.type === "checkbox" ? (
            <span className="flex items-center gap-3 rounded-xl border border-brand/20 px-3 py-3">
              <input
                type="checkbox"
                checked={values[field.key]}
                onChange={(event) =>
                  updateField(field.key, event.target.checked)
                }
                className="h-4 w-4 accent-brand-dark"
              />
              <span>{values[field.key] ? "فعال" : "غیرفعال"}</span>
            </span>
          ) : field.type === "select" || field.type === "multiselect" ? (
            <select
              required={field.type === "select" && field.required !== false}
              multiple={field.type === "multiselect"}
              value={values[field.key]}
              onChange={(event) =>
                updateField(
                  field.key,
                  field.type === "multiselect"
                    ? Array.from(
                        event.target.selectedOptions,
                        (option) => option.value,
                      )
                    : event.target.value,
                )
              }
              className="w-full rounded-xl border border-brand/20 bg-white px-3 py-3 outline-none focus:border-brand"
            >
              {field.type === "select" && <option value="">انتخاب کنید</option>}
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              required={field.required !== false}
              type={field.type ?? "text"}
              min={field.min}
              value={values[field.key]}
              onChange={(event) => updateField(field.key, event.target.value)}
              className="w-full rounded-xl border border-brand/20 px-3 py-3 outline-none focus:border-brand"
            />
          )}
        </label>
      ))}
      {saveError && <p role="alert" className="text-sm text-red-700">{saveError}</p>}
      {isSaving && <p role="status" className="text-sm text-brand-dark/70">در حال ذخیره...</p>}
    </Modal>
  );
}
