import { useMemo, useRef, useState } from "react";
import { Plus, Search, Trash2 } from "lucide-react";
import Modal from "../../components/Modal";

const initialColors = [
  { id: 1, title: "مشکی", value: "#000000" },
  { id: 2, title: "قرمز", value: "#f44336" },
];

function ColorModal({ onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("#563d7c");
  const titleInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const normalizedTitle = title.trim();
    if (!normalizedTitle) {
      titleInputRef.current?.setCustomValidity("نام رنگ را وارد کنید.");
      titleInputRef.current?.reportValidity();
      return;
    }

    onSave({ title: normalizedTitle, value });
  };

  return (
    <Modal
      title="افزودن رنگ"
      onClose={onClose}
      onSubmit={handleSubmit}
      initialFocusRef={titleInputRef}
    >
      <label className="block space-y-2 text-sm font-medium text-brand-dark">
        <span>نام رنگ</span>
        <input
          ref={titleInputRef}
          required
          value={title}
          onChange={(event) => {
            event.target.setCustomValidity("");
            setTitle(event.target.value);
          }}
          placeholder="نام رنگ را وارد کنید"
          className="w-full rounded-xl border border-brand/20 px-3 py-3 outline-none focus:border-brand"
        />
      </label>

      <label className="flex items-center justify-between gap-4 rounded-xl border border-brand/20 px-4 py-3 text-sm font-medium text-brand-dark">
        <span>انتخاب رنگ</span>
        <input
          type="color"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          aria-label="انتخاب رنگ"
          className="h-10 w-14 cursor-pointer rounded-lg border-0 bg-transparent p-0"
        />
      </label>
      <p dir="ltr" className="text-left text-sm text-brand-dark/60">
        {value}
      </p>
    </Modal>
  );
}

export default function Color() {
  const [colors, setColors] = useState(initialColors);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredColors = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase();
    return colors.filter((color) =>
      color.title.toLocaleLowerCase().includes(normalizedSearch),
    );
  }, [colors, search]);

  const saveColor = (colorData) => {
    setColors((current) => [...current, { id: Date.now(), ...colorData }]);
    setIsModalOpen(false);
  };

  return (
    <section dir="rtl" className="space-y-5">
      <header>
        <h1 className="text-center text-xl font-bold text-brand-dark sm:text-2xl">
          مدیریت رنگ‌ها
        </h1>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex min-w-0 items-center gap-2 rounded-xl border border-brand/20 bg-white px-3 py-2 sm:w-96">
          <Search size={18} className="shrink-0 text-brand-dark/60" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="قسمتی از نام رنگ را وارد کنید"
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
          افزودن رنگ
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-brand/20 bg-white">
        <table className="min-w-full text-center text-sm text-brand-dark">
          <thead className="bg-brand-dark text-brand-surface">
            <tr>
              <th scope="col" className="px-3 py-3">#</th>
              <th scope="col" className="px-3 py-3">نام رنگ</th>
              <th scope="col" className="px-3 py-3">کد رنگ</th>
              <th scope="col" className="px-3 py-3">رنگ</th>
              <th scope="col" className="px-3 py-3">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand/15">
            {filteredColors.length > 0 ? (
              filteredColors.map((color, index) => (
                <tr key={color.id} className="transition-colors hover:bg-brand-surface/50">
                  <td className="whitespace-nowrap px-3 py-3">
                    {(index + 1).toLocaleString("fa-IR")}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{color.title}</td>
                  <td dir="ltr" className="whitespace-nowrap px-3 py-3">
                    {color.value}
                  </td>
                  <td className="px-3 py-3">
                    <span
                      aria-label={`نمونه رنگ ${color.title}`}
                      className="mx-auto block h-8 w-12 rounded-md border border-black/10"
                      style={{ backgroundColor: color.value }}
                    />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <button
                      type="button"
                      onClick={() =>
                        setColors((current) =>
                          current.filter((item) => item.id !== color.id),
                        )
                      }
                      aria-label={`حذف رنگ ${color.title}`}
                      title="حذف رنگ"
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
                  رنگی با این نام پیدا نشد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <ColorModal
          onClose={() => setIsModalOpen(false)}
          onSave={saveColor}
        />
      )}
    </section>
  );
}
