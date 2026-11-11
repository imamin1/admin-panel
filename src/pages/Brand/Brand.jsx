import { useEffect, useMemo, useRef, useState } from "react";
import { Plus, Search, Trash2 } from "lucide-react";
import Modal from "../../components/Modal";

function BrandModal({ onClose, onSave }) {
  const [latinTitle, setLatinTitle] = useState("");
  const [persianTitle, setPersianTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [imageError, setImageError] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageAlt, setImageAlt] = useState("");
  const latinTitleInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const readerRef = useRef(null);

  useEffect(
    () => () => readerRef.current?.abort(),
    [],
  );

  const handleImageChange = (event) => {
    readerRef.current?.abort();
    const file = event.target.files?.[0];
    setImageName(file?.name ?? "");
    setImageDataUrl("");
    setImageError("");
    event.target.setCustomValidity("");

    if (!file) {
      setIsImageLoading(false);
      return;
    }

    const reader = new FileReader();
    readerRef.current = reader;
    setIsImageLoading(true);
    reader.onload = () => {
      if (readerRef.current !== reader) return;
      if (typeof reader.result === "string") {
        setImageDataUrl(reader.result);
        setIsImageLoading(false);
      } else {
        setImageError("بارگذاری تصویر ناموفق بود. دوباره تلاش کنید.");
        setIsImageLoading(false);
      }
    };
    reader.onerror = () => {
      if (readerRef.current !== reader) return;
      setImageError("بارگذاری تصویر ناموفق بود. دوباره تلاش کنید.");
      setIsImageLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const normalizedLatinTitle = latinTitle.trim();
    const normalizedPersianTitle = persianTitle.trim();
    if (!normalizedLatinTitle || !normalizedPersianTitle) return;

    if (isImageLoading || (imageName && !imageDataUrl)) {
      imageInputRef.current?.setCustomValidity(
        imageError || "لطفاً تا پایان بارگذاری تصویر صبر کنید.",
      );
      imageInputRef.current?.reportValidity();
      return;
    }

    onSave({
      latinTitle: normalizedLatinTitle,
      persianTitle: normalizedPersianTitle,
      description: description.trim(),
      imageDataUrl,
      imageName,
      imageAlt: imageAlt.trim(),
    });
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
        {imageError && <span className="block text-xs text-red-600">{imageError}</span>}
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
    </Modal>
  );
}

export default function Brand() {
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredBrands = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase();
    return brands.filter(
      (brand) =>
        brand.latinTitle.toLocaleLowerCase().includes(normalizedSearch) ||
        brand.persianTitle.toLocaleLowerCase().includes(normalizedSearch),
    );
  }, [brands, search]);

  const saveBrand = (brandData) => {
    setBrands((current) => [...current, { id: Date.now(), ...brandData }]);
    setIsModalOpen(false);
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
            onChange={(event) => setSearch(event.target.value)}
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
                    {brand.imageDataUrl ? (
                      <img
                        src={brand.imageDataUrl}
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
                      onClick={() =>
                        setBrands((current) =>
                          current.filter((item) => item.id !== brand.id),
                        )
                      }
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
    </section>
  );
}
