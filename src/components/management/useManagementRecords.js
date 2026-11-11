import { useMemo, useState } from "react";

export default function useManagementRecords(config) {
  const [records, setRecords] = useState(() =>
    config.records.map((record) => ({ ...record })),
  );
  const [search, setSearch] = useState("");
  const [editingRecord, setEditingRecord] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return records.filter((record) =>
      config.columns.some((column) =>
        String(record[column.key] ?? "")
          .toLocaleLowerCase()
          .includes(query),
      ),
    );
  }, [config.columns, records, search]);

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingRecord(null);
  };

  const saveRecord = (recordData) => {
    if (editingRecord) {
      setRecords((current) =>
        current.map((record) =>
          record.id === editingRecord.id
            ? { ...record, ...recordData }
            : record,
        ),
      );
    } else {
      setRecords((current) => [
        ...current,
        { id: Date.now(), ...recordData },
      ]);
    }
    closeForm();
  };

  const deleteRecord = (id) => {
    setRecords((current) => current.filter((record) => record.id !== id));
  };

  const updateRecord = (id, changes) => {
    setRecords((current) =>
      current.map((record) =>
        record.id === id ? { ...record, ...changes } : record,
      ),
    );
  };

  return {
    records: filteredRecords,
    search,
    setSearch,
    editingRecord,
    isFormOpen,
    openCreateForm: () => {
      setEditingRecord(null);
      setIsFormOpen(true);
    },
    openEditForm: (record) => {
      setEditingRecord(record);
      setIsFormOpen(true);
    },
    closeForm,
    saveRecord,
    deleteRecord,
    updateRecord,
  };
}
