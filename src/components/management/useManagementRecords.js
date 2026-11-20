import { useCallback, useEffect, useState } from "react";
import { getApiErrorMessage } from "../../api";
import {
  deleteAdminRecord,
  listAdminRecords,
  saveAdminRecord,
} from "../../services/admin-records.service";

export default function useManagementRecords(config) {
  const resource = config.resource;
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [editingRecord, setEditingRecord] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({
    current_page: 1,
    per_page: 100,
    total: 0,
    last_page: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadRecords = useCallback(async (signal) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await listAdminRecords(resource, {
        page,
        perPage: meta.per_page,
        search: search.trim(),
        signal,
      });
      setRecords(result.data);
      setMeta(result.meta);
    } catch (requestError) {
      if (requestError.name !== "CanceledError") {
        setError(getApiErrorMessage(requestError));
      }
    } finally {
      if (!signal?.aborted) setIsLoading(false);
    }
  }, [meta.per_page, page, resource, search]);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(
      () => loadRecords(controller.signal),
      search ? 250 : 0,
    );

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [loadRecords, search]);

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingRecord(null);
  };

  const updateSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const saveRecord = async (recordData) => {
    setError("");
    setNotice("");

    try {
      const result = await saveAdminRecord(
        resource,
        recordData,
        editingRecord?.id,
      );
      setNotice(
        result.temporaryPassword
          ? `رمز موقت کاربر: ${result.temporaryPassword}`
          : "اطلاعات با موفقیت ذخیره شد.",
      );
      closeForm();
      if (page === 1) await loadRecords();
      else setPage(1);
      return true;
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
      return false;
    }
  };

  const updateRecord = async (id, changes) => {
    const record = records.find((item) => item.id === id);
    if (!record) return;
    try {
      await saveAdminRecord(resource, { ...record, ...changes }, id);
      await loadRecords();
      return true;
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
      return false;
    }
  };

  const removeRecord = async (id) => {
    setError("");
    try {
      await deleteAdminRecord(resource, id);
      setNotice("رکورد حذف شد.");
      if (records.length === 1 && page > 1) setPage((current) => current - 1);
      else await loadRecords();
      return true;
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
      return false;
    }
  };

  return {
    records,
    search,
    setSearch: updateSearch,
    page: meta.current_page,
    pagination: meta,
    setPage,
    isLoading,
    error,
    notice,
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
    deleteRecord: removeRecord,
    updateRecord,
  };
}
