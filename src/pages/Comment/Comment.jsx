import ManagementFormModal from "../../components/management/ManagementFormModal";
import ManagementTable from "../../components/management/ManagementTable";
import ManagementToolbar from "../../components/management/ManagementToolbar";
import useManagementRecords from "../../components/management/useManagementRecords";
import commentConfig from "./data";

export default function Comment() {
  const page = useManagementRecords(commentConfig);

  return (
    <section dir="rtl" className="space-y-5">
      <h1 className="text-center text-xl font-bold text-brand-dark sm:text-2xl">
        {commentConfig.title}
      </h1>
      <ManagementToolbar
        search={page.search}
        onSearchChange={page.setSearch}
        searchPlaceholder={commentConfig.searchPlaceholder}
        addLabel="افزودن نظر"
        onAdd={page.openCreateForm}
      />
      <ManagementTable
        columns={commentConfig.columns}
        records={page.records}
        emptyMessage="نظری برای نمایش پیدا نشد."
        itemLabel={commentConfig.itemLabel}
        onEdit={page.openEditForm}
        onDelete={page.deleteRecord}
        onUpdate={page.updateRecord}
      />
      {page.isFormOpen && (
        <ManagementFormModal
          title={commentConfig.itemLabel}
          fields={commentConfig.fields}
          record={page.editingRecord}
          onClose={page.closeForm}
          onSave={page.saveRecord}
        />
      )}
    </section>
  );
}
