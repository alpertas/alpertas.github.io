# Email Form Setup Guide

Bu rehber Contact formunun EmailJS ve reCAPTCHA ile nasıl yapılandırılacağını açıklar.

## EmailJS Kurulumu

1. [EmailJS](https://www.emailjs.com/) hesabı oluşturun
2. Email Service ekleyin (Gmail, Outlook, vb.)
3. Email Template oluşturun

### Template Parametreleri
Template'inizde şu parametreleri kullanın:

```
To: {{to_email}}
From: {{from_name}} <{{from_email}}>
Subject: {{subject}}

Message:
{{message}}

---
Bu mesaj {{from_name}} ({{from_email}}) tarafından gönderilmiştir.
```

### Environment Variables
`.env.local` dosyası oluşturun ve şu değişkenleri ekleyin:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id  
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

## reCAPTCHA Kurulumu

1. [Google reCAPTCHA](https://www.google.com/recaptcha/admin) konsoluna gidin
2. Yeni site kaydedin
3. reCAPTCHA v2 "I'm not a robot" seçin
4. Domain'inizi ekleyin (localhost:3000 development için)
5. Site key'i alın

## Özellikler

- ✅ Formik ile form yönetimi
- ✅ Yup ile doğrulama
- ✅ reCAPTCHA spam koruması
- ✅ EmailJS ile email gönderimi
- ✅ Çok dilli destek
- ✅ Responsive tasarım
- ✅ Loading states
- ✅ Success/Error mesajları

## Test

Form test etmek için:
1. Tüm alanları doldurun
2. reCAPTCHA'yı tamamlayın
3. Submit butonuna tıklayın
4. Email'in alpertas.cpp@gmail.com adresine gönderildiğini kontrol edin 