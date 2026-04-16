import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { LogOut, Plus, Trash2, Save, Image, FileText, Info, Users } from 'lucide-react';
import './Admin.css';

const TABS = [
  { id: 'sliders', label: 'Slider / Banner', Icon: Image },
  { id: 'blog', label: 'Blog Yazıları', Icon: FileText },
  { id: 'about', label: 'Hakkımızda', Icon: Info },
  { id: 'partners', label: 'Partnerler', Icon: Users },
];

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const handle = async (e) => {
    e.preventDefault();
    setLoading(true);
    const ok = await onLogin(username, pass);
    setLoading(false);
    if (!ok) setErr(true);
  };
  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__logo">tombo<span>●</span>print</div>
        <h2>Admin Girişi</h2>
        <form onSubmit={handle}>
          <input type="text" placeholder="Kullanıcı adı" value={username} onChange={e => { setUsername(e.target.value); setErr(false); }} />
          <input type="password" placeholder="Şifre" value={pass} onChange={e => { setPass(e.target.value); setErr(false); }} />
          {err && <p className="admin-login__err">Hatalı kullanıcı adı veya şifre.</p>}
          <button type="submit" className="btn-orange admin-login__btn" disabled={loading}>{loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}</button>
        </form>
      </div>
    </div>
  );
}

function SliderTab({ sliders, updateSliders }) {
  const [items, setItems] = useState(sliders);
  const update = (id, field, val) => setItems(s => s.map(x => x.id===id ? {...x,[field]:val} : x));
  const add = () => setItems(s => [...s, { id: Date.now(), title: 'Yeni Slider', subtitle: 'Alt başlık...', bg: '#1a1a1a' }]);
  const remove = id => setItems(s => s.filter(x => x.id!==id));
  const [saving, setSaving] = useState(false);
  const save = async () => { setSaving(true); await updateSliders(items); setSaving(false); alert('Slider güncellendi!'); };

  return (
    <div className="admin-tab">
      <div className="admin-tab__header">
        <h2>Slider / Banner Yönetimi</h2>
        <div style={{ display:'flex', gap:10 }}>
          <button className="admin-btn admin-btn--ghost" onClick={add}><Plus size={15}/> Yeni Ekle</button>
          <button className="admin-btn admin-btn--save" onClick={save}><Save size={15}/> Kaydet</button>
        </div>
      </div>
      <div className="admin-items">
        {items.map((sl, i) => (
          <div key={sl.id} className="admin-item">
            <div className="admin-item__num">{i+1}</div>
            <div className="admin-item__fields">
              <div className="admin-field-row">
                <div className="admin-field">
                  <label>Başlık</label>
                  <input value={sl.title} onChange={e => update(sl.id, 'title', e.target.value)} />
                </div>
                <div className="admin-field" style={{ maxWidth: 120 }}>
                  <label>Arkaplan</label>
                  <input type="color" value={sl.bg} onChange={e => update(sl.id, 'bg', e.target.value)} style={{ height: 40, cursor:'pointer' }} />
                </div>
              </div>
              <div className="admin-field">
                <label>Alt Başlık</label>
                <input value={sl.subtitle} onChange={e => update(sl.id, 'subtitle', e.target.value)} />
              </div>
            </div>
            <button className="admin-delete" onClick={() => remove(sl.id)}><Trash2 size={16}/></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogTab({ blog, updateBlog }) {
  const [items, setItems] = useState(blog);
  const update = (id, field, val) => setItems(b => b.map(x => x.id===id ? {...x,[field]:val} : x));
  const add = () => setItems(b => [...b, { id: Date.now(), title: '', excerpt: '', date: new Date().toISOString().split('T')[0], category: 'Genel' }]);
  const remove = id => setItems(b => b.filter(x => x.id!==id));
  const [saving, setSaving] = useState(false);
  const save = async () => { setSaving(true); await updateBlog(items); setSaving(false); alert('Blog güncellendi!'); };

  return (
    <div className="admin-tab">
      <div className="admin-tab__header">
        <h2>Blog Yazıları</h2>
        <div style={{ display:'flex', gap:10 }}>
          <button className="admin-btn admin-btn--ghost" onClick={add}><Plus size={15}/> Yeni Yazı</button>
          <button className="admin-btn admin-btn--save" onClick={save}><Save size={15}/> Kaydet</button>
        </div>
      </div>
      <div className="admin-items">
        {items.map((post) => (
          <div key={post.id} className="admin-item admin-item--col">
            <div className="admin-item__header">
              <span className="admin-cat-badge">{post.category}</span>
              <button className="admin-delete" onClick={() => remove(post.id)}><Trash2 size={16}/></button>
            </div>
            <div className="admin-field-row">
              <div className="admin-field" style={{ flex:2 }}>
                <label>Başlık</label>
                <input value={post.title} onChange={e => update(post.id, 'title', e.target.value)} placeholder="Yazı başlığı..." />
              </div>
              <div className="admin-field">
                <label>Kategori</label>
                <input value={post.category} onChange={e => update(post.id, 'category', e.target.value)} />
              </div>
              <div className="admin-field">
                <label>Tarih</label>
                <input type="date" value={post.date} onChange={e => update(post.id, 'date', e.target.value)} />
              </div>
            </div>
            <div className="admin-field">
              <label>Özet</label>
              <textarea rows={2} value={post.excerpt} onChange={e => update(post.id, 'excerpt', e.target.value)} placeholder="Kısa açıklama..." />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutTab({ about, updateAbout }) {
  const [data, setData] = useState(about);
  const handle = e => setData(d => ({ ...d, [e.target.name]: e.target.value }));
  const [saving, setSaving] = useState(false);
  const save = async () => { setSaving(true); await updateAbout(data); setSaving(false); alert('Hakkımızda güncellendi!'); };

  return (
    <div className="admin-tab">
      <div className="admin-tab__header">
        <h2>Hakkımızda & İletişim</h2>
        <button className="admin-btn admin-btn--save" onClick={save}><Save size={15}/> Kaydet</button>
      </div>
      <div className="admin-about-form">
        <div className="admin-field">
          <label>Misyon Metni</label>
          <textarea name="mission" rows={4} value={data.mission} onChange={handle} />
        </div>
        <div className="admin-field-row">
          <div className="admin-field">
            <label>Adres</label>
            <textarea name="address" rows={2} value={data.address} onChange={handle} />
          </div>
          <div className="admin-field">
            <label>E-posta</label>
            <input name="email" value={data.email} onChange={handle} />
          </div>
        </div>
        <div className="admin-field-row">
          <div className="admin-field">
            <label>Telefon</label>
            <input name="phone" value={data.phone} onChange={handle} />
          </div>
          <div className="admin-field">
            <label>Kuruluş Yılı</label>
            <input name="founded" value={data.founded} onChange={handle} />
          </div>
          <div className="admin-field">
            <label>Çalışan Sayısı</label>
            <input name="team" value={data.team} onChange={handle} />
          </div>
          <div className="admin-field">
            <label>Müşteri Sayısı</label>
            <input name="customers" value={data.customers} onChange={handle} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PartnersTab({ partners, updatePartners }) {
  const [items, setItems] = useState(partners);
  const update = (id, val) => setItems(p => p.map(x => x.id===id ? {...x, name: val, logo: val} : x));
  const add = () => setItems(p => [...p, { id: Date.now(), name: '', logo: '' }]);
  const remove = id => setItems(p => p.filter(x => x.id!==id));
  const [saving, setSaving] = useState(false);
  const save = async () => { setSaving(true); await updatePartners(items); setSaving(false); alert('Partnerler güncellendi!'); };

  return (
    <div className="admin-tab">
      <div className="admin-tab__header">
        <h2>Partner Yönetimi</h2>
        <div style={{ display:'flex', gap:10 }}>
          <button className="admin-btn admin-btn--ghost" onClick={add}><Plus size={15}/> Yeni Partner</button>
          <button className="admin-btn admin-btn--save" onClick={save}><Save size={15}/> Kaydet</button>
        </div>
      </div>
      <div className="admin-partners-grid">
        {items.map(p => (
          <div key={p.id} className="admin-partner-item">
            <input value={p.name} onChange={e => update(p.id, e.target.value)} placeholder="Marka adı..." />
            <button className="admin-delete" onClick={() => remove(p.id)}><Trash2 size={15}/></button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Admin() {
  const { isAdmin, login, logout, content, updateSliders, updateAbout, updateBlog, updatePartners } = useAdmin();
  const [activeTab, setActiveTab] = useState('sliders');

  if (!isAdmin) return <LoginForm onLogin={login} />;

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__logo">tombo<span>●</span>print <span className="admin-badge">Admin</span></div>
        <nav className="admin-nav">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              className={`admin-nav-item ${activeTab===id ? 'admin-nav-item--active' : ''}`}
              onClick={() => setActiveTab(id)}
            >
              <Icon size={16}/> {label}
            </button>
          ))}
        </nav>
        <button className="admin-logout" onClick={logout}><LogOut size={15}/> Çıkış Yap</button>
      </aside>
      <main className="admin-main">
        {activeTab === 'sliders' && <SliderTab sliders={content.sliders} updateSliders={updateSliders} />}
        {activeTab === 'blog' && <BlogTab blog={content.blog} updateBlog={updateBlog} />}
        {activeTab === 'about' && <AboutTab about={content.about} updateAbout={updateAbout} />}
        {activeTab === 'partners' && <PartnersTab partners={content.partners} updatePartners={updatePartners} />}
      </main>
    </div>
  );
}
