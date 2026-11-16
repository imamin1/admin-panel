import ManagementFormModal from "../../components/management/ManagementFormModal";
import ManagementTable from "../../components/management/ManagementTable";
import ManagementToolbar from "../../components/management/ManagementToolbar";
import useManagementRecords from "../../components/management/useManagementRecords";
import config from "./data";

export default function Question() {
  const page = useManagementRecords(config);

  return (
    <section dir="rtl" className="space-y-5">
      <h1 className="text-center text-xl font-bold text-brand-dark sm:text-2xl">{config.title}</h1>
      <ManagementToolbar
        search={page.search}
        onSearchChange={page.setSearch}
        searchPlaceholder={config.searchPlaceholder}
        addLabel="افزودن پرسش"
        onAdd={page.openCreateForm}
      />
      <ManagementTable
        columns={config.columns}
        records={page.records}
        emptyMessage="پرسشی برای نمایش پیدا نشد."
        itemLabel={config.itemLabel}
        onEdit={page.openEditForm}
        onDelete={page.deleteRecord}
        onUpdate={page.updateRecord}
      />
      {page.isFormOpen && (
        <ManagementFormModal
          title={config.itemLabel}
          fields={config.fields}
          record={page.editingRecord}
          onClose={page.closeForm}
          onSave={page.saveRecord}
        />
      )}
    </section>
  );
}
