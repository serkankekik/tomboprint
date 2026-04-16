import { useTranslation } from 'react-i18next';
import { Shield, BarChart2, Monitor, Cloud, ScanLine, Settings, Lock, Globe, Smartphone, Zap } from 'lucide-react';
import './Features.css';

const FEATURES = [
  { Icon: Shield, color: '#FF3B91', key: 'f1' },
  { Icon: BarChart2, color: '#00C2D1', key: 'f2' },
  { Icon: Monitor, color: '#C6E32B', key: 'f3' },
  { Icon: Cloud, color: '#FF6B2C', key: 'f4' },
  { Icon: ScanLine, color: '#FF3B91', key: 'f5' },
  { Icon: Settings, color: '#00C2D1', key: 'f6' },
];

const HIGHLIGHTS = [
  { Icon: Lock, title: 'Zero-Trust Güvenlik', desc: 'Her baskı işlemi kimlik doğrulamasından geçer. Yetkisiz erişim imkânsız.' },
  { Icon: Globe, title: 'Multi-Vendor Destek', desc: 'HP, Canon, Kyocera, Xerox, Ricoh ve daha fazlası — tek platformda.' },
  { Icon: Smartphone, title: 'Mobil Baskı', desc: 'iOS ve Android uygulamalarıyla her cihazdan güvenli baskı.' },
  { Icon: Zap, title: 'Kolay Kurulum', desc: '30 dakikada devreye alın, otomatik keşif ile tüm yazıcılar anında görünür.' },
];

export default function Features() {
  const { t } = useTranslation();
  return (
    <main style={{ marginTop: 64 }}>
      <div className="features-hero">
        <div className="container">
          <span className="tag">Özellikler</span>
          <h1>{t('features.title')}</h1>
          <p>{t('features.subtitle')}</p>
        </div>
      </div>

      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div className="feat-grid">
            {FEATURES.map(({ Icon, color, key }) => (
              <div key={key} className="feat-card">
                <div className="feat-icon" style={{ background: color + '18', color }}>
                  <Icon size={28} />
                </div>
                <h3>{t(`features.${key}_title`)}</h3>
                <p>{t(`features.${key}_desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section highlights" style={{ background: 'var(--black)' }}>
        <div className="container">
          <div className="section-header" style={{ color: 'white' }}>
            <span className="tag">Öne Çıkanlar</span>
            <h2 style={{ color: 'white' }}>Rakiplerinizden Farkınız</h2>
          </div>
          <div className="highlights-grid">
            {HIGHLIGHTS.map(({ Icon, title, desc }) => (
              <div key={title} className="highlight-card">
                <div className="highlight-icon"><Icon size={24} color="var(--orange-bright)" /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
