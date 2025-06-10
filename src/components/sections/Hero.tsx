import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { translations } from '../../data/translations';
import { Button } from '../ui/Button';
import { NetworkBackground } from '../effects/NetworkBackground';

export const Hero: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: 'mailto:alper@example.com', label: 'Email' }
  ];

  return (
    <section id="hero" className="relative">
      <NetworkBackground nodeCount={60} connectionDistance={100} mouseInfluence={120}>
        <div className="min-h-screen flex items-center justify-center relative">
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Profile Image */}
            <motion.div
              key={`hero-image-${language}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="relative inline-block">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-sm opacity-30"
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <img
                    src="https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg"
                    alt="Alper Taş"
                    className="relative w-40 h-40 rounded-full object-cover border-4 border-white/20 shadow-2xl backdrop-blur-sm"
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
              <Button
                size="lg"
                onClick={() => scrollToSection('projects')}
                className="shadow-xl hover:shadow-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 text-white font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
              >
                {t.hero.cta}
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              key={`hero-social-${language}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex justify-center space-x-6 mb-16"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-gray-300 hover:text-white border border-white/20 hover:border-white/40"
                >
                  <link.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              key={`hero-scroll-${language}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <motion.button
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                onClick={() => scrollToSection('about')}
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 p-2 rounded-full hover:bg-white/10"
              >
                <ChevronDown className="w-8 h-8" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </NetworkBackground>
    </section>
  );
};