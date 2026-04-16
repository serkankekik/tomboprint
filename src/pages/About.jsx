import { useTranslation } from 'react-i18next';
import { useAdmin } from '../context/AdminContext';
import { MapPin, Mail, Phone, Users, Building, Calendar } from 'lucide-react';
import './About.css';

export default function About() {
  const { t } = useTranslation();
  const { content } = useAdmin();
  const { about } = content;

  return (
    <main style={{ marginTop: 64 }}>
      <div className="about-hero">
        <div className="container">
          <span className="tag">Hakkımızda</span>
          <h1>{t('about.title')}</h1>
          <p>{t('about.subtitle')}</p>
        </div>
      </div>

      <section className="section" style={{ background: 'white' }}>
        <div className="container about-grid">
          <div className="about-mission">
            <h2>{t('about.mission')}</h2>
            <p>{about.mission}</p>
            <div className="about-stats">
              <div className="about-stat">
                <Calendar size={20} color="var(--orange-bright)" />
                <div><strong>{about.founded}</strong><span>Kuruluş Yılı</span></div>
              </div>
              <div className="about-stat">
                <Users size={20} color="#FF3B91" />
                <div><strong>{about.team}</strong><span>Çalışan</span></div>
              </div>
              <div className="about-stat">
                <Building size={20} color="#00C2D1" />
                <div><strong>{about.customers}</strong><span>Kurumsal Müşteri</span></div>
              </div>
            </div>
          </div>

          <div className="about-contact-card">
            <h3>İletişim Bilgileri</h3>
            <div className="about-contact-item">
              <MapPin size={18} color="var(--orange-bright)" />
              <span>{about.address}</span>
            </div>
            <div className="about-contact-item">
              <Mail size={18} color="#FF3B91" />
              <a href={`mailto:${about.email}`}>{about.email}</a>
            </div>
            <div className="about-contact-item">
              <Phone size={18} color="#00C2D1" />
              <a href={`tel:${about.phone}`}>{about.phone}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--black)' }}>
        <div className="container">
          <div className="section-header">
            <span className="tag">Değerlerimiz</span>
            <h2 style={{ color: 'white' }}>Bizi Biz Yapan Değerler</h2>
          </div>
          <div className="values-grid">
            {[
              { title: 'Güvenlik Önce', desc: 'Her ürünümüzü güvenlik merkezli tasarlarız.', color: '#FF3B91' },
              { title: 'Müşteri Odaklı', desc: 'Müşteri geri bildirimi ürün yol haritamızı şekillendirir.', color: '#00C2D1' },
              { title: 'Sürekli Yenilik', desc: 'Teknoloji hız kazandıkça biz de hızlanırız.', color: '#C6E32B' },
              { title: 'Yerel Güç', desc: 'Türkiye\'den dünyaya ulaşan bir yazılım şirketiyiz.', color: '#FF6B2C' },
            ].map(v => (
              <div key={v.title} className="value-card" style={{ borderTopColor: v.color }}>
                <div className="value-dot" style={{ background: v.color }} />
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
