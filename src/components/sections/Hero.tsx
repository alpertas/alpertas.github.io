import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { translations } from '../../data/translations';
import { NetworkBackground } from '../effects/NetworkBackground';

export const Hero: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  // Mobil cihaz kontrolü için hook
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/alpertas', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/alpertasdev/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:alpertas.cpp@gmail.com', label: 'Email' },
  ];

  // Mobil ve desktop için farklı NetworkBackground ayarları
  const networkProps = isMobile
    ? { nodeCount: 0, connectionDistance: 0, mouseInfluence: 0 } // Mobil: Tamamen kapalı
    : { nodeCount: 140, connectionDistance: 400, mouseInfluence: 500 }; // Desktop: Normal ayarlar

  return (
    <section id="hero" className="relative">
      <NetworkBackground {...networkProps}>
        <div className="min-h-screen flex items-center justify-center relative">
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Profile Image */}
            <motion.div
              key={`hero-image-${language}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8 mt-6"
            >
              <div className="relative inline-block">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-sm opacity-30"
                />
                <motion.div whileHover={{ scale: 1.05 }} className="relative">
                  <img
                    src="/AlperTasPicture.webp"
                    alt="Alper Taş - React Native & Frontend Developer"
                    className="relative w-40 h-40 rounded-full object-cover border-4 border-white/20 shadow-2xl backdrop-blur-sm"
                    width="160"
                    height="160"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-500/20 to-transparent" />
                </motion.div>
              </div>
            </motion.div>

            {/* Name */}
            <motion.h1
              key={`hero-name-${language}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl font-space-grotesk font-bold text-white mb-4 drop-shadow-lg"
            >
              Alper Taş
            </motion.h1>

            {/* Title */}
            <motion.h2
              key={`hero-title-${language}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-2xl md:text-3xl font-inter text-blue-400 mb-6 drop-shadow-md"
            >
              {t.hero.title}
            </motion.h2>

            {/* Tagline */}
            <motion.p
              key={`hero-tagline-${language}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-sm"
            >
              {t.hero.tagline}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              key={`hero-cta-${language}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="mb-12"
            >
              <motion.button
                onClick={() => scrollToSection('projects')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative px-12 py-4 text-lg font-medium text-white bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:border-blue-400/50 hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:shadow-xl"
                aria-label={t.accessibility.viewProjects}
                title={t.accessibility.viewProjects}
                type="button"
              >
                {t.hero.cta}
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              key={`hero-social-${language}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex justify-center space-x-6 mb-16"
            >
              {socialLinks.map(link => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-gray-300 hover:text-white border border-white/20 hover:border-white/40"
                  aria-label={
                    t.accessibility.socialLinks[
                      link.label.toLowerCase() as keyof typeof t.accessibility.socialLinks
                    ]
                  }
                  title={
                    t.accessibility.socialLinks[
                      link.label.toLowerCase() as keyof typeof t.accessibility.socialLinks
                    ]
                  }
                >
                  <link.icon className="w-6 h-6" aria-hidden="true" />
                  <span className="sr-only">
                    {
                      t.accessibility.socialLinks[
                        link.label.toLowerCase() as keyof typeof t.accessibility.socialLinks
                      ]
                    }
                  </span>
                </motion.a>
              ))}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              key={`hero-scroll-${language}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
            >
              <motion.button
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                onClick={() => scrollToSection('about')}
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 p-2 rounded-full hover:bg-white/10"
                aria-label={t.accessibility.goToSection.replace('{{section}}', t.nav.about)}
                title={t.accessibility.scrollDown}
                type="button"
              >
                <ChevronDown className="w-8 h-8" aria-hidden="true" />
                <span className="sr-only">{t.accessibility.scrollDown}</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </NetworkBackground>
    </section>
  );
};
