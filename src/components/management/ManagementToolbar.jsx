import { Plus, Search } from "lucide-react";

export default function ManagementToolbar({
  search,
  onSearchChange,
  searchPlaceholder,
  addLabel,
  onAdd,
}) {
  return (
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
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={searchPlaceholder}
          className="min-w-0 flex-1 bg-transparent text-sm outline-none"
        />
      </label>

      {onAdd && (
        <button
          type="button"
          onClick={onAdd}
          aria-haspopup="dialog"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-dark px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark/90"
        >
          <Plus size={18} aria-hidden="true" />
          {addLabel}
        </button>
      )}
    </div>
  );
}
