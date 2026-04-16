# Güvenlik Politikası

## Genel Bakış

Bu proje, yetkisiz erişim, veri sızıntısı ve sistemin kötüye kullanımını önlemek için temel güvenlik prensiplerini uygular.

---

## Temel Kurallar

* Tüm kullanıcı girdileri güvenilmez kabul edilir
* SQL sorguları parametreli olmalıdır
* Gizli bilgiler (şifre, API key) koda yazılmaz
* En az yetki prensibi uygulanır
* Hassas servisler public olarak açılmaz

---

## Güvenli Geliştirme

### Girdi Doğrulama

* Tip, format ve uzunluk kontrolü yapılmalıdır
* Beklenmeyen veriler reddedilmelidir

### SQL Güvenliği

* String birleştirme ile query yazılmaz
* Parametreli query zorunludur

### Yetkilendirme

* Kullanıcı sadece kendi verisine erişebilir
* Admin işlemleri backend’de korunmalıdır

### Dosya Yükleme

* Dosya tipi ve boyutu sınırlandırılmalıdır
* Zararlı dosyalar reddedilmelidir

### Hata Yönetimi

* Stack trace ve sistem detayları kullanıcıya gösterilmez
* Detaylar sadece loglanır

---

## Yayınlama Öncesi

* `npm run build` hatasız çalışmalı
* Kritik akışlar test edilmiş olmalı
* Yetkilendirme doğrulanmalı
* Gizli bilgiler sızmamış olmalı

---

## Güvenlik Açığı Bildirimi

* Açıklar public paylaşılmamalı
* Özel olarak bildirilmelidir

---

## Son Not

> Test edilmemiş bir sistem güvenli değildir.
