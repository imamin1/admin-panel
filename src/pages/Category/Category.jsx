import { useState } from "react";
import { ListPlus, Pencil, Plus, Search, Trash2 } from "lucide-react";
import CategoryAttributesModal from "./CategoryAttributesModal";
import CategoryModal from "./CategoryModal";
import useManagementRecords from "../../components/management/useManagementRecords";

const config = {
  resource: "categories",
  columns: [{ key: "title", label: "عنوان" }],
};

export default function Category() {
  const page = useManagementRecords(config);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attributesCategoryId, setAttributesCategoryId] = useState(null);

  const openCreateForm = () => {
    page.openCreateForm();
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditForm = (category) => {
    page.openEditForm(category);
    setEditingId(category.id);
    setIsModalOpen(true);
  };

  const closeForm = () => {
    page.closeForm();
    setIsModalOpen(false);
    setEditingId(null);
  };

  const saveCategory = async (data) => {
    const saved = await page.saveRecord(data);
    if (saved) {
      setIsModalOpen(false);
      setEditingId(null);
    }
    return saved;
  };

  const saveCategoryAttributes = async (attributes) => {
    const saved = await page.updateRecord(attributesCategoryId, { attributes });
    if (saved) setAttributesCategoryId(null);
    return saved;
  };

  return (
    <section dir="rtl" className="space-y-5">
      <header>
        <h1 className="text-center text-xl font-bold text-brand-dark sm:text-2xl">
          مدیریت دسته‌بندی محصولات
        </h1>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex min-w-0 items-center gap-2 rounded-xl border border-brand/20 bg-white px-3 py-2 sm:w-96">
          <Search size={18} className="shrink-0 text-brand-dark/60" aria-hidden="true" />
          <input
            type="search"
            value={page.search}
            onChange={(event) => {
              page.setSearch(event.target.value);
              page.setPage(1);
            }}
            placeholder="قسمتی از عنوان را وارد کنید"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
        </label>

        <button
          type="button"
          onClick={openCreateForm}
          aria-haspopup="dialog"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-dark px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark/90"
        >
          <Plus size={18} aria-hidden="true" />
          افزودن دسته
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-brand/20 bg-white">
        <table className="min-w-full text-center text-sm text-brand-dark">
          <thead className="bg-brand-dark text-brand-surface">
            <tr>
              <th scope="col" className="px-3 py-3">#</th>
              <th scope="col" className="px-3 py-3">عنوان</th>
              <th scope="col" className="px-3 py-3">وضعیت</th>
              <th scope="col" className="px-3 py-3">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand/15">
            {page.records.length ? (
              page.records.map((category, index) => (
                <tr key={category.id} className="transition-colors hover:bg-brand-surface/50">
                  <td className="whitespace-nowrap px-3 py-3">
                    {((page.page - 1) * page.pagination.per_page + index + 1).toLocaleString("fa-IR")}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{category.title}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs ${
                      category.isActive ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"
                    }`}>
                      {category.isActive ? "فعال" : "غیرفعال"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <button
                      type="button"
                      onClick={() => setAttributesCategoryId(category.id)}
                      aria-label={`مدیریت ویژگی‌های ${category.title}`}
                      title="مدیریت ویژگی‌ها"
                      className="mx-1 inline-flex rounded-lg p-2 text-brand-dark transition hover:bg-brand-surface"
                    >
                      <ListPlus size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditForm(category)}
                      aria-label={`ویرایش ${category.title}`}
                      title="ویرایش دسته"
                      className="mx-1 inline-flex rounded-lg p-2 text-brand-dark transition hover:bg-brand-surface"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => page.deleteRecord(category.id)}
                      aria-label={`حذف ${category.title}`}
                      title="حذف دسته"
                      className="mx-1 inline-flex rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-3 py-8 text-brand-dark/60">
                  {page.isLoading ? "در حال دریافت اطلاعات..." : "دسته‌ای با این عنوان پیدا نشد."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {(page.error || page.notice || page.pagination.last_page > 1) && (
          <div className="flex flex-col gap-3 border-t border-brand/15 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
            <div aria-live="polite">
              {page.error && <p className="text-red-700">{page.error}</p>}
              {!page.error && page.notice && <p className="text-emerald-700">{page.notice}</p>}
            </div>
            {page.pagination.last_page > 1 && (
              <nav aria-label="صفحه‌بندی دسته‌ها" className="flex items-center justify-center gap-3">
                <button type="button" disabled={page.isLoading || page.page <= 1} onClick={() => page.setPage(page.page - 1)} className="rounded-lg border border-brand/20 px-3 py-1.5 disabled:opacity-50">قبلی</button>
                <span>{page.page.toLocaleString("fa-IR")} / {page.pagination.last_page.toLocaleString("fa-IR")}</span>
                <button type="button" disabled={page.isLoading || page.page >= page.pagination.last_page} onClick={() => page.setPage(page.page + 1)} className="rounded-lg border border-brand/20 px-3 py-1.5 disabled:opacity-50">بعدی</button>
              </nav>
            )}
          </div>
        )}
      </div>

      {isModalOpen && (
        <CategoryModal
          category={page.records.find((category) => category.id === editingId) ?? null}
          categories={page.records}
          onClose={closeForm}
          onSave={saveCategory}
        />
      )}
      {attributesCategoryId !== null && (
        <CategoryAttributesModal
          category={page.records.find((category) => category.id === attributesCategoryId)}
          onClose={() => setAttributesCategoryId(null)}
          onSave={saveCategoryAttributes}
        />
      )}
    </section>
  );
}
