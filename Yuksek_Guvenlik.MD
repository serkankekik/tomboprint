# Mühendislik ve Güvenlik Politikası

## Amaç

Bu doküman, geliştirme, güvenlik, test ve deployment süreçlerini zorunlu kurallarla tanımlar.

---

## Değişmez Kurallar

* Kullanıcı girdisine asla güvenme
* Gizli bilgileri koda yazma
* Build başarısızsa deploy etme
* Frontend’e güvenerek yetkilendirme yapma
* Test edilmeden commit atma

---

## Veri ve Girdi Güvenliği

Tüm girdiler için:

* tip kontrolü
* uzunluk kontrolü
* format kontrolü

Test edilmesi gereken durumlar:

* boş veri
* çok uzun veri
* hatalı format
* özel karakterler

---

## Veritabanı Güvenliği

* Parametreli query kullan
* Raw SQL string birleştirme yapma
* Yetkileri minimumda tut

---

## Yetkilendirme

* Backend her isteği kontrol etmeli
* Kullanıcı başkasının verisine erişememeli
* Admin endpointleri korunmalı

Zorunlu test:

* Normal kullanıcı admin endpointine erişememeli

---

## Dosya Yükleme

* Maksimum boyut belirlenmeli
* Dosya tipi kontrol edilmeli
* Çalıştırılabilir dosyalar engellenmeli

---

## Build ve Test

### Build

```bash
npm run build
```

* Hata olmamalı

### Manuel Test (zorunlu)

* profil güncelleme
* dosya yükleme
* admin işlemleri
* hatalı input

---

## Güvenlik Testleri

* SQL injection denemeleri
* büyük veri gönderimi
* yetkisiz erişim denemeleri

---

## Deployment Kuralları

Deploy ETME:

* build hatalıysa
* test yapılmadıysa
* yetkilendirme eksikse

---

## AI Kullanımı

* AI çıktısına güvenme
* AI kodunu kontrol etmeden kullanma
* hassas veri AI’a gönderilmemeli

---

## Son Kural

> Doğrulanmamış hiçbir şey production’a çıkmaz.
