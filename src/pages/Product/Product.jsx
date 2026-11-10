import { useMemo, useState } from "react";
import ProductAttributesModal from "./components/ProductAttributesModal";
import ProductFormModal from "./components/ProductFormModal";
import ProductTable from "./components/ProductTable";
import { initialProducts, productCategories } from "./data";

export default function Product() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);
  const [attributesProductId, setAttributesProductId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase();
    return products.filter((product) =>
      product.title.toLocaleLowerCase().includes(normalizedSearch),
    );
  }, [products, search]);

  const openCreateForm = () => {
    setEditingProductId(null);
    setIsFormOpen(true);
  };

  const openEditForm = (product) => {
    setEditingProductId(product.id);
    setIsFormOpen(true);
  };

  const saveProduct = (productData) => {
    if (editingProductId === null) {
      setProducts((current) => [
        ...current,
        { id: Date.now(), ...productData },
      ]);
    } else {
      setProducts((current) =>
        current.map((product) =>
          product.id === editingProductId
            ? { ...product, ...productData }
            : product,
        ),
      );
    }
    setIsFormOpen(false);
    setEditingProductId(null);
  };

  const saveAttributeValues = (attributeValues) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === attributesProductId
          ? { ...product, attributeValues }
          : product,
      ),
    );
    setAttributesProductId(null);
  };

  const deleteProduct = (id) => {
    setProducts((current) => current.filter((product) => product.id !== id));
  };

  const editingProduct =
    products.find((product) => product.id === editingProductId) ?? null;
  const attributesProduct =
    products.find((product) => product.id === attributesProductId) ?? null;

  return (
    <>
      <ProductTable
        products={filteredProducts}
        categories={productCategories}
        search={search}
        onSearchChange={setSearch}
        onCreate={openCreateForm}
        onEdit={openEditForm}
        onEditAttributes={(product) => setAttributesProductId(product.id)}
        onDelete={deleteProduct}
      />

      {isFormOpen && (
        <ProductFormModal
          key={editingProduct?.id ?? "new-product"}
          product={editingProduct}
          categories={productCategories}
          onClose={() => {
            setIsFormOpen(false);
            setEditingProductId(null);
          }}
          onSave={saveProduct}
        />
      )}

      {attributesProduct && (
        <ProductAttributesModal
          key={attributesProduct.id}
          product={attributesProduct}
          categories={productCategories}
          onClose={() => setAttributesProductId(null)}
          onSave={saveAttributeValues}
        />
      )}
    </>
  );
}
