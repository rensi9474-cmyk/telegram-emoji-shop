import { createContext, useState } from "react";
import "../styles.css";

export const CartContext = createContext();

export default function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <Component {...pageProps} />
    </CartContext.Provider>
  );
}
