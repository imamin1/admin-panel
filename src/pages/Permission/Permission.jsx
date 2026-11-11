import ManagementTable from "../../components/management/ManagementTable";
import ManagementToolbar from "../../components/management/ManagementToolbar";
import useManagementRecords from "../../components/management/useManagementRecords";
import permissionConfig from "./data";

export default function Permission() {
  const page = useManagementRecords(permissionConfig);

  return (
    <section dir="rtl" className="space-y-5">
      <h1 className="text-center text-xl font-bold text-brand-dark sm:text-2xl">
        {permissionConfig.title}
      </h1>
      <ManagementToolbar
        search={page.search}
        onSearchChange={page.setSearch}
        searchPlaceholder={permissionConfig.searchPlaceholder}
      />
      <ManagementTable
        columns={permissionConfig.columns}
        records={page.records}
        emptyMessage="مجوزی برای نمایش پیدا نشد."
        itemLabel={permissionConfig.itemLabel}
        onUpdate={page.updateRecord}
      />
    </section>
  );
}
