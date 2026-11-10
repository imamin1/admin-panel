import { Check, RotateCcw } from "lucide-react";

export default function CategoryAttributeForm({
  title,
  unit,
  showInFilter,
  editingId,
  titleInputRef,
  onTitleChange,
  onUnitChange,
  onShowInFilterChange,
  onSubmit,
  onCancelEdit,
}) {
  return (
    <div className="grid grid-cols-1 items-end gap-3 rounded-xl border border-brand/15 bg-brand-surface/20 p-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_auto]">
      <label className="space-y-1.5 text-sm font-medium text-brand-dark">
        <span>عنوان ویژگی جدید</span>
        <input
          ref={titleInputRef}
          value={title}
          onChange={(event) => {
            event.currentTarget.setCustomValidity("");
            onTitleChange(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              onSubmit();
            }
          }}
          placeholder="مثلاً رنگ یا وزن"
          className="w-full rounded-lg border border-brand/20 bg-white px-3 py-2.5 outline-none focus:border-brand"
        />
      </label>

      <label className="space-y-1.5 text-sm font-medium text-brand-dark">
        <span>واحد ویژگی</span>
        <input
          value={unit}
          onChange={(event) => onUnitChange(event.target.value)}
          placeholder="مثلاً عدد یا کیلوگرم"
          className="w-full rounded-lg border border-brand/20 bg-white px-3 py-2.5 outline-none focus:border-brand"
        />
      </label>

      <label className="flex min-h-10 cursor-pointer items-center justify-center gap-2 text-sm text-brand-dark">
        <input
          type="checkbox"
          checked={showInFilter}
          onChange={(event) => onShowInFilterChange(event.target.checked)}
          className="h-4 w-4 accent-brand-dark"
        />
        نمایش در فیلتر
      </label>

      <div className="flex justify-center gap-2">
        <button
          type="button"
          onClick={onSubmit}
          title={editingId === null ? "ثبت ویژگی" : "ذخیره تغییرات ویژگی"}
          aria-label={editingId === null ? "ثبت ویژگی" : "ذخیره تغییرات ویژگی"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white transition hover:bg-emerald-700"
        >
          <Check size={18} />
        </button>
        {editingId !== null && (
          <button
            type="button"
            onClick={onCancelEdit}
            title="لغو ویرایش"
            aria-label="لغو ویرایش"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand/20 text-brand-dark transition hover:bg-brand-surface"
          >
            <RotateCcw size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
