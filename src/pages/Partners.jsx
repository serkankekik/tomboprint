import { useAdmin } from '../context/AdminContext';
import './Partners.css';

const PARTNER_DETAILS = [
  { name: 'HP', desc: 'LaserJet ve MFP serisi tam entegrasyon', color: '#0096D6' },
  { name: 'Canon', desc: 'imageRUNNER ve imagePRESS tam destek', color: '#CC0000' },
  { name: 'Kyocera', desc: 'ECOSYS serisi çok yönlü entegrasyon', color: '#E31937' },
  { name: 'Xerox', desc: 'VersaLink ve AltaLink serisi desteği', color: '#E6203A' },
  { name: 'Ricoh', desc: 'IM ve SP serisi tam uyumluluk', color: '#005BAC' },
  { name: 'Brother', desc: 'HL ve MFC serisi entegrasyonu', color: '#00205B' },
];

const BECOME_PARTNER = [
  { title: 'Sertifikalı Partner', desc: 'Temel eğitim ve satış desteği', color: '#C6E32B' },
  { title: 'Silver Partner', desc: 'Gelişmiş teknik destek ve demo lisansı', color: '#8B9BB0' },
  { title: 'Gold Partner', desc: 'Öncelikli destek, ortak pazarlama ve özel fiyatlandırma', color: '#FFB800' },
];

export default function Partners() {
  const { content } = useAdmin();

  return (
    <main style={{ marginTop: 64 }}>
      <div className="partners-hero">
        <div className="container">
          <span className="tag">Partnerler</span>
          <h1>Güçlü Partner Ekosistemi</h1>
          <p>Dünya'nın önde gelen yazıcı üreticileri ve teknoloji şirketleriyle stratejik iş birliği.</p>
        </div>
      </div>

      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div className="section-header">
            <span className="tag">Desteklenen Markalar</span>
            <h2>Multi-Vendor Destek</h2>
            <p>Tüm büyük yazıcı markalarıyla uyumlu — tek platform, tüm filo.</p>
          </div>
          <div className="partners-grid">
            {PARTNER_DETAILS.map(p => (
              <div key={p.name} className="partner-card">
                <div className="partner-logo" style={{ color: p.color }}>{p.name}</div>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--black)' }}>
        <div className="container">
          <div className="section-header">
            <span className="tag">Partner Programı</span>
            <h2 style={{ color: 'white' }}>Partner Olun</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>TomboPrint partner programına katılın, birlikte büyüyelim.</p>
          </div>
          <div className="partner-tiers">
            {BECOME_PARTNER.map((tier, i) => (
              <div key={tier.title} className="partner-tier" style={{ borderTopColor: tier.color }}>
                <div className="partner-tier__badge" style={{ background: tier.color + '20', color: tier.color }}>{tier.title}</div>
                <p>{tier.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <a href="mailto:info@tomboprint.com" className="btn-orange">Partner Başvurusu Yap</a>
          </div>
        </div>
      </section>
    </main>
  );
}
