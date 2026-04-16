import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../context/AdminContext';
import { MapPin, Mail, Phone, Send } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const { t } = useTranslation();
  const { content, submitContact } = useAdmin();
  const { about } = content;
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name:'', email:'', company:'', message:'' });

  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitContact(form);
    } catch { /* ignore */ }
    setSubmitting(false);
    setSent(true);
  };

  return (
    <main style={{ marginTop: 64 }}>
      <div className="contact-hero">
        <div className="container">
          <span className="tag">İletişim</span>
          <h1>{t('contact.title')}</h1>
          <p>{t('contact.subtitle')}</p>
        </div>
      </div>

      <section className="section" style={{ background: 'white' }}>
        <div className="container contact-grid">
          <div className="contact-info">
            <div className="contact-info-item">
              <div className="contact-info-icon" style={{ background: '#fff0f6', color: '#FF3B91' }}><MapPin size={20}/></div>
              <div><strong>{t('about.address')}</strong><p>{about.address}</p></div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon" style={{ background: '#f0fdff', color: '#00C2D1' }}><Mail size={20}/></div>
              <div><strong>{t('about.email')}</strong><p><a href={`mailto:${about.email}`}>{about.email}</a></p></div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon" style={{ background: 'var(--orange-dim)', color: 'var(--orange)' }}><Phone size={20}/></div>
              <div><strong>{t('about.phone')}</strong><p><a href={`tel:${about.phone}`}>{about.phone}</a></p></div>
            </div>
            <div className="contact-map">
              <iframe
                title="TomboPrint Konum"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3059.0!2d32.75!3d39.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDUyJzEyLjAiTiAzMsKwNDUnMDAuMCJF!5e0!3m2!1str!2str!4v1700000000000"
                width="100%" height="200" style={{ border:0, borderRadius: 12 }} allowFullScreen loading="lazy"
              />
            </div>
          </div>

          <div className="contact-form-wrap">
            {sent ? (
              <div className="contact-success">
                <div style={{ fontSize: 48 }}>✓</div>
                <h3>{t('contact.success')}</h3>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>{t('contact.name')}</label>
                    <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Ad Soyad" />
                  </div>
                  <div className="form-group">
                    <label>{t('contact.email')}</label>
                    <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="email@sirket.com" />
                  </div>
                </div>
                <div className="form-group">
                  <label>{t('contact.company')}</label>
                  <input value={form.company} onChange={e => setForm({...form, company: e.target.value})} placeholder="Şirket adı" />
                </div>
                <div className="form-group">
                  <label>{t('contact.message')}</label>
                  <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Mesajınızı buraya yazın..." />
                </div>
                <button type="submit" className="btn-orange contact-submit">
                  <Send size={16}/> {t('contact.send')}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
