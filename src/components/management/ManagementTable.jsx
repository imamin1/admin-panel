import { Pencil, Trash2 } from "lucide-react";
import { formatValue } from "./formatValue";

export default function ManagementTable({
  columns,
  records,
  emptyMessage,
  onEdit,
  onDelete,
  onUpdate,
  itemLabel,
}) {
  const hasActions = Boolean(onEdit || onDelete);
  const columnCount = columns.length + 1 + Number(hasActions);

  return (
    <div className="overflow-x-auto rounded-xl border border-brand/20 bg-white">
      <table className="min-w-full text-center text-sm text-brand-dark">
        <thead className="bg-brand-dark text-brand-surface">
          <tr>
            <th scope="col" className="px-3 py-3">#</th>
            {columns.map((column) => (
              <th scope="col" key={column.key} className="px-3 py-3">
                {column.label}
              </th>
            ))}
            {hasActions && (
              <th scope="col" className="px-3 py-3">عملیات</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-brand/15">
          {records.length ? (
            records.map((record, index) => (
              <tr
                key={record.id}
                className="transition-colors hover:bg-brand-surface/50"
              >
                <td className="whitespace-nowrap px-3 py-3">
                  {(index + 1).toLocaleString("fa-IR")}
                </td>
                {columns.map((column) => (
                  <td key={column.key} className="max-w-72 px-3 py-3">
                    {column.format === "status" ? (
                      <label className="inline-flex items-center justify-center gap-2">
                        <input
                          type="checkbox"
                          checked={Boolean(record[column.key])}
                          onChange={(event) =>
                            onUpdate(record.id, {
                              [column.key]: event.target.checked,
                            })
                          }
                          aria-label={`تغییر وضعیت ${record.title ?? record.name ?? column.label}`}
                          className="h-4 w-4 accent-brand-dark"
                        />
                        <span>
                          {record[column.key] ? "فعال" : "غیرفعال"}
                        </span>
                      </label>
                    ) : (
                      <span className="block max-w-72 whitespace-normal">
                        {formatValue(record[column.key], column.format)}
                      </span>
                    )}
                  </td>
                ))}
                {hasActions && (
                  <td className="whitespace-nowrap px-3 py-3">
                    {onEdit && (
                      <button
                        type="button"
                        onClick={() => onEdit(record)}
                        aria-label={`ویرایش ${record.title ?? record.name ?? itemLabel}`}
                        title="ویرایش"
                        className="mx-1 inline-flex rounded-lg p-2 text-amber-600 transition hover:bg-amber-50"
                      >
                        <Pencil size={16} />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        type="button"
                        onClick={() => onDelete(record.id)}
                        aria-label={`حذف ${record.title ?? record.name ?? itemLabel}`}
                        title="حذف"
                        className="mx-1 inline-flex rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columnCount} className="px-3 py-8 text-brand-dark/60">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
