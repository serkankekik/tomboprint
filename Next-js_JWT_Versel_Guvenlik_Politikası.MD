# Next.js, JWT ve Deployment Güvenlik Politikası

## Amaç

Bu doküman, Next.js projelerinde JWT tabanlı kimlik doğrulama, yetkilendirme ve Vercel deployment süreçlerinde güvenliği sağlamak için zorunlu kuralları tanımlar.

---

## 🔐 JWT (Token) Güvenliği

### Token Yapısı

* Access token kısa ömürlü olmalıdır (ör: 5–30 dakika)
* Refresh token daha uzun ömürlü olmalı ve daha güvenli saklanmalıdır

---

### Token Saklama

Tercih edilen yöntem:

* httpOnly cookie

❌ Kaçınılmalı:

* localStorage (XSS riskinden dolayı)

---

### JWT İçeriği

* Token içinde hassas veri tutulmaz
* Sadece gerekli bilgiler (user_id, role) bulunur

❌ Asla koyma:

* şifre
* API key
* kişisel hassas veri

---

### Token Güvenliği

* Güçlü bir secret kullanılmalı
* Token expire süresi zorunlu olmalı
* Invalid / expired token düzgün handle edilmeli

---

### Logout ve İptal

* Logout sonrası token geçersiz sayılmalı
* Kritik sistemlerde token blacklist veya rotation uygulanmalı

---

## 🔒 Authentication & Authorization (Next.js)

### Backend Kontrol Zorunlu

* Sadece frontend redirect yeterli değildir
* Backend her istekte kullanıcıyı doğrulamalıdır

---

### Kullanıcı Erişimi

* Kullanıcı sadece kendi verisine erişebilir
* ID manipülasyonu engellenmelidir

---

### Admin Koruması

* Admin route’lar backend’de korunmalıdır
* Role check zorunludur

Zorunlu test:

* Normal kullanıcı admin endpointine erişememeli

---

## ⚙️ Next.js Özel Güvenlik Kuralları

### API Routes / Server Actions

* Her API route auth kontrolü yapmalı
* Server actions güvenli input validation yapmalı

---

### Middleware Kullanımı

* Middleware ek güvenlik katmanıdır
* Tek güvenlik katmanı olarak kullanılmaz

---

### SSR / CSR Veri Güvenliği

* SSR sırasında yanlış kullanıcıya veri gönderilmemeli
* Hydration sırasında veri sızıntısı olmamalı

---

### Environment Variables

* `NEXT_PUBLIC_` ile başlayan değişkenler public’tir

❌ Asla koyma:

* secret
* API key
* JWT secret

---

## 📁 Dosya Yükleme (Next.js)

* Maksimum dosya boyutu belirlenmeli
* MIME type kontrolü yapılmalı
* Dosya adı güvenilmez kabul edilmeli

---

## 🌐 CORS & CSRF

### CORS

* Sadece gerekli domainlere izin ver
* `*` kullanmaktan kaçın

---

### CSRF

* Cookie-based auth kullanıyorsan CSRF koruması ekle
* SameSite cookie ayarlarını kullan

---

## 🔐 Cookie Güvenliği

* httpOnly = true
* secure = true (production)
* sameSite = strict veya lax

---

## 🚀 Vercel Deployment Güvenliği

### Environment Ayrımı

* Development, Preview, Production ayrı olmalı
* Yanlış DB’ye bağlanma riski kontrol edilmeli

---

### Secrets Yönetimi

* Tüm secret’lar Vercel environment üzerinden yönetilmeli
* Kod içinde secret bulunmamalı

---

### Build Kontrolü

```bash id="7tnq8x"
npm run build
```

* Build hatasız olmalı
* Production build test edilmeden deploy edilmemeli

---

### Production Ayarları

* HTTPS zorunlu
* Debug mod kapalı
* Verbose error kapalı
* Source map dikkatli kullanılmalı

---

## 🧪 Deployment Öncesi Zorunlu Testler

### Auth Testleri

* Login / logout çalışıyor mu
* Token expire olunca ne oluyor
* Invalid token nasıl handle ediliyor

---

### Authorization Testleri

* Kullanıcı başkasının verisini görememeli
* Admin route’lar korunmalı

---

### Upload Testleri

* Büyük dosya reddediliyor mu
* Yanlış format reddediliyor mu

---

### Güvenlik Testleri

* SQL injection denemesi
* XSS denemesi
* Unauthorized access denemesi

---

## ❌ Deploy ETME

Aşağıdaki durumlarda deploy ETME:

* Auth test edilmediyse
* Admin kontrolü yoksa
* Token sistemi güvenli değilse
* Secret’lar koda yazılmışsa
* Build başarısızsa

---

## 🧠 Son Kural

> Authentication doğru değilse, sistem güvenli değildir
> Authorization doğru değilse, veri güvenli değildir
> Deployment kontrol edilmemişse, sistem risk altındadır
