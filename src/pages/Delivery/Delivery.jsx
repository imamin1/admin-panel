import ManagementFormModal from "../../components/management/ManagementFormModal";
import ManagementTable from "../../components/management/ManagementTable";
import ManagementToolbar from "../../components/management/ManagementToolbar";
import useManagementRecords from "../../components/management/useManagementRecords";
import deliveryConfig from "./data";

export default function Delivery() {
  const page = useManagementRecords(deliveryConfig);

  return (
    <section dir="rtl" className="space-y-5">
      <h1 className="text-center text-xl font-bold text-brand-dark sm:text-2xl">
        {deliveryConfig.title}
      </h1>
      <ManagementToolbar
        search={page.search}
        onSearchChange={page.setSearch}
        searchPlaceholder={deliveryConfig.searchPlaceholder}
        addLabel="افزودن روش ارسال"
        onAdd={page.openCreateForm}
      />
      <ManagementTable
        columns={deliveryConfig.columns}
        records={page.records}
        emptyMessage="روش ارسالی برای نمایش پیدا نشد."
        itemLabel={deliveryConfig.itemLabel}
        onEdit={page.openEditForm}
        onDelete={page.deleteRecord}
        onUpdate={page.updateRecord}
      />
      {page.isFormOpen && (
        <ManagementFormModal
          title={deliveryConfig.itemLabel}
          fields={deliveryConfig.fields}
          record={page.editingRecord}
          onClose={page.closeForm}
          onSave={page.saveRecord}
        />
      )}
    </section>
  );
}
