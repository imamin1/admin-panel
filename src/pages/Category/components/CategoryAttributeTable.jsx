import { Pencil, Search, Trash2 } from "lucide-react";

export default function CategoryAttributeTable({
  attributes,
  search,
  onSearchChange,
  onEdit,
  onDelete,
  onToggleFilter,
}) {
  return (
    <section className="space-y-3">
      <label className="flex w-full items-center gap-2 rounded-xl border border-brand/20 bg-white px-3 py-2 sm:w-96">
        <Search size={18} className="shrink-0 text-brand-dark/60" aria-hidden="true" />
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="قسمتی از عنوان را وارد کنید"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none"
        />
      </label>

      <div className="overflow-x-auto rounded-xl border border-brand/20 bg-white">
        <table className="min-w-full text-center text-sm text-brand-dark">
          <thead className="bg-brand-dark text-brand-surface">
            <tr>
              <th scope="col" className="px-3 py-3">#</th>
              <th scope="col" className="px-3 py-3">عنوان</th>
              <th scope="col" className="px-3 py-3">واحد</th>
              <th scope="col" className="px-3 py-3">نمایش در فیلتر</th>
              <th scope="col" className="px-3 py-3">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand/15">
            {attributes.length > 0 ? (
              attributes.map((attribute, index) => (
                <tr key={attribute.id} className="hover:bg-brand-surface/40">
                  <td className="whitespace-nowrap px-3 py-3">{index + 1}</td>
                  <td className="whitespace-nowrap px-3 py-3">{attribute.title}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {attribute.unit || "—"}
                  </td>
                  <td className="px-3 py-3">
                    <input
                      type="checkbox"
                      checked={attribute.showInFilter}
                      onChange={() => onToggleFilter(attribute.id)}
                      aria-label={`تغییر نمایش ${attribute.title} در فیلتر`}
                      className="h-4 w-4 accent-brand-dark"
                    />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <button
                      type="button"
                      onClick={() => onEdit(attribute)}
                      aria-label={`ویرایش ${attribute.title}`}
                      title="ویرایش ویژگی"
                      className="mx-1 inline-flex rounded-lg p-2 text-brand-dark transition hover:bg-brand-surface"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(attribute.id)}
                      aria-label={`حذف ${attribute.title}`}
                      title="حذف ویژگی"
                      className="mx-1 inline-flex rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-3 py-8 text-brand-dark/60">
                  ویژگی‌ای پیدا نشد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
