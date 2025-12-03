import Link from 'next/link';

export default function Home() {
  return (
    <div style={{textAlign:'center', marginTop:'50px'}}>
      <h1>Emoji Catalog</h1>
      <Link href="/catalog/text"><button>Text Only 10K</button></Link>
      <Link href="/catalog/character"><button>Character Emoji</button></Link>
      <Link href="/catalog/effect"><button>Special Effect Emoji</button></Link>
    </div>
  );
}
