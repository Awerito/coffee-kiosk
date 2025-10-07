import { useMemo, useState } from "react";
import "./styles.css";
import { PRODUCTS } from "./data";
import Header from "./components/Header";
import TabBar from "./components/TabBar";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

export default function App() {
  const [tab, setTab] = useState("menu"); // "menu" | "cart" | "checkout"
  const [cart, setCart] = useState([]); // [{id, name, price, qty}]

  // Helpers
  const cartCount = useMemo(
    () => cart.reduce((a, it) => a + it.qty, 0),
    [cart],
  );

  const onAdd = (prod) => {
    setCart((prev) => {
      const found = prev.find((it) => it.id === prod.id);
      if (!found) return [...prev, { ...prod, qty: 1 }];
      return prev.map((it) =>
        it.id === prod.id ? { ...it, qty: it.qty + 1 } : it,
      );
    });
  };

  const onInc = (id) =>
    setCart((prev) =>
      prev.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it)),
    );
  const onDec = (id) =>
    setCart((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it,
      ),
    );
  const onRemove = (id) => setCart((prev) => prev.filter((it) => it.id !== id));

  return (
    <div className="container">
      <Header />
      <div className="card" style={{ marginBottom: 12 }}>
        <TabBar tab={tab} onSelect={setTab} cartCount={cartCount} />
      </div>

      {tab === "menu" && <MenuPage products={PRODUCTS} onAdd={onAdd} />}
      {tab === "cart" && (
        <CartPage cart={cart} onInc={onInc} onDec={onDec} onRemove={onRemove} />
      )}
      {tab === "checkout" && <CheckoutPage cart={cart} />}
    </div>
  );
}
