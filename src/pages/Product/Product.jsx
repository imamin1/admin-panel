import { useEffect, useState } from "react";
import { getApiErrorMessage } from "../../api";
import useManagementRecords from "../../components/management/useManagementRecords";
import { listAdminRecords } from "../../services/admin-records.service";
import ProductAttributesModal from "./components/ProductAttributesModal";
import ProductFormModal from "./components/ProductFormModal";
import ProductTable from "./components/ProductTable";

const config = {
  resource: "products",
  columns: [{ key: "title", label: "عنوان" }],
};

const emptyCatalogs = { categories: [], brands: [], colors: [], warranties: [] };

export default function Product() {
  const page = useManagementRecords(config);
  const [catalogs, setCatalogs] = useState(emptyCatalogs);
  const [catalogError, setCatalogError] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);
  const [attributesProductId, setAttributesProductId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const loadCatalogs = async () => {
      try {
        const [categories, brands, colors, guarantees] = await Promise.all(
          ["categories", "brands", "colors", "guarantees"].map((resource) =>
            listAdminRecords(resource, {
              page: 1,
              perPage: 100,
              search: "",
              signal: controller.signal,
            }),
          ),
        );
        setCatalogs({
          categories: categories.data,
          brands: brands.data.map((brand) => brand.persianTitle),
          colors: colors.data.map((color) => ({
            name: color.title,
            value: color.value,
          })),
          warranties: guarantees.data.map((guarantee) => guarantee.title),
        });
      } catch (error) {
        if (error.name !== "CanceledError") setCatalogError(getApiErrorMessage(error));
      }
    };

    loadCatalogs();
    return () => controller.abort();
  }, []);

  const products = page.records;
  const filteredProducts = products;

  const editingProduct =
    products.find((product) => product.id === editingProductId) ?? null;
  const attributesProduct =
    products.find((product) => product.id === attributesProductId) ?? null;

  return (
    <>
      {catalogError && (
        <p role="alert" className="mb-4 text-sm text-red-700">{catalogError}</p>
      )}
      <ProductTable
        products={filteredProducts}
        categories={catalogs.categories}
        search={page.search}
        loading={page.isLoading}
        page={page.page}
        perPage={page.pagination.per_page}
        onSearchChange={(search) => {
          page.setSearch(search);
          page.setPage(1);
        }}
        onCreate={() => {
          page.openCreateForm();
          setEditingProductId(null);
          setIsFormOpen(true);
        }}
        onEdit={(product) => {
          page.openEditForm(product);
          setEditingProductId(product.id);
          setIsFormOpen(true);
        }}
        onEditAttributes={(product) => setAttributesProductId(product.id)}
        onDelete={page.deleteRecord}
      />
      {page.isLoading && products.length === 0 && (
        <p role="status" className="mt-4 text-center text-sm text-brand-dark/70">در حال دریافت محصولات...</p>
      )}
      {(page.error || page.notice || page.pagination.last_page > 1) && (
        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-brand/20 bg-white px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div aria-live="polite">
            {page.error && <p className="text-red-700">{page.error}</p>}
            {!page.error && page.notice && <p className="text-emerald-700">{page.notice}</p>}
          </div>
          {page.pagination.last_page > 1 && (
            <nav aria-label="صفحه‌بندی محصولات" className="flex items-center justify-center gap-3">
              <button type="button" disabled={page.isLoading || page.page <= 1} onClick={() => page.setPage(page.page - 1)} className="rounded-lg border border-brand/20 px-3 py-1.5 disabled:opacity-50">قبلی</button>
              <span>{page.page.toLocaleString("fa-IR")} / {page.pagination.last_page.toLocaleString("fa-IR")}</span>
              <button type="button" disabled={page.isLoading || page.page >= page.pagination.last_page} onClick={() => page.setPage(page.page + 1)} className="rounded-lg border border-brand/20 px-3 py-1.5 disabled:opacity-50">بعدی</button>
            </nav>
          )}
        </div>
      )}
      {isFormOpen && (
        <ProductFormModal
          key={editingProduct?.id ?? "new-product"}
          product={editingProduct}
          categories={catalogs.categories}
          brands={catalogs.brands}
          colors={catalogs.colors}
          warranties={catalogs.warranties}
          onClose={() => {
            page.closeForm();
            setIsFormOpen(false);
            setEditingProductId(null);
          }}
          onSave={async (data) => {
            const saved = await page.saveRecord(data);
            if (saved) {
              setIsFormOpen(false);
              setEditingProductId(null);
            }
            return saved;
          }}
        />
      )}
      {attributesProduct && (
        <ProductAttributesModal
          key={attributesProduct.id}
          product={attributesProduct}
          categories={catalogs.categories}
          onClose={() => setAttributesProductId(null)}
          onSave={async (attributeValues) => {
            const saved = await page.updateRecord(attributesProduct.id, { attributeValues });
            if (saved) setAttributesProductId(null);
            return saved;
          }}
        />
      )}
    </>
  );
}
