# GitHub Pages Deployment Rehberi

## 🚀 Hazırlık Tamamlandı

Projeniz GitHub Pages'e deploy edilmek için tamamen hazır! İşte yapılan konfigürasyonlar:

### ✅ Yapılan Değişiklikler:

1. **Package.json Scripts**:

   - `deploy:gh` - GitHub Pages'e manual deploy
   - `predeploy` - Deploy öncesi otomatik build

2. **Vite Configuration**:

   - Base path `/personal-portfolio/` ayarlandı
   - Production optimizasyonları aktif

3. **GitHub Actions Workflow**:

   - Otomatik deployment (`.github/workflows/deploy.yml`)
   - Her main branch push'ta otomatik deploy
   - Linting ve formatting kontrolleri

4. **Dependencies**:
   - `gh-pages` eklendi

## 📋 Deployment Seçenekleri:

### Seçenek 1: Otomatik Deploy (GitHub Actions) - Önerilen ✨

1. **GitHub Repository Settings**:

   - Repository > Settings > Pages
   - Source: "GitHub Actions" seçin

2. **Deploy**:

   ```bash
   # Değişiklikleri commit ve push et
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

3. **Sonuç**: https://alpertas.github.io/personal-portfolio/ adresinde siteniz yayında olacak!

### Seçenek 2: Manual Deploy

```bash
# Manual deploy
npm run deploy:gh
```

## 🔧 GitHub Repository Ayarları:

1. **GitHub.com'da reponuza gidin**
2. **Settings > Pages**
3. **Source**: "GitHub Actions" seçin
4. **İlk push'tan sonra otomatik deploy başlayacak**

## 📊 Deployment Status:

- Actions sekmesinde deployment durumunu takip edebilirsiniz
- Her push'ta otomatik lint, format check ve build yapılır
- Build başarısızsa deploy olmaz (güvenlik)

## 🌐 Site URL'niz:

**https://alpertas.github.io/personal-portfolio/**

## 🛠️ Sorun Giderme:

1. **404 Hatası**: Base path ayarları doğru
2. **CSS/JS Yüklenmiyor**: Asset path'leri otomatik düzenlendi
3. **Deploy Hataları**: Actions sekmesinden logları kontrol edin

## 🚀 Hemen Deploy Et:

```bash
git add .
git commit -m "Ready for GitHub Pages deployment"
git push origin main
```

**Deploy işlemi 2-3 dakika sürer ve siteniz yayında olur!**
