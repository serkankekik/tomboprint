import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../context/AdminContext';
import { CheckCircle, ArrowRight } from 'lucide-react';
import './Demo.css';

const BENEFITS = [
  'Platforma özel canlı demo',
  'Sektörünüze uygun kullanım senaryoları',
  'Teknik ekiple birebir görüşme',
  'Fiyatlandırma ve lisans bilgisi',
  'Kurulum ve entegrasyon desteği',
];

export default function Demo() {
  const { t } = useTranslation();
  const { submitDemo } = useAdmin();
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name:'', email:'', company:'', phone:'', size:'', sector:'' });

  const handle = e => setForm({...form, [e.target.name]: e.target.value});
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try { await submitDemo(form); } catch { /* ignore */ }
    setSubmitting(false);
    setSent(true);
  };

  return (
    <main style={{ marginTop: 64 }}>
      <div className="demo-hero">
        <div className="container demo-hero__inner">
          <div className="demo-hero__left">
            <span className="tag">{t('nav.demo')}</span>
            <h1>{t('demo.title')}</h1>
            <p>{t('demo.subtitle')}</p>
            <ul className="demo-benefits">
              {BENEFITS.map(b => (
                <li key={b}><CheckCircle size={16} color="var(--orange-bright)" />{b}</li>
              ))}
            </ul>
          </div>
          <div className="demo-form-wrap">
            {sent ? (
              <div className="demo-success">
                <div className="demo-success__icon">✓</div>
                <h3>{t('demo.success')}</h3>
                <p>Ekibimiz 24 saat içinde sizinle iletişime geçecektir.</p>
              </div>
            ) : (
              <form className="demo-form" onSubmit={handleSubmit}>
                <h3>Demo Talep Formu</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>{t('demo.name')}</label>
                    <input name="name" required value={form.name} onChange={handle} placeholder="Ad Soyad" />
                  </div>
                  <div className="form-group">
                    <label>{t('demo.email')}</label>
                    <input name="email" type="email" required value={form.email} onChange={handle} placeholder="email@sirket.com" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>{t('demo.company')}</label>
                    <input name="company" required value={form.company} onChange={handle} placeholder="Şirket adı" />
                  </div>
                  <div className="form-group">
                    <label>{t('demo.phone')}</label>
                    <input name="phone" value={form.phone} onChange={handle} placeholder="+90 5xx xxx xx xx" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Şirket Büyüklüğü</label>
                    <select name="size" value={form.size} onChange={handle}>
                      <option value="">Seçiniz</option>
                      <option>1–50 çalışan</option>
                      <option>51–200 çalışan</option>
                      <option>201–1000 çalışan</option>
                      <option>1000+ çalışan</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Sektör</label>
                    <select name="sector" value={form.sector} onChange={handle}>
                      <option value="">Seçiniz</option>
                      <option>Sağlık</option>
                      <option>Eğitim</option>
                      <option>Bankacılık & Finans</option>
                      <option>Kamu</option>
                      <option>KOBİ</option>
                      <option>Hukuk</option>
                      <option>Diğer</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn-orange demo-submit">
                  {t('demo.submit')} <ArrowRight size={16}/>
                </button>
                <p className="demo-privacy">* Kişisel verileriniz üçüncü taraflarla paylaşılmaz.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
