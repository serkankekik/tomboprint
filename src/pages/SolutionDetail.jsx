import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, CheckCircle } from 'lucide-react';
import './SolutionDetail.css';

const SOLUTION_DATA = {
  healthcare: {
    icon: '🏥',
    color: '#FF3B91',
    bg: '#fff0f6',
    titleTR: 'Sağlık Sektörü',
    titleEN: 'Healthcare',
    descTR: 'Hastaneler, klinikler ve sağlık kuruluşları için HIPAA uyumlu baskı yönetimi.',
    descEN: 'HIPAA-compliant print management for hospitals, clinics and healthcare facilities.',
    features: ['Hasta kayıtlarının güvenli baskısı', 'Kimlik doğrulamalı yazıcı erişimi', 'Audit log ve uyumluluk raporları', 'Acil durum baskı önceliklendirme', 'Mobil hemşire baskı desteği'],
    stat1: '%60', stat1_lbl: 'Daha Az Yetkisiz Baskı',
    stat2: '%40', stat2_lbl: 'Daha Hızlı Doküman İşleme',
  },
  education: {
    icon: '🎓',
    color: '#00C2D1',
    bg: '#f0fdff',
    titleTR: 'Eğitim',
    titleEN: 'Education',
    descTR: 'Üniversiteler, okullar ve eğitim kurumları için esnek kota ve baskı yönetimi.',
    descEN: 'Flexible quota and print management for universities, schools and educational institutions.',
    features: ['Öğrenci kota yönetimi', 'Kampüs geneli merkezi yönetim', 'Kimlik kartı ile baskı', 'Renkli/siyah-beyaz ayrıştırma', 'Ödeme entegrasyonu desteği'],
    stat1: '%50', stat1_lbl: 'Kağıt Tasarrufu',
    stat2: '10x', stat2_lbl: 'Daha Hızlı Kurulum',
  },
  banking: {
    icon: '🏦',
    color: '#C6E32B',
    bg: '#f9ffe0',
    titleTR: 'Bankacılık & Finans',
    titleEN: 'Banking & Finance',
    descTR: 'Bankalar ve finans kuruluşları için yüksek güvenlikli, denetlenebilir baskı yönetimi.',
    descEN: 'High-security, auditable print management for banks and financial institutions.',
    features: ['End-to-end şifreleme', 'Çok faktörlü kimlik doğrulama', 'Tam denetim izi', 'PCI-DSS uyumlu altyapı', 'Şube bazlı raporlama'],
    stat1: '%99.9', stat1_lbl: 'Uptime Garantisi',
    stat2: '%35', stat2_lbl: 'Maliyet Azaltma',
  },
  government: {
    icon: '🏛️',
    color: '#FF6B2C',
    bg: '#fff5f0',
    titleTR: 'Kamu',
    titleEN: 'Government',
    descTR: 'Kamu kurumları için güvenli, uyumlu ve merkezi baskı altyapısı.',
    descEN: 'Secure, compliant and centralized print infrastructure for government agencies.',
    features: ['Gizli belge yönetimi', 'Kurumsal kimlik entegrasyonu', 'Merkezi bütçe takibi', 'Gizlilik seviyeli baskı', 'Yerel veri depolama'],
    stat1: '%45', stat1_lbl: 'İdari Maliyet Tasarrufu',
    stat2: '%100', stat2_lbl: 'Yerel Veri Güvenliği',
  },
  sme: {
    icon: '🏢',
    color: '#FF3B91',
    bg: '#fff0f6',
    titleTR: 'KOBİ',
    titleEN: 'SMB',
    descTR: 'Küçük ve orta ölçekli işletmeler için hızlı kurulum ve uygun maliyetli baskı yönetimi.',
    descEN: 'Fast deployment and cost-effective print management for small and medium businesses.',
    features: ['30 dakikada kurulum', 'Kullanıcı başına lisanslama', 'Bulut tabanlı yönetim', 'Otomatik yazıcı keşfi', 'Türkçe müşteri desteği'],
    stat1: '%30', stat1_lbl: 'Maliyet Azaltma',
    stat2: '30dk', stat2_lbl: 'Ortalama Kurulum Süresi',
  },
  legal: {
    icon: '⚖️',
    color: '#00C2D1',
    bg: '#f0fdff',
    titleTR: 'Hukuk',
    titleEN: 'Legal',
    descTR: 'Hukuk büroları ve avukatlık ofisleri için gizli belge baskısı ve yönetimi.',
    descEN: 'Confidential document printing and management for law firms and legal offices.',
    features: ['Dava dosyası bazlı baskı takibi', 'Gizli belge koruma', 'Müvekkil bazlı maliyet dağılımı', 'Güvenli imha bildirimleri', 'Tam denetim kaydı'],
    stat1: '%55', stat1_lbl: 'Daha Az Güvenlik İhlali',
    stat2: '%25', stat2_lbl: 'Doküman İşlem Tasarrufu',
  },
};

export default function SolutionDetail() {
  const { sector } = useParams();
  const { i18n } = useTranslation();
  const data = SOLUTION_DATA[sector] || SOLUTION_DATA.healthcare;
  const isEN = i18n.language === 'en';

  return (
    <main style={{ marginTop: 64 }}>
      <div className="sol-hero" style={{ background: `linear-gradient(135deg, ${data.bg} 0%, white 100%)` }}>
        <div className="container sol-hero__inner">
          <div>
            <span className="tag">{isEN ? 'Solutions' : 'Çözümler'}</span>
            <div className="sol-icon">{data.icon}</div>
            <h1>{isEN ? data.titleEN : data.titleTR}</h1>
            <p>{isEN ? data.descEN : data.descTR}</p>
            <Link to="/demo" className="btn-orange" style={{ marginTop: 8 }}>
              {isEN ? 'Request Demo' : 'Demo Talep Et'} <ArrowRight size={16}/>
            </Link>
          </div>
          <div className="sol-stats">
            <div className="sol-stat" style={{ borderTopColor: data.color }}>
              <div className="sol-stat__num" style={{ color: data.color }}>{data.stat1}</div>
              <div className="sol-stat__lbl">{data.stat1_lbl}</div>
            </div>
            <div className="sol-stat" style={{ borderTopColor: data.color }}>
              <div className="sol-stat__num" style={{ color: data.color }}>{data.stat2}</div>
              <div className="sol-stat__lbl">{data.stat2_lbl}</div>
            </div>
          </div>
        </div>
      </div>

      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div className="sol-features-header">
            <h2>{isEN ? 'Key Features' : 'Temel Özellikler'}</h2>
          </div>
          <div className="sol-features-list">
            {data.features.map(f => (
              <div key={f} className="sol-feature-item">
                <CheckCircle size={20} color={data.color} />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sol-cta-bar" style={{ background: data.color }}>
        <div className="container sol-cta-inner">
          <div>
            <h2>{isEN ? `Ready to get started with ${data.titleEN}?` : `${data.titleTR} çözümünü deneyin`}</h2>
            <p>{isEN ? 'Request a personalized demo today.' : 'Ücretsiz demo ile platformu yakından keşfedin.'}</p>
          </div>
          <Link to="/demo" className="btn-outline" style={{ color: 'white', borderColor: 'white' }}>
            {isEN ? 'Get a Demo' : 'Demo Talep Et'} <ArrowRight size={15}/>
          </Link>
        </div>
      </div>
    </main>
  );
}
