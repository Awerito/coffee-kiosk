import { useState } from "react";
import ProductList from "../components/ProductList";

export default function MenuPage({ products, onAdd }) {
  const [querySearch, setQuerySearch] = useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <input
        className="input"
        placeholder="Search…"
        value={querySearch}
        onChange={(e) => setQuerySearch(e.target.value)}
      />
      <ProductList products={products} onAdd={onAdd} filter={querySearch} />
    </div>
  );
}
