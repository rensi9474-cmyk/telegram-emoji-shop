import { useContext, useState } from "react";
import { CartContext } from "./_app";
import { SketchPicker } from "react-color";

export default function Order() {
  const { cart, setCart } = useContext(CartContext);
  const [note, setNote] = useState("");

  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(num);

  const updateItem = (index, field, value) => {
    const newCart = [...cart];
    newCart[index][field] = value;
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePay = () => {
    const itemsText = cart
      .map(
        (item) => `- ${item.name} (1x) — ${formatRupiah(item.price)}
  Brief: ${item.brief}
  Color: ${item.color}`
      )
      .join("\n\n");

    const message = `
Order Emoji Premium

Items:
${itemsText}

Catatan umum:
${note}

Total:
${formatRupiah(total)}
    `;

    window.location.href = `tg://resolve?domain=YourUsername&text=${encodeURIComponent(message)}`;
  };

  if (cart.length === 0) return <p>Keranjang kosong</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>View Order</h1>
      {cart.map((item, index) => (
        <div key={index} style={{ border: "1px solid #ddd", margin: "10px 0", padding: "10px" }}>
          <h3>{item.name}</h3>
          <p>{formatRupiah(item.price)}</p>

          <label>Request khusus:</label>
          <textarea
            value={item.brief}
            onChange={(e) => updateItem(index, "brief", e.target.value)}
            placeholder="Contoh: ekspresi marah tapi lucu"
            style={{ width: "100%", height: "60px" }}
          />

          <label>Pilih warna:</label>
          <SketchPicker
            color={item.color}
            onChangeComplete={(c) => updateItem(index, "color", c.hex)}
          />
        </div>
      ))}

      <label>Catatan tambahan:</label>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Contoh: versi dark mode juga"
        style={{ width: "100%", height: "80px" }}
      />

      <button
        onClick={handlePay}
        style={{ marginTop: "20px", background: "#4CAF50", color: "white", padding: "10px 20px" }}
      >
        PAY {formatRupiah(total)}
      </button>
    </div>
  );
}
