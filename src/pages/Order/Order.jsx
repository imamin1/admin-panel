import ManagementFormModal from "../../components/management/ManagementFormModal";
import ManagementTable from "../../components/management/ManagementTable";
import ManagementToolbar from "../../components/management/ManagementToolbar";
import useManagementRecords from "../../components/management/useManagementRecords";
import orderConfig from "./data";

export default function Order() {
  const page = useManagementRecords(orderConfig);

  return (
    <section dir="rtl" className="space-y-5">
      <h1 className="text-center text-xl font-bold text-brand-dark sm:text-2xl">
        {orderConfig.title}
      </h1>
      <ManagementToolbar
        search={page.search}
        onSearchChange={page.setSearch}
        searchPlaceholder={orderConfig.searchPlaceholder}
        addLabel="افزودن سفارش"
        onAdd={page.openCreateForm}
      />
      <ManagementTable
        columns={orderConfig.columns}
        records={page.records}
        emptyMessage="سفارشی برای نمایش پیدا نشد."
        itemLabel={orderConfig.itemLabel}
        onEdit={page.openEditForm}
        onDelete={page.deleteRecord}
        onUpdate={page.updateRecord}
      />
      {page.isFormOpen && (
        <ManagementFormModal
          title={orderConfig.itemLabel}
          fields={orderConfig.fields}
          record={page.editingRecord}
          onClose={page.closeForm}
          onSave={page.saveRecord}
        />
      )}
    </section>
  );
}
