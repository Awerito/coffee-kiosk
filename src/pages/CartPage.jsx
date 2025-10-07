import Cart from "../components/Cart";

export default function CartPage({ cart, onInc, onDec, onRemove }) {
  return <Cart cart={cart} onInc={onInc} onDec={onDec} onRemove={onRemove} />;
}
