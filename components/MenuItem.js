import Lottie from "lottie-react";

export default function MenuItem({ item, onOrder }) {
  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(num);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        margin: "10px 0",
        padding: "10px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        gap: "15px"
      }}
    >
      {/* Animasi Lottie */}
      <div style={{ width: 80, height: 80 }}>
        <Lottie
          animationData={require(`../public/${item.previewAssetId}.json`)}
          loop
        />
      </div>

      {/* Info Item */}
      <div style={{ flex: 1 }}>
        <h3>{item.name}</h3>
        <p>{item.desc}</p>
        <p>{formatRupiah(item.price)}</p>
      </div>

      {/* Tombol ORDER */}
      <button
        onClick={() => onOrder(item)}
        style={{ background: "#4CAF50", color: "white", padding: "8px 16px", borderRadius: "6px" }}
      >
        ORDER
      </button>
    </div>
  );
}
