import ProductCard from "./ProductCard";

export default function ProductList({ products = [], onAdd, filter = "" }) {
  const q = filter.trim().toLowerCase();
  const visible = q
    ? products.filter((p) => p.name.toLowerCase().includes(q))
    : products;

  return (
    <div className="grid">
      {visible.map((p) => (
        <ProductCard key={p.id} item={p} onAdd={onAdd} />
      ))}
    </div>
  );
}
