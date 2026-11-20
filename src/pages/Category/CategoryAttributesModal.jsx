import { useMemo, useRef, useState } from "react";
import Modal from "../../components/Modal";
import CategoryAttributeForm from "./components/CategoryAttributeForm";
import CategoryAttributeTable from "./components/CategoryAttributeTable";

export default function CategoryAttributesModal({ category, onClose, onSave }) {
  const [attributes, setAttributes] = useState(category.attributes ?? []);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [unit, setUnit] = useState("");
  const [showInFilter, setShowInFilter] = useState(true);
  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const titleInputRef = useRef(null);

  const filteredAttributes = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase();
    return attributes.filter((attribute) =>
      attribute.title.toLocaleLowerCase().includes(normalizedSearch),
    );
  }, [attributes, search]);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setUnit("");
    setShowInFilter(true);
  };

  const saveAttribute = () => {
    if (!title.trim()) {
      titleInputRef.current?.setCustomValidity("عنوان ویژگی را وارد کنید.");
      titleInputRef.current?.reportValidity();
      return;
    }

    const attributeData = {
      title: title.trim(),
      unit: unit.trim(),
      showInFilter,
    };

    if (editingId === null) {
      setAttributes((current) => [
        ...current,
        { id: Date.now(), ...attributeData },
      ]);
    } else {
      setAttributes((current) =>
        current.map((attribute) =>
          attribute.id === editingId
            ? { ...attribute, ...attributeData }
            : attribute,
        ),
      );
    }

    resetForm();
  };

  const editAttribute = (attribute) => {
    setEditingId(attribute.id);
    setTitle(attribute.title);
    setUnit(attribute.unit);
    setShowInFilter(attribute.showInFilter);
    titleInputRef.current?.focus();
  };

  const deleteAttribute = (id) => {
    setAttributes((current) => current.filter((attribute) => attribute.id !== id));
    if (editingId === id) resetForm();
  };

  const toggleFilterVisibility = (id) => {
    setAttributes((current) =>
      current.map((attribute) =>
        attribute.id === id
          ? { ...attribute, showInFilter: !attribute.showInFilter }
          : attribute,
      ),
    );
  };

  const saveChanges = async (event) => {
    event.preventDefault();
    const normalizedTitle = title.trim();
    const hasIncompleteDraft = unit.trim() && !normalizedTitle;

    if (hasIncompleteDraft || (editingId !== null && !normalizedTitle)) {
      titleInputRef.current?.setCustomValidity("برای ذخیره، عنوان ویژگی را وارد کنید.");
      titleInputRef.current?.reportValidity();
      return;
    }

    setIsSaving(true);
    setSaveError("");
    try {
      if (!normalizedTitle) {
        const saved = await onSave(attributes);
        if (!saved) setSaveError("ذخیره ویژگی‌ها ناموفق بود. دوباره تلاش کنید.");
        return;
      }

      const attributeData = {
        title: normalizedTitle,
        unit: unit.trim(),
        showInFilter,
      };
      const updatedAttributes =
        editingId === null
          ? [...attributes, { id: Date.now(), ...attributeData }]
          : attributes.map((attribute) =>
              attribute.id === editingId
                ? { ...attribute, ...attributeData }
                : attribute,
            );
      const saved = await onSave(updatedAttributes);
      if (!saved) setSaveError("ذخیره ویژگی‌ها ناموفق بود. دوباره تلاش کنید.");
    } catch (error) {
      setSaveError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      title={`مدیریت ویژگی‌های ${category.title}`}
      onClose={onClose}
      onSubmit={saveChanges}
      initialFocusRef={titleInputRef}
    >
      <CategoryAttributeForm
        title={title}
        unit={unit}
        showInFilter={showInFilter}
        editingId={editingId}
        titleInputRef={titleInputRef}
        onTitleChange={setTitle}
        onUnitChange={setUnit}
        onShowInFilterChange={setShowInFilter}
        onSubmit={saveAttribute}
        onCancelEdit={resetForm}
      />
      <CategoryAttributeTable
        attributes={filteredAttributes}
        search={search}
        onSearchChange={setSearch}
        onEdit={editAttribute}
        onDelete={deleteAttribute}
        onToggleFilter={toggleFilterVisibility}
      />
      {saveError && <p role="alert" className="text-sm text-red-700">{saveError}</p>}
      {isSaving && <p role="status" className="text-sm text-brand-dark/70">در حال ذخیره...</p>}
    </Modal>
  );
}
