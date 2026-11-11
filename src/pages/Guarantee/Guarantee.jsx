import { useMemo, useRef, useState } from "react";
import { Plus, Search, Trash2 } from "lucide-react";
import Modal from "../../components/Modal";

const initialGuarantees = [
  {
    id: 1,
    title: "گارانتی ۱۸ ماهه",
    description: "ضمانت تعویض و تعمیر",
    duration: 18,
  },
  {
    id: 2,
    title: "گارانتی ۲۴ ماهه",
    description: "ضمانت خدمات پس از فروش",
    duration: 24,
  },
];

function GuaranteeModal({ onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const titleInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const normalizedTitle = title.trim();
    if (!normalizedTitle) {
      titleInputRef.current?.setCustomValidity("عنوان گارانتی را وارد کنید.");
      titleInputRef.current?.reportValidity();
      return;
    }

    onSave({
      title: normalizedTitle,
      description: description.trim(),
      duration: Number(duration),
    });
  };

  return (
    <Modal
      title="افزودن گارانتی"
      onClose={onClose}
      onSubmit={handleSubmit}
      initialFocusRef={titleInputRef}
    >
      <label className="block space-y-2 text-sm font-medium text-brand-dark">
        <span>عنوان گارانتی</span>
        <input
          ref={titleInputRef}
          required
          value={title}
          onChange={(event) => {
            event.target.setCustomValidity("");
            setTitle(event.target.value);
          }}
          placeholder="عنوان گارانتی را وارد کنید"
          className="w-full rounded-xl border border-brand/20 px-3 py-3 outline-none focus:border-brand"
        />
      </label>

      <label className="block space-y-2 text-sm font-medium text-brand-dark">
        <span>توضیحات گارانتی</span>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="توضیحات گارانتی را وارد کنید"
          rows={4}
          className="w-full resize-y rounded-xl border border-brand/20 px-3 py-3 outline-none focus:border-brand"
        />
      </label>

      <label className="block space-y-2 text-sm font-medium text-brand-dark">
        <span>مدت گارانتی (ماه)</span>
        <input
          type="number"
          required
          min="1"
          step="1"
          value={duration}
          onChange={(event) => setDuration(event.target.value)}
          placeholder="مدت گارانتی به ماه"
          className="w-full rounded-xl border border-brand/20 px-3 py-3 outline-none focus:border-brand"
        />
      </label>
    </Modal>
  );
}

export default function Guarantee() {
  const [guarantees, setGuarantees] = useState(initialGuarantees);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredGuarantees = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase();
    return guarantees.filter((guarantee) =>
      guarantee.title.toLocaleLowerCase().includes(normalizedSearch),
    );
  }, [guarantees, search]);

  const saveGuarantee = (guaranteeData) => {
    setGuarantees((current) => [
      ...current,
      { id: Date.now(), ...guaranteeData },
    ]);
    setIsModalOpen(false);
  };

  return (
    <section dir="rtl" className="space-y-5">
      <header>
        <h1 className="text-center text-xl font-bold text-brand-dark sm:text-2xl">
          مدیریت گارانتی‌ها
        </h1>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex min-w-0 items-center gap-2 rounded-xl border border-brand/20 bg-white px-3 py-2 sm:w-96">
          <Search size={18} className="shrink-0 text-brand-dark/60" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="قسمتی از عنوان گارانتی را وارد کنید"
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
          افزودن گارانتی
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-brand/20 bg-white">
        <table className="min-w-full text-center text-sm text-brand-dark">
          <thead className="bg-brand-dark text-brand-surface">
            <tr>
              <th scope="col" className="px-3 py-3">#</th>
              <th scope="col" className="px-3 py-3">عنوان گارانتی</th>
              <th scope="col" className="px-3 py-3">توضیحات</th>
              <th scope="col" className="px-3 py-3">مدت (ماه)</th>
              <th scope="col" className="px-3 py-3">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand/15">
            {filteredGuarantees.length > 0 ? (
              filteredGuarantees.map((guarantee, index) => (
                <tr
                  key={guarantee.id}
                  className="transition-colors hover:bg-brand-surface/50"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {(index + 1).toLocaleString("fa-IR")}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {guarantee.title}
                  </td>
                  <td className="min-w-48 px-3 py-3">
                    {guarantee.description || "—"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {guarantee.duration.toLocaleString("fa-IR")}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <button
                      type="button"
                      onClick={() =>
                        setGuarantees((current) =>
                          current.filter((item) => item.id !== guarantee.id),
                        )
                      }
                      aria-label={`حذف ${guarantee.title}`}
                      title="حذف گارانتی"
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
                  گارانتی‌ای با این عنوان پیدا نشد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <GuaranteeModal
          onClose={() => setIsModalOpen(false)}
          onSave={saveGuarantee}
        />
      )}
    </section>
  );
}
