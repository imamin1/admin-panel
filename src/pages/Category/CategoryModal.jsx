import { useRef, useState } from "react";
import Modal from "../../components/Modal";
import { getApiErrorMessage } from "../../api";
import { uploadAdminImage } from "../../services/admin-records.service";

export default function CategoryModal({
  category,
  categories,
  onClose,
  onSave,
}) {
  const [parentId, setParentId] = useState(category?.parentId ?? "");
  const [title, setTitle] = useState(category?.title ?? "");
  const [description, setDescription] = useState(category?.description ?? "");
  const [image, setImage] = useState(null);
  const [isActive, setIsActive] = useState(category?.isActive ?? true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const titleInputRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const normalizedTitle = title.trim();
    if (!normalizedTitle) return;

    setIsSaving(true);
    setSaveError("");
    try {
      const uploadedImage = image ? await uploadAdminImage(image) : null;
      const saved = await onSave({
        parentId: parentId === "" ? null : Number(parentId),
        title: normalizedTitle,
        description: description.trim(),
        imageName: uploadedImage?.name ?? category?.imageName ?? "",
        imageUrl: uploadedImage?.url ?? category?.imageUrl ?? "",
        isActive,
      });
      if (!saved) setSaveError("ذخیره انجام نشد. خطای نمایش‌داده‌شده در صفحه را بررسی کنید.");
    } catch (error) {
      setSaveError(getApiErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      title={category ? "ویرایش دسته محصول" : "افزودن دسته محصولات"}
      onClose={onClose}
      onSubmit={handleSubmit}
      initialFocusRef={titleInputRef}
    >
      <label className="block space-y-2 text-sm font-medium text-brand-dark">
        <span>دسته والد</span>
        <select
          value={parentId}
          onChange={(event) => setParentId(event.target.value)}
          className="w-full rounded-xl border border-brand/20 bg-white px-3 py-3 outline-none focus:border-brand"
        >
          <option value="">بدون والد</option>
          {categories
            .filter(
              (item) =>
                item.id !== category?.id && item.id !== Number(parentId),
            )
            .map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          {categories
            .filter((item) => item.id === Number(parentId))
            .map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
        </select>
      </label>

      <label className="block space-y-2 text-sm font-medium text-brand-dark">
        <span>عنوان دسته</span>
        <input
          ref={titleInputRef}
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="عنوان دسته"
          className="w-full rounded-xl border border-brand/20 px-3 py-3 outline-none focus:border-brand"
        />
      </label>

      <label className="block space-y-2 text-sm font-medium text-brand-dark">
        <span>توضیحات</span>
        <textarea
          rows={5}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="توضیحات"
          className="w-full resize-y rounded-xl border border-brand/20 px-3 py-3 outline-none focus:border-brand"
        />
      </label>

      <label className="block space-y-2 text-sm font-medium text-brand-dark">
        <span>تصویر</span>
        <input
          type="file"
          accept="image/*"
          onChange={(event) => setImage(event.target.files?.[0] ?? null)}
          className="block w-full rounded-xl border border-brand/20 bg-white p-2 text-sm file:ml-3 file:rounded-lg file:border-0 file:bg-brand-surface file:px-3 file:py-2"
        />
        {(image?.name || category?.imageName) && (
          <span className="block text-xs text-brand-dark/60">
            {image?.name ?? category.imageName}
          </span>
        )}
      </label>

      <label className="flex w-fit cursor-pointer items-center gap-3 rounded-xl border border-brand/15 px-4 py-3 text-sm text-brand-dark">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(event) => setIsActive(event.target.checked)}
          className="h-4 w-4 accent-brand-dark"
        />
        وضعیت فعال
      </label>
      {saveError && <p role="alert" className="text-sm text-red-700">{saveError}</p>}
      {isSaving && <p role="status" className="text-sm text-brand-dark/70">در حال ذخیره...</p>}
    </Modal>
  );
}
