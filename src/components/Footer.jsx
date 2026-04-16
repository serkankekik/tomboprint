import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">tombo<span>●</span>print</div>
            <p className="footer__desc">{t('footer.desc')}</p>
            <p className="footer__address">Üniversiteler Mh, Bilkent Cyberpark<br />No:Z39, 06800 Çankaya, Ankara, TR</p>
          </div>
          <div className="footer__col">
            <h4>{t('footer.solutions')}</h4>
            <Link to="/solutions/healthcare">Sağlık</Link>
            <Link to="/solutions/education">Eğitim</Link>
            <Link to="/solutions/banking">Bankacılık</Link>
            <Link to="/solutions/government">Kamu</Link>
            <Link to="/solutions/sme">KOBİ</Link>
            <Link to="/solutions/legal">Hukuk</Link>
          </div>
          <div className="footer__col">
            <h4>Ürün</h4>
            <Link to="/features">Özellikler</Link>
            <Link to="/partners">Partnerler</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/demo">Demo Talep Et</Link>
          </div>
          <div className="footer__col">
            <h4>{t('footer.company')}</h4>
            <Link to="/about">Hakkımızda</Link>
            <Link to="/contact">İletişim</Link>
            <a href="mailto:info@tomboprint.com">info@tomboprint.com</a>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} TomboPrint · {t('footer.rights')}</span>
          <div className="footer__bottom-links">
            <Link to="/privacy">Gizlilik Politikası</Link>
            <Link to="/admin">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
