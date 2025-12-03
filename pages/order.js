import { useState } from 'react';
import { SketchPicker } from 'react-color';
import { useRouter } from 'next/router';

export default function Order() {
  const router = useRouter();
  const { emoji } = router.query;
  const [text, setText] = useState('');
  const [color, setColor] = useState('');
  const [ready, setReady] = useState(false);

  const handleColor = (c) => {
    setColor(c.hex);
    setReady(true);
  };

  const sendOrder = () => {
    const data = {
      emoji_link: `https://emoji-shop.vercel.app/emoji/${emoji}`,
      customer_text: text,
      color_code: color
    };
    window.Telegram.WebApp.sendData(JSON.stringify(data));
  };

  return (
    <div style={{textAlign:'center'}}>
      <h2>Order Emoji</h2>
      <input placeholder="Catatan" value={text} onChange={(e)=>setText(e.target.value)} />
      <SketchPicker color={color} onChangeComplete={handleColor} />
      <button style={{background: ready ? 'blue':'transparent'}} onClick={sendOrder}>
        Bayar Sekarang
      </button>
    </div>
  );
}
