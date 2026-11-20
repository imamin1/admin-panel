import ManagementFormModal from "./ManagementFormModal";
import ManagementTable from "./ManagementTable";
import ManagementToolbar from "./ManagementToolbar";
import useManagementRecords from "./useManagementRecords";

export default function ManagementResourcePage({ config }) {
  const page = useManagementRecords(config);

  return (
    <section dir="rtl" className="space-y-5">
      <h1 className="text-center text-xl font-bold text-brand-dark sm:text-2xl">
        {config.title}
      </h1>
      <ManagementToolbar
        search={page.search}
        onSearchChange={(value) => {
          page.setSearch(value);
          page.setPage(1);
        }}
        searchPlaceholder={config.searchPlaceholder}
        addLabel={config.addLabel}
        onAdd={page.openCreateForm}
      />
      <ManagementTable
        columns={config.columns}
        records={page.records}
        emptyMessage={config.emptyMessage}
        itemLabel={config.itemLabel}
        onEdit={page.openEditForm}
        onDelete={page.deleteRecord}
        onUpdate={page.updateRecord}
        loading={page.isLoading}
        error={page.error}
        notice={page.notice}
        pagination={page.pagination}
        onPageChange={page.setPage}
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
