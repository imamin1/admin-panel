import ManagementFormModal from "../../components/management/ManagementFormModal";
import ManagementTable from "../../components/management/ManagementTable";
import ManagementToolbar from "../../components/management/ManagementToolbar";
import useManagementRecords from "../../components/management/useManagementRecords";
import cartConfig from "./data";

export default function Cart() {
  const page = useManagementRecords(cartConfig);

  return (
    <section dir="rtl" className="space-y-5">
      <h1 className="text-center text-xl font-bold text-brand-dark sm:text-2xl">
        {cartConfig.title}
      </h1>
      <ManagementToolbar
        search={page.search}
        onSearchChange={page.setSearch}
        searchPlaceholder={cartConfig.searchPlaceholder}
        addLabel="افزودن سبد خرید"
        onAdd={page.openCreateForm}
      />
      <ManagementTable
        columns={cartConfig.columns}
        records={page.records}
        emptyMessage="سبدی برای نمایش پیدا نشد."
        itemLabel={cartConfig.itemLabel}
        onEdit={page.openEditForm}
        onDelete={page.deleteRecord}
        onUpdate={page.updateRecord}
      />
      {page.isFormOpen && (
        <ManagementFormModal
          title={cartConfig.itemLabel}
          fields={cartConfig.fields}
          record={page.editingRecord}
          onClose={page.closeForm}
          onSave={page.saveRecord}
        />
      )}
    </section>
  );
}
