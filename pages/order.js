import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { SketchPicker } from "react-color";

export default function Order() {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState(null);
  const [brief, setBrief] = useState("");
  const [color, setColor] = useState("#000000");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (id) {
      fetch("/data/menu.json")
        .then((res) => res.json())
        .then((data) => {
          const found = data.meta.items.find((i) => i.id === id);
          setItem(found);
        });
    }
  }, [id]);

  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);

  const handlePay = () => {
    const message = `
Order Emoji Premium

Item:
- ${item.name} (1x) — ${formatRupiah(item.price)}
  Brief: ${brief}
  Color: ${color}

Catatan umum:
${note}

Total:
${formatRupiah(item.price)}
    `;
    // Redirect ke chat Telegram kamu
    window.location.href = `tg://resolve?domain=YourUsername&text=${encodeURIComponent(
      message
    )}`;
  };

  if (!item) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>View Order</h1>
      <h3>{item.name}</h3>
      <p>{item.desc}</p>
      <p>{formatRupiah(item.price)}</p>

      <label>Request khusus:</label>
      <textarea
        value={brief}
        onChange={(e) => setBrief(e.target.value)}
        placeholder="Contoh: ekspresi marah tapi lucu"
        style={{ width: "100%", height: "80px" }}
      />

      <label>Pilih warna:</label>
      <SketchPicker
        color={color}
        onChangeComplete={(c) => setColor(c.hex)}
      />

      <label>Catatan tambahan:</label>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Contoh: versi dark mode juga"
        style={{ width: "100%", height: "80px" }}
      />

      <button
        onClick={handlePay}
        style={{
          marginTop: "20px",
          background: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          borderRadius: "8px",
        }}
      >
        PAY {formatRupiah(item.price)}
      </button>
    </div>
  );
}
