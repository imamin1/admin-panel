import ManagementFormModal from "../../components/management/ManagementFormModal";
import ManagementTable from "../../components/management/ManagementTable";
import ManagementToolbar from "../../components/management/ManagementToolbar";
import useManagementRecords from "../../components/management/useManagementRecords";
import roleConfig from "./data";

export default function Role() {
  const page = useManagementRecords(roleConfig);

  return (
    <section dir="rtl" className="space-y-5">
      <h1 className="text-center text-xl font-bold text-brand-dark sm:text-2xl">
        {roleConfig.title}
      </h1>
      <ManagementToolbar
        search={page.search}
        onSearchChange={page.setSearch}
        searchPlaceholder={roleConfig.searchPlaceholder}
        addLabel="افزودن نقش"
        onAdd={page.openCreateForm}
      />
      <ManagementTable
        columns={roleConfig.columns}
        records={page.records}
        emptyMessage="نقشی برای نمایش پیدا نشد."
        itemLabel={roleConfig.itemLabel}
        onEdit={page.openEditForm}
        onDelete={page.deleteRecord}
        onUpdate={page.updateRecord}
      />
      {page.isFormOpen && (
        <ManagementFormModal
          title={roleConfig.itemLabel}
          fields={roleConfig.fields}
          record={page.editingRecord}
          onClose={page.closeForm}
          onSave={page.saveRecord}
        />
      )}
    </section>
  );
}
