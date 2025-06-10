export const translations = {
  en: {
    hero: {
      title: "React Native & Frontend Developer",
      tagline: "Building exceptional mobile and web experiences with modern technologies",
      cta: "View My Work"
    },
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact"
    },
    about: {
      title: "About Me",
      subtitle: "Passionate Developer & Problem Solver",
      bio: "I'm a dedicated React Native and Frontend developer with expertise in building scalable mobile and web applications. My passion lies in creating intuitive user experiences using cutting-edge technologies like React.js, Next.js, and TypeScript. I believe in writing clean, maintainable code and staying current with industry best practices.",
      highlights: [
        "5+ years of development experience",
        "Expert in React Native & React.js",
        "Strong focus on user experience",
        "Agile development methodology"
      ]
    },
    skills: {
      title: "Skills & Technologies",
      subtitle: "Tools I use to bring ideas to life",
      categories: {
        frontend: "Frontend",
        mobile: "Mobile",
        backend: "Backend",
        tools: "Tools & Others"
      }
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Some of my recent work",
      viewDemo: "View Demo",
      viewCode: "View Code"
    },
    cv: {
      title: "Download CV",
      english: "English CV",
      turkish: "Turkish CV",
      format: "PDF Format"
    },
    contact: {
      title: "Let's Work Together",
      subtitle: "Have a project in mind? Let's discuss how we can bring your ideas to life.",
      form: {
        name: "Full Name",
        email: "Email Address",
        subject: "Subject",
        message: "Message",
        send: "Send Message",
        sending: "Sending...",
        success: "Message sent successfully!",
        error: "Failed to send message. Please try again.",
        validation: {
          nameRequired: "Name is required",
          emailRequired: "Email is required",
          emailInvalid: "Invalid email address",
          subjectRequired: "Subject is required",
          messageRequired: "Message is required"
        }
      },
      info: {
        email: "alper@example.com",
        phone: "+90 555 123 4567",
        location: "Istanbul, Turkey"
      }
    },
    footer: {
      copyright: "© 2025 Alper Taş. All rights reserved.",
      built: "Built with React & Tailwind CSS"
    },
    accessibility: {
      skipToContent: "Skip to main content",
      toggleTheme: "Toggle theme",
      toggleLanguage: "Toggle language",
      openMenu: "Open navigation menu",
      closeMenu: "Close navigation menu"
    }
  },
  tr: {
    hero: {
      title: "React Native & Frontend Geliştirici",
      tagline: "Modern teknolojilerle olağanüstü mobil ve web deneyimleri geliştiriyorum",
      cta: "Çalışmalarımı İncele"
    },
    nav: {
      about: "Hakkımda",
      skills: "Yetenekler",
      projects: "Projeler",
      contact: "İletişim"
    },
    about: {
      title: "Hakkımda",
      subtitle: "Tutkulu Geliştirici & Problem Çözücü",
      bio: "Ölçeklenebilir mobil ve web uygulamaları geliştirme konusunda uzmanlaşmış, kendini işine adamış bir React Native ve Frontend geliştiricisiyim. Tutkum, React.js, Next.js ve TypeScript gibi son teknolojileri kullanarak sezgisel kullanıcı deneyimleri yaratmakta yatıyor. Temiz, sürdürülebilir kod yazmaya ve sektör en iyi uygulamalarına güncel kalmaya inanıyorum.",
      highlights: [
        "5+ yıl geliştirme deneyimi",
        "React Native & React.js uzmanı",
        "Kullanıcı deneyimine güçlü odaklanma",
        "Çevik geliştirme metodolojisi"
      ]
    },
    skills: {
      title: "Yetenekler & Teknolojiler",
      subtitle: "Fikirleri hayata geçirmek için kullandığım araçlar",
      categories: {
        frontend: "Frontend",
        mobile: "Mobil",
        backend: "Backend",
        tools: "Araçlar & Diğer"
      }
    },
    projects: {
      title: "Öne Çıkan Projeler",
      subtitle: "Son çalışmalarımdan bazıları",
      viewDemo: "Demo İncele",
      viewCode: "Kodu İncele"
    },
    cv: {
      title: "CV İndir",
      english: "İngilizce CV",
      turkish: "Türkçe CV",
      format: "PDF Formatı"
    },
    contact: {
      title: "Birlikte Çalışalım",
      subtitle: "Aklınızda bir proje mi var? Fikirlerinizi nasıl hayata geçirebileceğimizi konuşalım.",
      form: {
        name: "Ad Soyad",
        email: "E-posta Adresi",
        subject: "Konu",
        message: "Mesaj",
        send: "Mesaj Gönder",
        sending: "Gönderiliyor...",
        success: "Mesaj başarıyla gönderildi!",
        error: "Mesaj gönderilemedi. Lütfen tekrar deneyin.",
        validation: {
          nameRequired: "Ad Soyad gereklidir",
          emailRequired: "E-posta gereklidir",
          emailInvalid: "Geçersiz e-posta adresi",
          subjectRequired: "Konu gereklidir",
          messageRequired: "Mesaj gereklidir"
        }
      },
      info: {
        email: "alper@example.com",
        phone: "+90 555 123 4567",
        location: "İstanbul, Türkiye"
      }
    },
    footer: {
      copyright: "© 2025 Alper Taş. Tüm hakları saklıdır.",
      built: "React & Tailwind CSS ile geliştirildi"
    },
    accessibility: {
      skipToContent: "Ana içeriğe geç",
      toggleTheme: "Tema değiştir",
      toggleLanguage: "Dil değiştir",
      openMenu: "Navigasyon menüsünü aç",
      closeMenu: "Navigasyon menüsünü kapat"
    }
  }
};

// Type for translation keys (for better TypeScript support)
export type TranslationKey = keyof typeof translations.en;

// Utility function to get nested translation values
export const getNestedTranslation = (
  obj: any, 
  path: string, 
  fallback: string = ''
): string => {
  return path.split('.').reduce((current, key) => current?.[key], obj) || fallback;
};