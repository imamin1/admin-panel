import { useMemo, useState } from "react";
import { ListPlus, Pencil, Plus, Search, Trash2 } from "lucide-react";
import CategoryAttributesModal from "./CategoryAttributesModal";
import CategoryModal from "./CategoryModal";

const initialCategories = [
  {
    id: 1,
    parentId: null,
    title: "دسته شماره یک",
    isActive: true,
    attributes: [
      { id: 101, title: "ویژگی شماره ۱", unit: "عدد", showInFilter: true },
    ],
  },
  { id: 2, parentId: null, title: "دسته شماره دو", isActive: true, attributes: [] },
  { id: 3, parentId: null, title: "دسته شماره سه", isActive: false, attributes: [] },
  { id: 4, parentId: 1, title: "دسته شماره چهار", isActive: true, attributes: [] },
];

export default function Category() {
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attributesCategoryId, setAttributesCategoryId] = useState(null);

  const filteredCategories = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase();
    return categories.filter((category) =>
      category.title.toLocaleLowerCase().includes(normalizedSearch),
    );
  }, [categories, search]);

  const openCreateForm = () => {
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditForm = (category) => {
    setEditingId(category.id);
    setIsModalOpen(true);
  };

  const closeForm = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const saveCategory = (categoryData) => {
    if (editingId === null) {
      setCategories((current) => [
        ...current,
        { id: Date.now(), attributes: [], ...categoryData },
      ]);
    } else {
      setCategories((current) =>
        current.map((category) =>
          category.id === editingId
            ? { ...category, ...categoryData }
            : category,
        ),
      );
    }

    closeForm();
  };

  const deleteCategory = (id) => {
    setCategories((current) => current.filter((category) => category.id !== id));
  };

  const saveCategoryAttributes = (attributes) => {
    setCategories((current) =>
      current.map((category) =>
        category.id === attributesCategoryId
          ? { ...category, attributes }
          : category,
      ),
    );
    setAttributesCategoryId(null);
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
            value={search}
            onChange={(event) => setSearch(event.target.value)}
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
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, index) => (
                <tr
                  key={category.id}
                  className="transition-colors hover:bg-brand-surface/50"
                >
                  <td className="whitespace-nowrap px-3 py-3">{index + 1}</td>
                  <td className="whitespace-nowrap px-3 py-3">{category.title}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs ${
                        category.isActive
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
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
                      onClick={() => deleteCategory(category.id)}
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
                  دسته‌ای با این عنوان پیدا نشد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <CategoryModal
          category={categories.find((category) => category.id === editingId) ?? null}
          categories={categories}
          onClose={closeForm}
          onSave={saveCategory}
        />
      )}
      {attributesCategoryId !== null && (
        <CategoryAttributesModal
          category={categories.find(
            (category) => category.id === attributesCategoryId,
          )}
          onClose={() => setAttributesCategoryId(null)}
          onSave={saveCategoryAttributes}
        />
      )}
    </section>
  );
}
