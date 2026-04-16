import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown } from 'lucide-react';
import './Navbar.css';

const SOLUTIONS = [
  { key: 'healthcare', icon: '🏥' },
  { key: 'education', icon: '🎓' },
  { key: 'banking', icon: '🏦' },
  { key: 'government', icon: '🏛️' },
  { key: 'sme', icon: '🏢' },
  { key: 'legal', icon: '⚖️' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setDropdown(null); }, [location]);

  const toggleLang = () => i18n.changeLanguage(i18n.language === 'tr' ? 'en' : 'tr');

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo">
          <img src="/logo.svg" alt="TomboPrint" className="navbar__logo-img" onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
          <span className="navbar__logo-fallback">tombo<span className="navbar__logo-dot">●</span>print</span>
        </Link>

        <ul className="navbar__links">
          <li
            className="navbar__item navbar__item--dropdown"
            onMouseEnter={() => setDropdown('solutions')}
            onMouseLeave={() => setDropdown(null)}
          >
            <span className="navbar__link">{t('nav.solutions')} <ChevronDown size={14} /></span>
            {dropdown === 'solutions' && (
              <div className="navbar__dropdown">
                {SOLUTIONS.map(s => (
                  <Link key={s.key} to={`/solutions/${s.key}`} className="navbar__dropdown-item">
                    <span>{s.icon}</span> {t(`solutions.${s.key}`)}
                  </Link>
                ))}
              </div>
            )}
          </li>
          <li><Link to="/features" className="navbar__link">{t('nav.features')}</Link></li>
          <li><Link to="/partners" className="navbar__link">{t('nav.partners')}</Link></li>
          <li><Link to="/blog" className="navbar__link">{t('nav.resources')}</Link></li>
          <li><Link to="/about" className="navbar__link">{t('nav.about')}</Link></li>
          <li><Link to="/contact" className="navbar__link">{t('nav.contact')}</Link></li>
        </ul>

        <div className="navbar__right">
          <button className="navbar__lang" onClick={toggleLang}>
            {i18n.language === 'tr' ? 'EN' : 'TR'}
          </button>
          <Link to="/demo" className="btn-orange navbar__cta">{t('nav.demo')}</Link>
          <button className="navbar__burger" onClick={() => setMenuOpen(o => !o)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="navbar__mobile">
          <Link to="/" className="navbar__mobile-link">{t('nav.solutions')}</Link>
          <Link to="/features" className="navbar__mobile-link">{t('nav.features')}</Link>
          <Link to="/partners" className="navbar__mobile-link">{t('nav.partners')}</Link>
          <Link to="/blog" className="navbar__mobile-link">{t('nav.resources')}</Link>
          <Link to="/about" className="navbar__mobile-link">{t('nav.about')}</Link>
          <Link to="/contact" className="navbar__mobile-link">{t('nav.contact')}</Link>
          <Link to="/demo" className="btn-orange" style={{margin:'12px 20px'}}>{t('nav.demo')}</Link>
        </div>
      )}
    </nav>
  );
}
