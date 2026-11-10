const lowStockProducts = [
  { category: "دسته شماره فلان", title: "محصول فلان", status: "پایان یافته" },
  { category: "دسته شماره فلان", title: "محصول فلان", status: "رو به اتمام - 4" },
  { category: "دسته شماره فلان", title: "محصول فلان", status: "پایان یافته" },
  { category: "دسته شماره فلان", title: "محصول فلان", status: "پایان یافته" },
  { category: "دسته شماره فلان", title: "محصول فلان", status: "رو به اتمام - 2" },
];

export default function LowStockProductsTable() {
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
              <th scope="col" className="px-3 py-3">وضعیت</th>
              <th scope="col" className="px-3 py-3">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand/15">
            {lowStockProducts.map((product, index) => (
              <tr
                key={`${product.title}-${index}`}
                className="transition-colors hover:bg-brand-surface/50"
              >
                <td className="whitespace-nowrap px-3 py-3">{index + 1}</td>
                <td className="whitespace-nowrap px-3 py-3">{product.category}</td>
                <td className="whitespace-nowrap px-3 py-3">{product.title}</td>
                <td className="whitespace-nowrap px-3 py-3">{product.status}</td>
                <td className="px-3 py-3">
                  <i
                    aria-label="نادیده گرفتن"
                    className="fas fa-times mx-1 cursor-pointer text-brand hover:text-brand-dark"
                    title="نادیده گرفتن"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
