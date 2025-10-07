export default function ProductCard({ item, onAdd }) {
  return (
    <div
      className="card"
      style={{ display: "flex", flexDirection: "column", gap: 12 }}
    >
      <div style={{ fontWeight: 700 }}>{item.name}</div>
      <div className="small">${item.price.toFixed(2)}</div>
      <div style={{ marginTop: "auto" }}>
        <button className="button primary" onClick={() => onAdd(item)}>
          Add
        </button>
      </div>
    </div>
  );
}
