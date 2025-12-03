import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { CartContext } from "./_app";

export default function Home() {
  const [menu, setMenu] = useState([]);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    fetch("/data/menu.json")
      .then((res) => res.json())
      .then((data) => setMenu(data.meta.items));
  }, []);

  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(num);

  const addToCart = (item) => {
    setCart([...cart, { ...item, brief: "", color: "#000000" }]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Emoji Premium Menu</h1>
      {menu.map((item) => (
        <div key={item.id} style={{ border: "1px solid #ddd", margin: "10px 0", padding: "10px" }}>
          <h3>{item.name}</h3>
          <p>{item.desc}</p>
          <p>{formatRupiah(item.price)}</p>
          <button onClick={() => addToCart(item)} style={{ background: "#4CAF50", color: "white" }}>
            ORDER
          </button>
        </div>
      ))}
      <Link href="/order">
        <button style={{ marginTop: "20px", background: "#2196F3", color: "white" }}>
          View Order ({cart.length})
        </button>
      </Link>
    </div>
  );
}
