import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../context/AdminContext';
import { ArrowRight, Shield, BarChart2, Monitor, Cloud, ScanLine, Settings, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import './Home.css';

const FEATURE_ICONS = [Shield, BarChart2, Monitor, Cloud, ScanLine, Settings];
const FEATURE_COLORS = ['#FF3B91', '#00C2D1', '#C6E32B', '#FF6B2C', '#FF3B91', '#00C2D1'];

const SOLUTIONS = [
  { key: 'healthcare', icon: '🏥', color: '#FF3B91', bg: '#fff0f6' },
  { key: 'education', icon: '🎓', color: '#00C2D1', bg: '#f0fdff' },
  { key: 'banking', icon: '🏦', color: '#C6E32B', bg: '#f9ffe0' },
  { key: 'government', icon: '🏛️', color: '#FF6B2C', bg: '#fff5f0' },
  { key: 'sme', icon: '🏢', color: '#FF3B91', bg: '#fff0f6' },
  { key: 'legal', icon: '⚖️', color: '#00C2D1', bg: '#f0fdff' },
];

const TESTIMONIALS = [
  { quote: 'TomboPrint sayesinde yazıcı yönetimimizi tamamen merkezileştirdik. Help Desk çağrıları dramatik şekilde azaldı.', name: 'Ahmet Yılmaz', role: 'BT Müdürü, Garanti BBVA', initials: 'AY', color: '#FF3B91' },
  { quote: 'Okullarımızdaki tüm yazıcıları tek panelden yönetmek inanılmaz kolaylık sağladı.', name: 'Dr. Zeynep Kaya', role: 'IT Direktörü, Bilkent Üniversitesi', initials: 'ZK', color: '#00C2D1' },
  { quote: 'Baskı maliyetlerimizi ilk yılda %28 oranında azalttık. Muhteşem bir yatırım getirisi.', name: 'Mehmet Demir', role: 'CTO, Anadolu Sigorta', initials: 'MD', color: '#C6E32B' },
];

export default function Home() {
  const { t } = useTranslation();
  const { content } = useAdmin();
  const [slide, setSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => setSlide(s => (s + 1) % content.sliders.length), 5000);
    return () => clearInterval(timer);
  }, [autoPlay, content.sliders.length]);

  const goSlide = (i) => { setSlide(i); setAutoPlay(false); };

  return (
    <main className="home">

      {/* HERO SLIDER */}
      <section className="hero">
        <div className="hero__slider">
          {content.sliders.map((sl, i) => (
            <div key={sl.id} className={`hero__slide ${i === slide ? 'hero__slide--active' : ''}`} style={{ background: sl.bg }}>
              <div className="hero__curl" />
              <div className="container hero__content">
                <span className="tag">{t('hero.tag')}</span>
                <h1 className="hero__title">{sl.title}</h1>
                <p className="hero__subtitle">{sl.subtitle}</p>
                <div className="hero__cta-row">
                  <Link to="/demo" className="btn-orange">{t('hero.cta_primary')} <ArrowRight size={16} /></Link>
                  <Link to="/features" className="btn-outline hero__btn-outline">{t('hero.cta_secondary')}</Link>
                </div>
              </div>
            </div>
          ))}
          <button className="hero__nav hero__nav--prev" onClick={() => goSlide((slide - 1 + content.sliders.length) % content.sliders.length)}><ChevronLeft size={20}/></button>
          <button className="hero__nav hero__nav--next" onClick={() => goSlide((slide + 1) % content.sliders.length)}><ChevronRight size={20}/></button>
          <div className="hero__dots">
            {content.sliders.map((_, i) => (
              <button key={i} className={`hero__dot ${i === slide ? 'hero__dot--active' : ''}`} onClick={() => goSlide(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="container stats__grid">
          {[
            { num: t('stats.s1_num'), lbl: t('stats.s1_lbl'), color: '#FF3B91' },
            { num: t('stats.s2_num'), lbl: t('stats.s2_lbl'), color: '#00C2D1' },
            { num: t('stats.s3_num'), lbl: t('stats.s3_lbl'), color: '#C6E32B' },
            { num: t('stats.s4_num'), lbl: t('stats.s4_lbl'), color: '#FF6B2C' },
          ].map((s, i) => (
            <div key={i} className="stats__item">
              <div className="stats__num" style={{ color: s.color }}>{s.num}</div>
              <div className="stats__lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="section features">
        <div className="container">
          <div className="section-header">
            <span className="tag">{t('nav.features')}</span>
            <h2>{t('features.title')}</h2>
            <p>{t('features.subtitle')}</p>
          </div>
          <div className="features__grid">
            {[1,2,3,4,5,6].map((n, i) => {
              const Icon = FEATURE_ICONS[i];
              return (
                <div key={n} className="features__card">
                  <div className="features__icon" style={{ background: FEATURE_COLORS[i] + '18', color: FEATURE_COLORS[i] }}>
                    <Icon size={22} />
                  </div>
                  <h3>{t(`features.f${n}_title`)}</h3>
                  <p>{t(`features.f${n}_desc`)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY TOMBOPRINT */}
      <section className="section why" style={{ background: 'var(--black)' }}>
        <div className="container why__inner">
          <div className="why__text">
            <span className="tag" style={{ background: 'rgba(255,107,44,0.15)', borderColor: 'rgba(255,107,44,0.3)' }}>Neden TomboPrint?</span>
            <h2 style={{ color: 'white' }}>Rakiplerinizin önüne geçin</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>
              Çok satıcılı destek, gelişmiş güvenlik protokolleri ve gerçek zamanlı raporlama ile kurumsal baskı yönetimini yeniden tanımlıyoruz.
            </p>
            <ul className="why__list">
              {['Multi-vendor yazıcı desteği (HP, Canon, Kyocera, Xerox…)', 'Bulut ve on-premise seçenekleri', 'Sektöre özel çözümler', 'ISO 27001 uyumlu güvenlik', '7/24 Türkçe destek'].map(item => (
                <li key={item}><CheckCircle size={16} color="var(--orange-bright)" /> {item}</li>
              ))}
            </ul>
            <Link to="/features" className="btn-orange" style={{ marginTop: 8 }}>Tüm Özellikleri Gör <ArrowRight size={16} /></Link>
          </div>
          <div className="why__visual">
            <div className="why__card-stack">
              <div className="why__stat-card" style={{ borderTopColor: '#FF3B91' }}>
                <span className="why__stat-num" style={{ color: '#FF3B91' }}>%50</span>
                <span>Daha Az Help Desk Çağrısı</span>
              </div>
              <div className="why__stat-card" style={{ borderTopColor: '#00C2D1', transform: 'translateX(24px)' }}>
                <span className="why__stat-num" style={{ color: '#00C2D1' }}>%30</span>
                <span>Maliyet Tasarrufu</span>
              </div>
              <div className="why__stat-card" style={{ borderTopColor: '#C6E32B', transform: 'translateX(48px)' }}>
                <span className="why__stat-num" style={{ color: '#C6E32B' }}>500+</span>
                <span>Kurumsal Müşteri</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="section solutions">
        <div className="container">
          <div className="section-header">
            <span className="tag">Sektörler</span>
            <h2>{t('solutions.title')}</h2>
            <p>{t('solutions.subtitle')}</p>
          </div>
          <div className="solutions__grid">
            {SOLUTIONS.map(s => (
              <Link key={s.key} to={`/solutions/${s.key}`} className="solutions__card">
                <div className="solutions__icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
                <h3>{t(`solutions.${s.key}`)}</h3>
                <ArrowRight size={16} className="solutions__arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section testimonials" style={{ background: 'var(--cream-dark)' }}>
        <div className="container">
          <div className="section-header">
            <span className="tag">Müşteri Hikayeleri</span>
            <h2>Müşterilerimiz Ne Diyor?</h2>
          </div>
          <div className="testimonials__grid">
            {TESTIMONIALS.map((t_, i) => (
              <div key={i} className="testimonials__card">
                <div className="testimonials__quote">"</div>
                <p>{t_.quote}</p>
                <div className="testimonials__author">
                  <div className="testimonials__avatar" style={{ background: t_.color + '20', color: t_.color }}>{t_.initials}</div>
                  <div>
                    <div className="testimonials__name">{t_.name}</div>
                    <div className="testimonials__role">{t_.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="section blog-preview">
        <div className="container">
          <div className="section-header section-header--row">
            <div>
              <span className="tag">{t('nav.resources')}</span>
              <h2>{t('blog.title')}</h2>
            </div>
            <Link to="/blog" className="btn-outline">Tümünü Gör <ArrowRight size={15}/></Link>
          </div>
          <div className="blog-preview__grid">
            {content.blog.slice(0, 3).map(post => (
              <Link key={post.id} to={`/blog/${post.id}`} className="blog-preview__card">
                <div className="blog-preview__cat">{post.category}</div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="blog-preview__footer">
                  <span>{new Date(post.date).toLocaleDateString('tr-TR', { day:'numeric', month:'long', year:'numeric' })}</span>
                  <span className="blog-preview__read">{t('blog.read_more')} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <div>
            <h2>TomboPrint'i deneyin</h2>
            <p>Ücretsiz demo ile platformu yakından keşfedin.</p>
          </div>
          <Link to="/demo" className="btn-orange">Demo Talep Et <ArrowRight size={16}/></Link>
        </div>
      </section>

    </main>
  );
}
