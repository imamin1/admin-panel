import ManagementFormModal from "../../components/management/ManagementFormModal";
import ManagementTable from "../../components/management/ManagementTable";
import ManagementToolbar from "../../components/management/ManagementToolbar";
import useManagementRecords from "../../components/management/useManagementRecords";
import userConfig from "./data";

export default function User() {
  const page = useManagementRecords(userConfig);

  return (
    <section dir="rtl" className="space-y-5">
      <h1 className="text-center text-xl font-bold text-brand-dark sm:text-2xl">
        {userConfig.title}
      </h1>
      <ManagementToolbar
        search={page.search}
        onSearchChange={page.setSearch}
        searchPlaceholder={userConfig.searchPlaceholder}
        addLabel="افزودن کاربر"
        onAdd={page.openCreateForm}
      />
      <ManagementTable
        columns={userConfig.columns}
        records={page.records}
        emptyMessage="کاربری برای نمایش پیدا نشد."
        itemLabel={userConfig.itemLabel}
        onEdit={page.openEditForm}
        onDelete={page.deleteRecord}
        onUpdate={page.updateRecord}
      />
      {page.isFormOpen && (
        <ManagementFormModal
          title={userConfig.itemLabel}
          fields={userConfig.fields}
          record={page.editingRecord}
          onClose={page.closeForm}
          onSave={page.saveRecord}
        />
      )}
    </section>
  );
}
