import { useMemo, useRef, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import Modal from "../../components/Modal";

const initialDiscounts = [
  {
    id: 1,
    title: "تخفیف ویژه",
    code: "TAKHFiF39",
    percentage: 39,
    expiresAt: "2027-12-31",
    appliesTo: "همه محصولات",
  },
];

const productOptions = [
  "همه محصولات",
  "محصول شماره ۱",
  "محصول شماره ۲",
  "محصول شماره ۳",
];

function DiscountModal({ discount, onClose, onSave }) {
  const [title, setTitle] = useState(discount?.title ?? "");
  const [code, setCode] = useState(discount?.code ?? "");
  const [percentage, setPercentage] = useState(
    discount?.percentage?.toString() ?? "",
  );
  const [expiresAt, setExpiresAt] = useState(discount?.expiresAt ?? "");
  const [appliesTo, setAppliesTo] = useState(
    discount?.appliesTo ?? productOptions[0],
  );
  const titleInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const normalizedTitle = title.trim();
    if (!normalizedTitle) {
      titleInputRef.current?.setCustomValidity("عنوان کد تخفیف را وارد کنید.");
      titleInputRef.current?.reportValidity();
      return;
    }

    onSave({
      title: normalizedTitle,
      code: code.trim().toUpperCase(),
      percentage: Number(percentage),
      expiresAt,
      appliesTo,
    });
  };

  return (
    <Modal
      title={discount ? "ویرایش کد تخفیف" : "افزودن کد تخفیف"}
      onClose={onClose}
      onSubmit={handleSubmit}
      initialFocusRef={titleInputRef}
    >
      <label className="block space-y-2 text-sm font-medium text-brand-dark">
        <span>عنوان کد</span>
        <input
          ref={titleInputRef}
          required
          value={title}
          onChange={(event) => {
            event.target.setCustomValidity("");
            setTitle(event.target.value);
          }}
          placeholder="عنوان کد تخفیف را وارد کنید"
          className="w-full rounded-xl border border-brand/20 px-3 py-3 outline-none focus:border-brand"
        />
      </label>

      <label className="block space-y-2 text-sm font-medium text-brand-dark">
        <span>کد تخفیف</span>
        <input
          required
          dir="ltr"
          pattern="[A-Za-z0-9_-]+"
          value={code}
          onChange={(event) => setCode(event.target.value.toUpperCase())}
          placeholder="مثلاً OFF39"
          className="w-full rounded-xl border border-brand/20 px-3 py-3 text-left outline-none focus:border-brand"
        />
      </label>

      <label className="block space-y-2 text-sm font-medium text-brand-dark">
        <span>درصد تخفیف</span>
        <input
          type="number"
          required
          min="1"
          max="100"
          step="1"
          value={percentage}
          onChange={(event) => setPercentage(event.target.value)}
          placeholder="درصد تخفیف را وارد کنید"
          className="w-full rounded-xl border border-brand/20 px-3 py-3 outline-none focus:border-brand"
        />
      </label>

      <label className="block space-y-2 text-sm font-medium text-brand-dark">
        <span>تاریخ اعتبار</span>
        <input
          type="date"
          required
          value={expiresAt}
          onChange={(event) => setExpiresAt(event.target.value)}
          className="w-full rounded-xl border border-brand/20 px-3 py-3 outline-none focus:border-brand"
        />
      </label>

      <label className="block space-y-2 text-sm font-medium text-brand-dark">
        <span>قابل استفاده برای</span>
        <select
          value={appliesTo}
          onChange={(event) => setAppliesTo(event.target.value)}
          className="w-full rounded-xl border border-brand/20 bg-white px-3 py-3 outline-none focus:border-brand"
        >
          {productOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </Modal>
  );
}

export default function Discount() {
  const [discounts, setDiscounts] = useState(initialDiscounts);
  const [search, setSearch] = useState("");
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredDiscounts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase();
    return discounts.filter(
      (discount) =>
        discount.title.toLocaleLowerCase().includes(normalizedSearch) ||
        discount.code.toLocaleLowerCase().includes(normalizedSearch),
    );
  }, [discounts, search]);

  const openAddModal = () => {
    setEditingDiscount(null);
    setIsModalOpen(true);
  };

  const openEditModal = (discount) => {
    setEditingDiscount(discount);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDiscount(null);
  };

  const saveDiscount = (discountData) => {
    if (editingDiscount) {
      setDiscounts((current) =>
        current.map((discount) =>
          discount.id === editingDiscount.id
            ? { ...discount, ...discountData }
            : discount,
        ),
      );
    } else {
      setDiscounts((current) => [
        ...current,
        { id: Date.now(), ...discountData },
      ]);
    }
    closeModal();
  };

  return (
    <section dir="rtl" className="space-y-5">
      <header>
        <h1 className="text-center text-xl font-bold text-brand-dark sm:text-2xl">
          مدیریت کدهای تخفیف
        </h1>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex min-w-0 items-center gap-2 rounded-xl border border-brand/20 bg-white px-3 py-2 sm:w-96">
          <Search
            size={18}
            className="shrink-0 text-brand-dark/60"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="عنوان یا کد تخفیف را جست‌وجو کنید"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
        </label>

        <button
          type="button"
          onClick={openAddModal}
          aria-haspopup="dialog"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-dark px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark/90"
        >
          <Plus size={18} aria-hidden="true" />
          افزودن کد تخفیف
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-brand/20 bg-white">
        <table className="min-w-full text-center text-sm text-brand-dark">
          <thead className="bg-brand-dark text-brand-surface">
            <tr>
              <th scope="col" className="px-3 py-3">#</th>
              <th scope="col" className="px-3 py-3">عنوان</th>
              <th scope="col" className="px-3 py-3">کد</th>
              <th scope="col" className="px-3 py-3">درصد تخفیف</th>
              <th scope="col" className="px-3 py-3">تاریخ اعتبار</th>
              <th scope="col" className="px-3 py-3">قابل استفاده برای</th>
              <th scope="col" className="px-3 py-3">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand/15">
            {filteredDiscounts.length > 0 ? (
              filteredDiscounts.map((discount, index) => (
                <tr
                  key={discount.id}
                  className="transition-colors hover:bg-brand-surface/50"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {(index + 1).toLocaleString("fa-IR")}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {discount.title}
                  </td>
                  <td dir="ltr" className="whitespace-nowrap px-3 py-3 font-medium">
                    {discount.code}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {discount.percentage.toLocaleString("fa-IR")}٪
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {new Date(`${discount.expiresAt}T00:00:00`).toLocaleDateString(
                      "fa-IR",
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {discount.appliesTo}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <button
                      type="button"
                      onClick={() => openEditModal(discount)}
                      aria-label={`ویرایش کد ${discount.code}`}
                      title="ویرایش کد"
                      className="mx-1 inline-flex rounded-lg p-2 text-amber-600 transition hover:bg-amber-50"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setDiscounts((current) =>
                          current.filter((item) => item.id !== discount.id),
                        )
                      }
                      aria-label={`حذف کد ${discount.code}`}
                      title="حذف کد"
                      className="mx-1 inline-flex rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-brand-dark/60">
                  کد تخفیفی با این عنوان یا کد پیدا نشد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <DiscountModal
          key={editingDiscount?.id ?? "new-discount"}
          discount={editingDiscount}
          onClose={closeModal}
          onSave={saveDiscount}
        />
      )}
    </section>
  );
}
