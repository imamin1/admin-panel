import { Pencil, Plus, Receipt, Search, Trash2 } from "lucide-react";

const formatPrice = (price) =>
  `${Number(price).toLocaleString("fa-IR")} تومان`;

export default function ProductTable({
  products,
  categories,
  search,
  onSearchChange,
  onCreate,
  onEdit,
  onEditAttributes,
  onDelete,
}) {
  const categoryNames = (categoryIds) =>
    categoryIds
      .map((id) => categories.find((category) => category.id === id)?.title)
      .filter(Boolean)
      .join("، ") || "—";

  return (
    <section dir="rtl" className="space-y-5">
      <header>
        <h1 className="text-center text-xl font-bold text-brand-dark sm:text-2xl">
          مدیریت محصولات
        </h1>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex min-w-0 items-center gap-2 rounded-xl border border-brand/20 bg-white px-3 py-2 sm:w-96">
          <Search size={18} className="shrink-0 text-brand-dark/60" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="قسمتی از عنوان محصول را وارد کنید"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
        </label>

        <button
          type="button"
          onClick={onCreate}
          aria-haspopup="dialog"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-dark px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark/90"
        >
          <Plus size={18} aria-hidden="true" />
          افزودن محصول
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-brand/20 bg-white">
        <table className="min-w-full text-center text-sm text-brand-dark">
          <thead className="bg-brand-dark text-brand-surface">
            <tr>
              <th scope="col" className="px-3 py-3">#</th>
              <th scope="col" className="px-3 py-3">دسته</th>
              <th scope="col" className="px-3 py-3">عنوان</th>
              <th scope="col" className="px-3 py-3">قیمت</th>
              <th scope="col" className="px-3 py-3">موجودی</th>
              <th scope="col" className="px-3 py-3">لایک / نپسند</th>
              <th scope="col" className="px-3 py-3">وضعیت</th>
              <th scope="col" className="px-3 py-3">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand/15">
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product.id} className="hover:bg-brand-surface/40">
                  <td className="whitespace-nowrap px-3 py-3">{index + 1}</td>
                  <td className="min-w-40 px-3 py-3">{categoryNames(product.categoryIds)}</td>
                  <td className="whitespace-nowrap px-3 py-3">{product.title}</td>
                  <td className="whitespace-nowrap px-3 py-3">{formatPrice(product.price)}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {Number(product.stock).toLocaleString("fa-IR")}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span className="mx-1 text-emerald-700">
                      {Number(product.likes ?? 0).toLocaleString("fa-IR")}
                    </span>
                    <span className="mx-1 text-red-600">
                      {Number(product.dislikes ?? 0).toLocaleString("fa-IR")}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs ${
                        product.isActive
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {product.isActive ? "فعال" : "غیرفعال"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <button
                      type="button"
                      onClick={() => onEdit(product)}
                      aria-label={`ویرایش ${product.title}`}
                      title="ویرایش محصول"
                      className="mx-1 inline-flex rounded-lg p-2 text-brand-dark hover:bg-brand-surface"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onEditAttributes(product)}
                      aria-label={`ثبت ویژگی‌های ${product.title}`}
                      title="ثبت ویژگی‌های محصول"
                      className="mx-1 inline-flex rounded-lg p-2 text-brand-dark hover:bg-brand-surface"
                    >
                      <Receipt size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(product.id)}
                      aria-label={`حذف ${product.title}`}
                      title="حذف محصول"
                      className="mx-1 inline-flex rounded-lg p-2 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-3 py-8 text-brand-dark/60">
                  محصولی پیدا نشد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
