# Claude Code — Teknik Rehber

> Yeni projelerde başvuru kaynağı olarak kullanılacak teknikler ve ilkeler.
>Guvenlik Politikası.MD bunu oku ve güvenlik kurallarımızı buna göre takip et.
>Claude_Guvenlik.MD dosyasını oku ve kodlarını buna göre yaz.
>Next-js_JWT_Versel_Guvenlik_Politikası.MD bunu oku ve kodları yazarken bunlara dikkat et.



---

## ⚙️ Claude'a Talimat — Bu Dosya Sana Gönderildiğinde

Bu dosyayı aldığında aşağıdaki tüm kuralları otomatik olarak hafızana al ve tüm kodlama yardımlarında eksiksiz uygula:

### 🚀 Proje Başlangıcı
1. **Uzman rol:** Uzman bir yazılım geliştirici olarak davran.
2. **Seçenekleri sor:** Projede birden fazla yaklaşım varsa kullanıcıya seçenek sun, karar verdikten sonra kodla.
3. **API ön bildirimi:** Projede kullanılacak API'lar varsa kodlamaya başlamadan önce listele ve kullanıcının hazırlamasını bekle.
4. **Dosya/klasör yapısı:** Her projede baştan standart bir yapı belirle ve kullanıcıya onayla; sonradan değiştirmek maliyetli olur.
5. **Environment variables & Terminal Güvenliği:** API key ve tüm hassas bilgiler yalnızca `.env` dosyasında tutulsun; kod içine kesinlikle gömme. Terminalde asla `--api-key`, `export API_KEY=xxx` gibi komutlarla key yazma — terminal geçmişine düşer. `.env` dosyasını `.gitignore`'a ekle, kesinlikle commit etme. Projeye `.env.example` dosyası ekle (içinde sadece değişken isimleri olsun, değerler boş). Hangi değişkenlerin gerektiğini proje başında listele.
6. **Tasarım onayı:** Web projesinde önce tasarımı/yapıyı kullanıcıya sun ve onay al, sonra tam kodu yaz.

### 🏗️ Geliştirme Süreci
7. **Proaktif hata önleme:** Öngörülemeyen sorunları önceden tespit et, kullanıcı karşılaşmadan önle.
8. **İş akışı mantık kontrolü:** Her iş akışında mantık hatalarını ve çelişen senaryoları önceden tespit et; kullanıcıya tavsiye ve alternatif çözüm sun.
9. **Hard code yasak:** Projede hiçbir zaman sabit/hard code bilgi girme (metin, fiyat, iletişim, link vb.); tüm bu değerler admin panelinden yönetilebilir ve değiştirilebilir olmalıdır.
10. **Mail şablonları:** Sistemde mail gönderimi varsa, mail metni ve içindeki tüm değişkenler (ad, tarih, tutar vb.) admin panelinden düzenlenebilir şablonlar olarak tasarlanmalıdır.
11. **Versiyon kontrolü:** Önemli değişikliklerden önce "bu noktada commit al" uyarısı ver.
12. **Aşama özeti:** Her tamamlanan aşamanın sonunda ne yapıldığını, ne kaldığını kısaca özetle.

### 🎨 Arayüz & Kullanıcı Deneyimi
13. **Hover efekti:** Web sayfalarında tüm link ve butonlarda mouse üzerine gelince görsel değişiklik (hover efekti) zorunludur.
14. **Responsive tasarım:** Tüm web sayfaları mobil, tablet ve masaüstü için uyumlu olmalıdır. Kodlamadan önce breakpoint yapısını belirle.
15. **Loading & Hata durumları:** Veri yüklenirken skeleton veya spinner göster; kullanıcıya gösterilen hata mesajları anlaşılır Türkçe olsun.
16. **Form validasyonu:** Tüm formlar hem client (anlık) hem server (gönderim) tarafında doğrulanmalıdır.
17. **Görseller:** Görsel ihtiyacı olan projelerde görselleri CDN veya alternatif kaynaklardan bul ve entegre et.

### 🔒 Kalite & Güvenlik
18. **Kalite & Güvenlik:** Güvenilir kütüphaneler kullan (CDN dahil); her aşamada güvenlik açıklarını kontrol et; yavaşlatan kodları tespit edip optimize et, gerekiyorsa daha uygun kütüphane/model öner. Yapılan değişikliklerin diğer sayfa ve bileşenleri etkileyip etkilemediğini kontrol et, gerekiyorsa onları da güncelle.
19. **Kod yorumları:** Kritik ve karmaşık kod bloklarına Türkçe yorum satırı ekle; her fonksiyonun ne yaptığını kısaca açıkla.

---

## 🧪 Test Komutu

Projeyi test etmemi istediğinde aşağıdaki yapıyı kullan. Ben mevcut projeye göre test senaryolarını otomatik oluştururum:

```
[PROJE_ADI] projesini tam kapsamlı test et. CLAUDE.md'yi oku ve içindeki kurallara uy.
Daha önce çalışır hale getirilmiş dosyalara dokunma.
Hem admin hem normal kullanıcı oluşturarak tüm kullanıcı akışlarını uçtan uca test et:
- Kayıt / Giriş / Çıkış
- Ana iş akışları (CLAUDE.md'deki modüllere göre)
- Admin yönetim akışları
- Edge case'ler (yetkisiz erişim, dolu kontenjan, boş veri vb.)

Her adımı ✅/❌ olarak raporla.
❌ varsa düzelt, tekrar test et, geçince devam et.
Sonunda özet tablo ver.
```

### Test Süreci Kuralları

- **Canlı raporlama:** Her adım yapılırken anlık olarak raporla; işlem bitmeden sonucu bekleme.
- **Tahmini süre:** Test başlamadan önce kaç adım olduğunu ve tahmini ne kadar süreceğini belirt.
- **Otomatik onay:** Test başında "Tüm işlemleri otomatik onaylayayım mı?" diye sor. Evet denirse süreç boyunca bir daha onay isteme, tüm adımları otomatik uygula.

> **Not:** "Test et" dediğinde bu şablonu mevcut projeye göre otomatik uyarlarım; modüller, roller ve edge case'ler projeye özel oluşturulur.

---

## 📄 CLAUDE.md & teknik.md Hazırlama

Her yeni proje başladığında aşağıdaki adımları uygula:

1. **CLAUDE.md oluştur:** Projeye özel bilgileri (genel bakış, tech stack, modüller, veritabanı yapısı, özel kurallar) içeren CLAUDE.md dosyasını hazırla ve kullanıcının indirebileceği şekilde sun.
2. **teknik.md güncelle:** Mevcut teknik.md dosyasını bu projeye özel ayarlarla (stack, deploy ortamı, özel kütüphaneler vb.) düzenle ve indirilebilir hale getir.
3. Her iki dosyayı da proje başında hazırlayıp kullanıcıya sun; projeye başlamadan önce onay al.

---

## 1. Temel Yaklaşım

- Claude Code tek başına güçlü bir platform: N8N, Gmail, YouTube, Supabase gibi uygulamalarla bağlanabilir.
- **Ajan modeli:** Kodu yazar → analiz eder → test eder → hata düzeltir → döngü devam eder.
- Otomasyon kurma: YouTube, Gmail, N8N üzerinden.

---

## 2. CLAUDE.md — Projenin Beyni

> **En kritik adım. İyi bir CLAUDE.md = işin %80'i çözülmüş demek.**

### CLAUDE.md İçeriği:
1. Projenin ne olduğu (genel bakış)
2. Kullanılacak teknolojiler (tech stack)
3. Kodlama kuralları (örn: fonksiyonel komponentler kullan)
4. Hafıza/memory notları

### Önerilen Tech Stack:
- **Frontend:** Next.js / React
- **Backend:** Node.js / Supabase
- **Database:** Supabase (PostgreSQL)

### Kurallar:
- Proje planlamasını başta Claude ile birlikte yap.
- MD dosyasını Claude Code'a `"bunu kullanarak ilerle"` diyerek bağla.
- MD dosyası olmadan projeye başlama.
- Yanlış teknoloji seçiminden kaçın (sonradan değiştirmek zorunda kalırsın).

---

## 3. Geliştirme Süreci

### Prompt Akışı:
1. Taslak oluştur
2. Kodu çalıştır
3. Hataları kontrol ettir
4. Düzeltmeleri yaptır
5. Döngü

### Bölüm Bölüm Geliştirme Tekniği:
- `"Uygulamayı 10 aşamaya böl, 1. bölümle başla"`
- Bölüm bitince test et → onay ver → sonraki bölüme geç
- Bu yöntem token tasarrufu sağlar ve hataları azaltır

---

## 4. Claude Code Komutları

| Komut | Açıklama |
|-------|----------|
| `/compact` | Hafızayı sıkıştır, daha az token yak |
| `/plan` | Sadece plan yap, aksiyon alma |
| `/clear` | Sohbet geçmişini temizle |

### Güvenlik Modları:
- `"Aksiyon almadan önce bana sor"` modu
- `"Sadece planla"` modu
- Kritik işlemlerde onay alma

### Araştırma Akışı:
Araştırma → Temizle → Rapor/Sunum oluştur  
*(Playwright, Apify ile web scraping yapılabilir)*

---

## 5. Hook'lar

- **Hook nedir:** Claude Code'un bir aksiyon almadan önce çalıştırdığı script.
- **Kullanım senaryoları:**
  - Dosya kaydedilmeden önce kontrol
  - Komut çalıştırılmadan önce güvenlik filtresi
- Proje büyüdükçe hook'ların önemi artar.
- Hook'lar otomatik güvenlik ve kalite kontrolü sağlar.

---

## 6. Claude Skills (Yetenekler)

- **Skills nedir:** Claude'un temel yeteneklerinin üzerine eklenen uzmanlık paketleri.
- GitHub'dan hazır skill repo'su klonlanabilir (Anthropic resmi + topluluk skill'leri).
- **SKILL.md dosyası:** Yeteneğin ne zaman ve nasıl kullanılacağını tanımlar.
- **Modülerlik ilkesi:** Her skill tek bir iş yapmalı.
- Hangi skill'in kullanılacağına Claude kendisi karar verir.

### Yaygın Skill Türleri:
- Sunum hazırlama
- Frontend design
- Web testing
- Stok / veri analizi

---

## 7. MCP (Model Context Protocol)

> **En güçlü özelliklerden biri.**

- **MCP nedir:** Claude ile başka bir uygulamayı bağlayan protokol. API'dan üstün çünkü sürekli bağlantı + context paylaşımı sağlar.

### MCP Mimarisi:
- **MCP Client** → Claude örneği
- **MCP Host** → Arayüz uygulaması
- **MCP Server** → Bağlanan servis

### Popüler MCP'ler:
| MCP | Açıklama |
|-----|----------|
| Supabase MCP | Veritabanına doğal dil ile erişim |
| Gmail MCP | Email okuma/gönderme |
| YouTube MCP | Video yönetimi |
| Filesystem MCP | Yerel dosyalara erişim |

**Başlangıç için:** En az 1 sistemi (Gmail veya YouTube) bağlayıp test et.

---

## 8. Chrome Ajanı

- Chrome Extension ile Claude Code kullanımı.
- Tarayıcı içinde web sayfasını görme ve üzerinde aksiyon alma.
- Form doldurma, bilgi arama, sayfada tıklama (browsing agent).
- **Puppeteer** entegrasyonu ile web sitelerini otomatik test etme.
- Eş zamanlı çalışma: Kendi işini yaparken Claude Code da çalışıyor.

---

## 9. Sub-Agentlar ve Ajan Takımları

- **Sub-Agent nedir:** Ana Claude'un altında çalışan özel görevli ajan.

### Ajan Takımı Yapısı:
1. **Planlayıcı Ajan** — Orkestranın şefi
2. **Bilgi Toplayan Ajan** — Dokümantasyon okur, özetler
3. **Kod Yazan Ajan** — Geliştirme yapar
4. **Test Eden Ajan** — Hata bulur
5. **Güvenlik Denetçisi Ajan** — Güvenlik açığı kontrol eder

- 22 ajanı eş zamanlı çalıştırmak mümkün.
- Bir ajan devam ederken ikincisini başlatabilirsiniz.

---

## 10. Git ve Versiyon Kontrolü

> Her zaman GitHub'a yedekle.

### Branch Yapısı:
1. `main` → Ana, kararlı sürüm
2. `development` → Geliştirme ortamı
3. `feature/xxx` → Yeni özellik dalı

### Neden Branch Kullanılmalı:
- Çalışan kodu bozmadan yeni özellik ekleme
- Geri dönebilme imkânı
- Sistematik ve hatalara karşı güvenli ilerleme

### Klasör Yapısı Önerisi:
- Ana klasör (stable)
- Yeni özellik klasörü (iterasyon)
- Her klasöre ayrı Claude oturumu aç
- Değişiklikler doğruysa: yeni klasör → ana klasör olur

---

## 11. Pluginler ve Marketplace

| Plugin | Açıklama |
|--------|----------|
| **21st.dev** | UI component kütüphanesi |
| **Playwright** | Web otomasyonu ve test |
| **Remotion** | Video düzenleme ve üretme |
| **Ollama** | Yerel model çalıştırma |
| **DeepL** | Otomatik çeviri |

**Güvenlik kuralı:** Sadece resmi veya topluluk tarafından onaylanmış plugin'ler kullan.

---

## 12. Maliyet Optimizasyonu

### Token Tasarrufu:
- Sohbet geçmişini düzenli temizle (`/clear`)
- `/compact` komutu ile hafızayı sıkıştır
- Token limiti koy
- **İyi başlamak = %80 token tasarrufu**

### Hangi Model, Hangi İş:
| Model | Kullanım |
|-------|----------|
| **Haiku** | Basit görevler |
| **Sonnet** | Genel kodlama |
| **Opus** | Karmaşık kodlama (pahalı ama güçlü) |

---

## 13. Deployment

### Seçenekler:
| Platform | Açıklama |
|----------|----------|
| **Vercel** | En kolay, GitHub entegrasyonu, otomatik deploy |
| **Render** | Alternatif PaaS |
| **Railway** | Alternatif PaaS |
| **VPS** | Tam kontrol, ölçekleme manuel |

### Vercel ile Deploy Akışı:
1. Projeyi GitHub'a push'la
2. Vercel'de GitHub repo'yu bağla
3. Otomatik deploy tetiklenir
4. Domain bağla
5. Analitikleri takip et

**Not:** VPS'te limit dolunca timeout olur → önceden plan yap.

---

## 14. Genel Teknik İlkeler

| İlke | Açıklama |
|------|----------|
| **Bölüm bölüm ilerle** | Projeyi aşamalara böl, her aşamayı test et |
| **CLAUDE.md kullan** | Projenin hafızası burada, en kritik dosya |
| **Küçük başla** | Basit başlayıp üzerine ekle |
| **Token tasarrufu** | Gereksiz mesajları sil, compact kullan |
| **Koda dokunma** | Her şeyi Claude'a söyle, kendin değiştirme |
| **Ayrı oturumlar** | Her klasör/özellik için ayrı Claude oturumu |
| **Onaylı ilerleme** | Kritik işlemlerde "bana sor" modunu aç |
| **Modülerlik** | Her skill/agent tek iş yapmalı |

---

## 15. Yeni Projeye Başlangıç Kontrol Listesi

- [ ] CLAUDE.md dosyası oluştur
- [ ] Tech stack seç ve dokümante et
- [ ] En az 1 MCP bağlantısı kur
- [ ] 1 skill ekle
- [ ] Git branch yapısını kur (`main` / `development`)
- [ ] Projeyi 10 aşamaya böl, 1. aşamayla başla
- [ ] Vercel'e deploy et

> **Not:** Aşağıdaki kurallar 17-19 arası sonradan eklendi.
