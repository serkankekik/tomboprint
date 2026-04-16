import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../context/AdminContext';
import { ArrowRight } from 'lucide-react';
import './Blog.css';

const CATEGORY_COLORS = { 'Güvenlik': '#FF3B91', 'Bulut': '#00C2D1', 'Maliyet': '#C6E32B', 'default': '#FF6B2C' };

export default function Blog() {
  const { t } = useTranslation();
  const { content } = useAdmin();

  return (
    <main style={{ marginTop: 64 }}>
      <div className="blog-hero">
        <div className="container">
          <span className="tag">Blog</span>
          <h1>{t('blog.title')}</h1>
          <p>{t('blog.subtitle')}</p>
        </div>
      </div>

      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div className="blog-grid">
            {content.blog.map(post => (
              <Link key={post.id} to={`/blog/${post.id}`} className="blog-card">
                <div className="blog-card__img" style={{ background: (CATEGORY_COLORS[post.category] || '#FF6B2C') + '18' }}>
                  <div className="blog-card__cat" style={{ background: CATEGORY_COLORS[post.category] || '#FF6B2C' }}>{post.category}</div>
                </div>
                <div className="blog-card__body">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="blog-card__footer">
                    <span>{new Date(post.date).toLocaleDateString('tr-TR', { day:'numeric', month:'long', year:'numeric' })}</span>
                    <span className="blog-card__cta">{t('blog.read_more')} <ArrowRight size={13}/></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
