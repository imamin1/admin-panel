import ManagementFormModal from "../../components/management/ManagementFormModal";
import ManagementTable from "../../components/management/ManagementTable";
import ManagementToolbar from "../../components/management/ManagementToolbar";
import useManagementRecords from "../../components/management/useManagementRecords";
import questionConfig from "./data";

export default function Question() {
  const page = useManagementRecords(questionConfig);

  return (
    <section dir="rtl" className="space-y-5">
      <h1 className="text-center text-xl font-bold text-brand-dark sm:text-2xl">
        {questionConfig.title}
      </h1>
      <ManagementToolbar
        search={page.search}
        onSearchChange={page.setSearch}
        searchPlaceholder={questionConfig.searchPlaceholder}
        addLabel="افزودن پرسش"
        onAdd={page.openCreateForm}
      />
      <ManagementTable
        columns={questionConfig.columns}
        records={page.records}
        emptyMessage="پرسشی برای نمایش پیدا نشد."
        itemLabel={questionConfig.itemLabel}
        onEdit={page.openEditForm}
        onDelete={page.deleteRecord}
        onUpdate={page.updateRecord}
      />
      {page.isFormOpen && (
        <ManagementFormModal
          title={questionConfig.itemLabel}
          fields={questionConfig.fields}
          record={page.editingRecord}
          onClose={page.closeForm}
          onSave={page.saveRecord}
        />
      )}
    </section>
  );
}
