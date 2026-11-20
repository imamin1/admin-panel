export default function LowStockProductsTable({ products, loading }) {
  return (
    <section className="min-w-0">
      <h2 className="mb-3 text-center font-semibold text-brand-dark">
        محصولات رو به اتمام
      </h2>
      <div className="overflow-x-auto rounded-xl border border-brand/20 bg-white">
        <table className="min-w-full text-center text-sm text-brand-dark">
          <thead className="bg-brand-dark text-brand-surface">
            <tr>
              <th scope="col" className="px-3 py-3">#</th>
              <th scope="col" className="px-3 py-3">دسته</th>
              <th scope="col" className="px-3 py-3">عنوان</th>
              <th scope="col" className="px-3 py-3">موجودی</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand/15">
            {products.length ? products.map((product, index) => (
              <tr key={product.id} className="transition-colors hover:bg-brand-surface/50">
                <td className="whitespace-nowrap px-3 py-3">{(index + 1).toLocaleString("fa-IR")}</td>
                <td className="whitespace-nowrap px-3 py-3">{product.categories.join("، ") || "—"}</td>
                <td className="px-3 py-3">{product.title}</td>
                <td className="whitespace-nowrap px-3 py-3">{product.stock.toLocaleString("fa-IR")}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="px-3 py-8 text-brand-dark/60">
                  {loading ? "در حال دریافت اطلاعات..." : "محصول کم‌موجودی وجود ندارد."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
