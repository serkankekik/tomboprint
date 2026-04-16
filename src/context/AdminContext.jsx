import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api';

const AdminContext = createContext(null);

const fallbackContent = {
  sliders: [
    { id: 1, title: 'Yazıcıları ve Baskıları Yönetin', subtitle: 'Güvenli, ölçeklenebilir ve modern baskı yönetim platformu.', bg: '#1a3a5c' },
    { id: 2, title: 'Bulut Baskıya Geçin', subtitle: 'Ofis dışından güvenli baskı — her yerden, her cihazdan.', bg: '#0a1628' },
    { id: 3, title: 'Maliyetleri %30 Azaltın', subtitle: 'Akıllı raporlama ve kota yönetimiyle baskı harcamalarınızı kontrol altına alın.', bg: '#1a0a00' },
  ],
  about: {
    mission: 'İşletmelerin yazıcı altyapısını tam kontrol altına almasını sağlamak; maliyetleri düşürmek, güvenliği artırmak ve operasyonel verimliliği maksimize etmek.',
    address: 'Üniversiteler Mh, Bilkent Cyberpark Tepe Binası No:Z39, 06800 Çankaya, Ankara, TR',
    email: 'info@tomboprint.com',
    phone: '+90 312 000 00 00',
    founded: '2018',
    team: '45+',
    customers: '500+',
  },
  blog: [
    { id: 1, title: 'Kurumsal Baskı Güvenliği: 2024 Kılavuzu', excerpt: 'Zero-trust yaklaşımıyla yazıcı güvenliğini nasıl sağlarsınız?', date: '2024-11-15', category: 'Güvenlik' },
    { id: 2, title: 'Bulut Baskıya Geçişin 5 Adımı', excerpt: 'On-premise altyapıdan buluta geçerken dikkat edilmesi gerekenler.', date: '2024-10-28', category: 'Bulut' },
    { id: 3, title: 'Baskı Maliyetlerini Azaltmanın 10 Yolu', excerpt: 'Akıllı politikalar ve raporlama araçlarıyla baskı giderlerinizi optimize edin.', date: '2024-10-10', category: 'Maliyet' },
  ],
  partners: [
    { id: 1, name: 'HP', logo: 'HP' },
    { id: 2, name: 'Canon', logo: 'Canon' },
    { id: 3, name: 'Kyocera', logo: 'Kyocera' },
    { id: 4, name: 'Xerox', logo: 'Xerox' },
    { id: 5, name: 'Ricoh', logo: 'Ricoh' },
    { id: 6, name: 'Brother', logo: 'Brother' },
  ],
};

export function AdminProvider({ children }) {
  const [content, setContent] = useState(fallbackContent);
  const [isAdmin, setIsAdmin] = useState(() => !!localStorage.getItem('tomboprint_token'));
  const [loading, setLoading] = useState(true);

  // Tüm public verileri yükle
  const fetchAll = useCallback(async () => {
    try {
      const [sliders, blog, about, partners] = await Promise.all([
        api.get('/sliders'),
        api.get('/blog'),
        api.get('/about'),
        api.get('/partners'),
      ]);
      setContent({
        sliders: sliders.data,
        blog: blog.data,
        about: about.data,
        partners: partners.data,
      });
    } catch (err) {
      console.error('Veri yüklenirken hata:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const login = async (username, password) => {
    try {
      const res = await api.post('/auth/login', { username, password });
      localStorage.setItem('tomboprint_token', res.data.token);
      setIsAdmin(true);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('tomboprint_token');
    setIsAdmin(false);
  };

  // --- Sliders ---
  const updateSliders = async (sliders) => {
    // Mevcut slider'ları al
    const current = content.sliders;
    const currentIds = current.map(s => s.id);
    const newIds = sliders.filter(s => typeof s.id === 'number' && s.id > 0).map(s => s.id);

    // Silinenler
    const toDelete = currentIds.filter(id => !newIds.includes(id));
    for (const id of toDelete) {
      await api.delete(`/sliders/${id}`);
    }

    // Güncelle veya ekle
    for (const slider of sliders) {
      if (typeof slider.id === 'number' && currentIds.includes(slider.id)) {
        await api.put(`/sliders/${slider.id}`, slider);
      } else {
        await api.post('/sliders', slider);
      }
    }

    await fetchAll();
  };

  // --- About ---
  const updateAbout = async (about) => {
    await api.put('/about', about);
    await fetchAll();
  };

  // --- Blog ---
  const updateBlog = async (posts) => {
    const current = content.blog;
    const currentIds = current.map(b => b.id);
    const newIds = posts.filter(p => typeof p.id === 'number' && p.id > 0).map(p => p.id);

    const toDelete = currentIds.filter(id => !newIds.includes(id));
    for (const id of toDelete) {
      await api.delete(`/blog/${id}`);
    }

    for (const post of posts) {
      if (typeof post.id === 'number' && currentIds.includes(post.id)) {
        await api.put(`/blog/${post.id}`, post);
      } else {
        await api.post('/blog', post);
      }
    }

    await fetchAll();
  };

  // --- Partners ---
  const updatePartners = async (partners) => {
    const current = content.partners;
    const currentIds = current.map(p => p.id);
    const newIds = partners.filter(p => typeof p.id === 'number' && p.id > 0).map(p => p.id);

    const toDelete = currentIds.filter(id => !newIds.includes(id));
    for (const id of toDelete) {
      await api.delete(`/partners/${id}`);
    }

    for (const partner of partners) {
      if (typeof partner.id === 'number' && currentIds.includes(partner.id)) {
        await api.put(`/partners/${partner.id}`, partner);
      } else {
        await api.post('/partners', partner);
      }
    }

    await fetchAll();
  };

  // --- Contact & Demo (public submit) ---
  const submitContact = async (data) => {
    const res = await api.post('/contact', data);
    return res.data;
  };

  const submitDemo = async (data) => {
    const res = await api.post('/demo', data);
    return res.data;
  };

  return (
    <AdminContext.Provider value={{
      content, isAdmin, loading, login, logout,
      updateSliders, updateAbout, updateBlog, updatePartners,
      submitContact, submitDemo, fetchAll,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
