import Link from 'next/link';

export default function TextCatalog() {
  return (
    <div style={{textAlign:'center'}}>
      <h2>Text Emoji</h2>
      <lottie-player src="/emoji/text1.tgs" background="transparent" speed="1" loop autoplay></lottie-player>
      <p>Harga: Rp10.000</p>
      <Link href="/order?emoji=text1.tgs"><button>ORDER</button></Link>
    </div>
  );
}
