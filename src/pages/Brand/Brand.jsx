import { useRef, useState } from "react";
import { Plus, Search, Trash2 } from "lucide-react";
import Modal from "../../components/Modal";
import useManagementRecords from "../../components/management/useManagementRecords";
import { uploadAdminImage } from "../../services/admin-records.service";

function BrandModal({ onClose, onSave }) {
  const [latinTitle, setLatinTitle] = useState("");
  const [persianTitle, setPersianTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const latinTitleInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    setImageFile(file ?? null);
    setImageName(file?.name ?? "");
    event.target.setCustomValidity("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const normalizedLatinTitle = latinTitle.trim();
    const normalizedPersianTitle = persianTitle.trim();
    if (!normalizedLatinTitle || !normalizedPersianTitle) return;

    setSaveError("");
    setIsSaving(true);
    try {
      const saved = await onSave({
        latinTitle: normalizedLatinTitle,
        persianTitle: normalizedPersianTitle,
        description: description.trim(),
        imageFile,
        imageName,
        imageAlt: imageAlt.trim(),
      });
      if (!saved) setSaveError("ذخیره برند ناموفق بود. خطای صفحه را بررسی کنید.");
    } catch (error) {
      setSaveError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      title="افزودن برند"
      onClose={onClose}
      onSubmit={handleSubmit}
      initialFocusRef={latinTitleInputRef}
    >
      <label className="block space-y-2 text-sm font-medium text-brand-dark">
        <span>عنوان لاتین برند</span>
        <input
          ref={latinTitleInputRef}
          required
          dir="ltr"
          value={latinTitle}
          onChange={(event) => setLatinTitle(event.target.value)}
          placeholder="مثلاً Acme"
          className="w-full rounded-xl border border-brand/20 px-3 py-3 text-left outline-none focus:border-brand"
        />
      </label>

      <label className="block space-y-2 text-sm font-medium text-brand-dark">
        <span>عنوان فارسی برند</span>
        <input
          required
          value={persianTitle}
          onChange={(event) => setPersianTitle(event.target.value)}
          placeholder="نام فارسی برند را وارد کنید"
          className="w-full rounded-xl border border-brand/20 px-3 py-3 outline-none focus:border-brand"
        />
      </label>

      <label className="block space-y-2 text-sm font-medium text-brand-dark">
        <span>توضیحات برند</span>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="متن کوتاهی درباره برند"
          rows={4}
          className="w-full resize-y rounded-xl border border-brand/20 px-3 py-3 outline-none focus:border-brand"
        />
      </label>

      <label className="block space-y-2 text-sm font-medium text-brand-dark">
        <span>تصویر برند</span>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full rounded-xl border border-brand/20 bg-white p-2 text-sm file:ml-3 file:rounded-lg file:border-0 file:bg-brand-surface file:px-3 file:py-2"
        />
        {imageName && (
          <span className="block text-xs text-brand-dark/60">{imageName}</span>
        )}
      </label>

      <label className="block space-y-2 text-sm font-medium text-brand-dark">
        <span>توضیح تصویر</span>
        <input
          value={imageAlt}
          onChange={(event) => setImageAlt(event.target.value)}
          placeholder="یک کلمه یا توضیح کوتاه درباره تصویر"
          className="w-full rounded-xl border border-brand/20 px-3 py-3 outline-none focus:border-brand"
        />
      </label>
      {saveError && <p role="alert" className="text-sm text-red-700">{saveError}</p>}
      {isSaving && <p role="status" className="text-sm text-brand-dark/70">در حال ذخیره...</p>}
    </Modal>
  );
}

export default function Brand() {
  const page = useManagementRecords({
    resource: "brands",
    columns: [
      { key: "latinTitle", label: "Latin" },
      { key: "persianTitle", label: "فارسی" },
    ],
  });
  const brands = page.records;
  const search = page.search;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredBrands = brands;

  const saveBrand = async (brandData) => {
    const { imageFile: selectedImage, ...record } = brandData;
    if (selectedImage) {
      const uploadedImage = await uploadAdminImage(selectedImage);
      record.imageName = uploadedImage.name;
      record.imageUrl = uploadedImage.url;
    }
    const saved = await page.saveRecord(record);
    if (saved) setIsModalOpen(false);
    return saved;
  };

  return (
    <section dir="rtl" className="space-y-5">
      <header>
        <h1 className="text-center text-xl font-bold text-brand-dark sm:text-2xl">
          مدیریت برندها
        </h1>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex min-w-0 items-center gap-2 rounded-xl border border-brand/20 bg-white px-3 py-2 sm:w-96">
          <Search size={18} className="shrink-0 text-brand-dark/60" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(event) => {
              page.setSearch(event.target.value);
              page.setPage(1);
            }}
            placeholder="نام فارسی یا لاتین برند را جست‌وجو کنید"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
        </label>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          aria-haspopup="dialog"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-dark px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark/90"
        >
          <Plus size={18} aria-hidden="true" />
          افزودن برند
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-brand/20 bg-white">
        <table className="min-w-full text-center text-sm text-brand-dark">
          <thead className="bg-brand-dark text-brand-surface">
            <tr>
              <th scope="col" className="px-3 py-3">#</th>
              <th scope="col" className="px-3 py-3">نام لاتین</th>
              <th scope="col" className="px-3 py-3">نام فارسی</th>
              <th scope="col" className="px-3 py-3">توضیحات</th>
              <th scope="col" className="px-3 py-3">تصویر</th>
              <th scope="col" className="px-3 py-3">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand/15">
            {filteredBrands.length > 0 ? (
              filteredBrands.map((brand, index) => (
                <tr
                  key={brand.id}
                  className="transition-colors hover:bg-brand-surface/50"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {(index + 1).toLocaleString("fa-IR")}
                  </td>
                  <td dir="ltr" className="whitespace-nowrap px-3 py-3">
                    {brand.latinTitle}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {brand.persianTitle}
                  </td>
                  <td className="min-w-48 px-3 py-3">
                    {brand.description || "—"}
                  </td>
                  <td className="px-3 py-3">
                    {brand.imageUrl ? (
                      <img
                        src={brand.imageUrl}
                        alt={brand.imageAlt || "تصویر برند"}
                        className="mx-auto h-12 w-12 rounded-lg object-cover"
                      />
                    ) : (
                      <span className="text-brand-dark/50">—</span>
                    )}
                    {brand.imageName && (
                      <span className="mt-1 block max-w-32 truncate text-xs text-brand-dark/60">
                        {brand.imageName}
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <button
                      type="button"
                      onClick={() => page.deleteRecord(brand.id)}
                      aria-label={`حذف برند ${brand.persianTitle}`}
                      title="حذف برند"
                      className="mx-1 inline-flex rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-brand-dark/60">
                  {search.trim()
                    ? "برندی با این نام پیدا نشد."
                    : "هنوز برندی ثبت نشده است."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <BrandModal
          onClose={() => setIsModalOpen(false)}
          onSave={saveBrand}
        />
      )}
      {(page.error || page.notice || page.pagination.last_page > 1) && (
        <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div aria-live="polite">
            {page.error && <p className="text-red-700">{page.error}</p>}
            {!page.error && page.notice && <p className="text-emerald-700">{page.notice}</p>}
          </div>
          {page.pagination.last_page > 1 && (
            <nav aria-label="صفحه‌بندی برندها" className="flex items-center justify-center gap-3">
              <button type="button" disabled={page.isLoading || page.page <= 1} onClick={() => page.setPage(page.page - 1)} className="rounded-lg border border-brand/20 px-3 py-1.5 disabled:opacity-50">قبلی</button>
              <span>{page.page.toLocaleString("fa-IR")} / {page.pagination.last_page.toLocaleString("fa-IR")}</span>
              <button type="button" disabled={page.isLoading || page.page >= page.pagination.last_page} onClick={() => page.setPage(page.page + 1)} className="rounded-lg border border-brand/20 px-3 py-1.5 disabled:opacity-50">بعدی</button>
            </nav>
          )}
        </div>
      )}
    </section>
  );
}
