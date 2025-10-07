import { useState, useMemo } from "react";

function money(n) {
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function Checkout({ cart }) {
  const [tipPct, setTipPct] = useState(10);
  const [custom, setCustom] = useState("");

  const subtotal = useMemo(
    () => cart.reduce((acc, it) => acc + it.price * it.qty, 0),
    [cart],
  );
  const pct = custom !== "" ? Number(custom) || 0 : tipPct;
  const tip = subtotal * (pct / 100);
  const total = subtotal + tip;

  if (!cart.length) {
    return <p className="small">Cart is empty. Add items to proceed.</p>;
  }

  return (
    <div
      className="card"
      style={{ display: "flex", flexDirection: "column", gap: 12 }}
    >
      <div className="row" style={{ gap: 8 }}>
        {[10, 15, 20].map((p) => (
          <button
            key={p}
            className={`button ${pct === p ? "primary" : ""}`}
            onClick={() => {
              setTipPct(p);
              setCustom("");
            }}
          >
            Tip {p}%
          </button>
        ))}
        <input
          className="input"
          style={{ maxWidth: 120 }}
          type="number"
          placeholder="Custom %"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
        />
      </div>

      <div className="row" style={{ justifyContent: "space-between" }}>
        <span>Subtotal</span>
        <span>${money(subtotal)}</span>
      </div>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <span>Tip ({pct}%)</span>
        <span>${money(tip)}</span>
      </div>
      <hr />
      <div className="row" style={{ justifyContent: "space-between" }}>
        <span className="total">Total</span>
        <span className="total">${money(total)}</span>
      </div>

      <div>
        <button
          className="button primary"
          disabled={!cart.length}
          onClick={() => alert(`Order confirmed! Total: $${money(total)}`)}
        >
          Confirm order
        </button>
      </div>
    </div>
  );
}
