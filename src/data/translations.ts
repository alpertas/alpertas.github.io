import type { Language } from '../hooks/useLanguage';

// Import helper functions from useLanguage for consistency
const detectBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';

  const browserLang = navigator.language.toLowerCase();
  const supportedLanguages = ['tr', 'en'];

  if (supportedLanguages.includes(browserLang)) {
    return browserLang as Language;
  }

  const langPrefix = browserLang.split('-')[0];
  if (supportedLanguages.includes(langPrefix)) {
    return langPrefix as Language;
  }

  return 'en';
};

const getStoredLanguage = (): Language | null => {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem('portfolio-language');
    if (stored && (stored === 'en' || stored === 'tr')) {
      return stored as Language;
    }
  } catch (error) {
    console.warn('Failed to read language from localStorage:', error);
  }

  return null;
};

export const translations = {
  en: {
    hero: {
      title: 'React Native & Frontend Developer',
      tagline: 'Building exceptional mobile and web experiences with modern technologies',
      cta: 'View My Work',
    },
    nav: {
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact',
    },
    about: {
      title: 'About Me',
      subtitle: 'Passionate Developer & Technology Enthusiast',
      bio: "I'm a software developer passionate about creating innovative digital solutions. I specialize in React Native and modern web technologies, with a focus on building scalable, user-centric applications. I enjoy solving complex problems and continuously learning new technologies to deliver exceptional results.",
      highlights: [
        'Full-stack development expertise',
        'Mobile-first application development',
        'Performance optimization specialist',
        'Clean code and best practices advocate',
        'Continuous learning mindset',
      ],
      skills: {
        development: 'Development',
        problemSolving: 'Problem Solving',
        innovation: 'Innovation',
        performance: 'Performance',
      },
      stats: {
        experience: 'Years of Coding',
        projects: 'GitHub Projects',
        technologies: 'Tech Skills',
      },
    },
    skills: {
      title: 'Skills & Technologies',
      subtitle: 'Tools I use to bring ideas to life',
      categories: {
        frontend: 'Frontend',
        mobile: 'Mobile',
        backend: 'Backend',
        tools: 'Tools & Others',
        all: 'All Skills',
      },
      stats: {
        totalSkills: 'Total Skills',
        categories: 'Categories',
        expertLevel: 'Expert Level',
        experience: 'Years Experience',
      },
      levels: {
        expert: 'Expert',
        advanced: 'Advanced',
        intermediate: 'Intermediate',
        beginner: 'Beginner',
      },
    },
    projects: {
      title: 'Featured Projects',
      subtitle: 'Some of my recent work',
      viewDemo: 'View Demo',
      viewCode: 'View Code',
      comingSoon: 'Coming Soon',
      comingSoonDescription:
        "I'm currently working on some exciting projects. Stay tuned for updates!",
    },
    cv: {
      title: 'Download CV',
      english: 'English CV',
      turkish: 'Turkish CV',
      format: 'PDF Format',
    },
    contact: {
      title: "Let's Work Together",
      subtitle: "Have a project in mind? Let's discuss how we can bring your ideas to life.",
      form: {
        name: 'Full Name',
        email: 'Email Address',
        subject: 'Subject',
        message: 'Message',
        send: 'Send Message',
        sending: 'Sending...',
        success: 'Message sent successfully!',
        error: 'Failed to send message. Please try again.',
        comingSoon: 'Coming Soon',
        comingSoonDescription: 'Contact form will be available soon',
        validation: {
          nameRequired: 'Name is required',
          emailRequired: 'Email is required',
          emailInvalid: 'Invalid email address',
          subjectRequired: 'Subject is required',
          messageRequired: 'Message is required',
          nameMinLength: 'Name must be at least 2 characters',
          subjectMinLength: 'Subject must be at least 5 characters',
          messageMinLength: 'Message must be at least 10 characters',
          recaptchaRequired: 'Please complete the reCAPTCHA verification',
        },
      },
      info: {
        email: 'alpertas.cpp@gmail.com',
        location: 'Kocaeli, Kartepe, Turkey',
        locationLabel: 'Location',
      },
    },
    footer: {
      copyright: '© 2025 Alper Taş. All rights reserved.',
      built: 'Built with React & Tailwind CSS',
    },
    accessibility: {
      skipToContent: 'Skip to main content',
      toggleTheme: 'Toggle theme',
      toggleLanguage: 'Toggle language',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
    },
  },
  tr: {
    hero: {
      title: 'React Native & Frontend Geliştirici',
      tagline: 'Modern teknolojilerle olağanüstü mobil ve web deneyimleri geliştiriyorum',
      cta: 'Çalışmalarımı İncele',
    },
    nav: {
      about: 'Hakkımda',
      skills: 'Yetenekler',
      projects: 'Projeler',
      contact: 'İletişim',
    },
    about: {
      title: 'Hakkımda',
      subtitle: 'Tutkulu Geliştirici & Teknoloji Meraklısı',
      bio: 'Yenilikçi dijital çözümler yaratma konusunda tutkulu bir yazılım geliştiricisiyim. React Native ve modern web teknolojileri konusunda uzmanlaşmış olup, ölçeklenebilir ve kullanıcı odaklı uygulamalar geliştirmeye odaklanıyorum. Karmaşık problemleri çözmeyi seviyorum ve olağanüstü sonuçlar sunmak için sürekli yeni teknolojiler öğreniyorum.',
      highlights: [
        'Full-stack geliştirme uzmanlığı',
        'Mobil öncelikli uygulama geliştirme',
        'Performans optimizasyonu uzmanı',
        'Temiz kod ve en iyi uygulamalar savunucusu',
        'Sürekli öğrenme zihniyeti',
      ],
      skills: {
        development: 'Geliştirme',
        problemSolving: 'Problem Çözme',
        innovation: 'Yenilikçilik',
        performance: 'Performans',
      },
      stats: {
        experience: 'Yıl Kodlama Deneyimi',
        projects: 'GitHub Projesi',
        technologies: 'Teknik Beceri',
      },
    },
    skills: {
      title: 'Yetenekler & Teknolojiler',
      subtitle: 'Fikirleri hayata geçirmek için kullandığım araçlar',
      categories: {
        frontend: 'Frontend',
        mobile: 'Mobil',
        backend: 'Backend',
        tools: 'Araçlar & Diğer',
        all: 'Tüm Yetenekler',
      },
      stats: {
        totalSkills: 'Toplam Yetenek',
        categories: 'Kategoriler',
        expertLevel: 'Uzman Seviye',
        experience: 'Yıl Deneyim',
      },
      levels: {
        expert: 'Uzman',
        advanced: 'İleri',
        intermediate: 'Orta',
        beginner: 'Başlangıç',
      },
    },
    projects: {
      title: 'Öne Çıkan Projeler',
      subtitle: 'Son çalışmalarımdan bazıları',
      viewDemo: 'Demo İncele',
      viewCode: 'Kodu İncele',
      comingSoon: 'Yakında',
      comingSoonDescription:
        'Şu anda bazı heyecan verici projeler üzerinde çalışıyorum. Güncellemeler için takipte kalın!',
    },
    cv: {
      title: 'CV İndir',
      english: 'İngilizce CV',
      turkish: 'Türkçe CV',
      format: 'PDF Formatı',
    },
    contact: {
      title: 'Birlikte Çalışalım',
      subtitle:
        'Aklınızda bir proje mi var? Fikirlerinizi nasıl hayata geçirebileceğimizi konuşalım.',
      form: {
        name: 'Ad Soyad',
        email: 'E-posta Adresi',
        subject: 'Konu',
        message: 'Mesaj',
        send: 'Mesaj Gönder',
        sending: 'Gönderiliyor...',
        success: 'Mesaj başarıyla gönderildi!',
        error: 'Mesaj gönderilemedi. Lütfen tekrar deneyin.',
        comingSoon: 'Yakında',
        comingSoonDescription: 'İletişim formu yakında kullanıma sunulacak',
        validation: {
          nameRequired: 'Ad Soyad gereklidir',
          emailRequired: 'E-posta gereklidir',
          emailInvalid: 'Geçersiz e-posta adresi',
          subjectRequired: 'Konu gereklidir',
          messageRequired: 'Mesaj gereklidir',
          nameMinLength: 'İsim en az 2 karakter olmalıdır',
          subjectMinLength: 'Konu en az 5 karakter olmalıdır',
          messageMinLength: 'Mesaj en az 10 karakter olmalıdır',
          recaptchaRequired: 'Lütfen reCAPTCHA doğrulamasını tamamlayın',
        },
      },
      info: {
        email: 'alpertas.cpp@gmail.com',
        location: 'Kocaeli, Kartepe, Türkiye',
        locationLabel: 'Konum',
      },
    },
    footer: {
      copyright: '© 2025 Alper Taş. Tüm hakları saklıdır.',
      built: 'React & Tailwind CSS ile geliştirildi',
    },
    accessibility: {
      skipToContent: 'Ana içeriğe geç',
      toggleTheme: 'Tema değiştir',
      toggleLanguage: 'Dil değiştir',
      openMenu: 'Navigasyon menüsünü aç',
      closeMenu: 'Navigasyon menüsünü kapat',
    },
  },
};

// Type for translation keys (for better TypeScript support)
export type TranslationKey = keyof typeof translations.en;

// Export the current language for components that need it without the hook
export const getCurrentLanguage = (): Language => {
  // Always try localStorage first for consistency
  const stored = getStoredLanguage();
  if (stored) return stored;

  // Fallback to browser detection
  return detectBrowserLanguage();
};

// Utility function to get translation with fallback
export const getNestedTranslation = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translations: Record<Language, any>,
  key: string,
  fallbackLanguage: Language = 'en'
): string => {
  // Use stored language preference for consistency
  const currentLang = getCurrentLanguage();

  try {
    // Try to get translation for current language
    const translation = key.split('.').reduce((obj, k) => obj?.[k], translations[currentLang]);
    if (translation && typeof translation === 'string') return translation;

    // Fallback to fallback language
    const fallbackTranslation = key
      .split('.')
      .reduce((obj, k) => obj?.[k], translations[fallbackLanguage]);
    if (fallbackTranslation && typeof fallbackTranslation === 'string') return fallbackTranslation;

    // Return key if no translation found
    console.warn(
      `No translation found for key "${key}" in languages: ${currentLang}, ${fallbackLanguage}`
    );
    return key;
  } catch (error) {
    console.warn(`Translation error for key "${key}":`, error);
    return key;
  }
};
