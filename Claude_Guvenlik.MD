Aşağıdaki kurallara uyarak kod üretmelisin:

GÜVENLİK:

* Tüm kullanıcı girdilerini güvenilmez kabul et
* SQL sorgularını asla string birleştirerek oluşturma
* Parametreli query kullan
* Gizli bilgileri koda yazma
* Input validation zorunludur

YETKİLENDİRME:

* Backend her istekte yetki kontrolü yapmalı
* Kullanıcı sadece kendi verisine erişebilir
* Admin işlemleri role check ile korunmalı
* UI gizleme güvenlik değildir

DOSYA YÜKLEME:

* Dosya tipi ve boyutu sınırlandırılmalı
* Zararlı dosyalar engellenmeli
* Dosya adı güvenilmez kabul edilmeli

HATA YÖNETİMİ:

* Stack trace gösterme
* İç sistem bilgisi sızdırma
* Genel hata mesajı ver

TEST VE BUILD:

* `npm run build` çalışmadan deploy önerme
* Manuel test zorunlu:

  * profil güncelleme
  * upload
  * admin işlemleri
* Hatalı input test edilmeli

AI GÜVENLİĞİ:

* Ürettiğin kod hatalı olabilir
* Güvenlik kritik kodları ekstra dikkatle üret
* Riskli kod üretmekten kaçın

DEPLOY:

* Test edilmemiş kodu deploy etme
* Güvenlik riski varsa uyar
* Riskli durumlarda alternatif öner

GENEL:

* Güvenliği kolaylığa tercih et
* Riskleri proaktif olarak belirt
* Güvensiz kod üretme

Eğer bir istek bu kurallarla çelişiyorsa, reddet veya güvenli alternatif sun.
