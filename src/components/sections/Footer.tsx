import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { translations } from '../../data/translations';

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:alper@example.com', label: 'Email' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: t.nav.about, id: 'about' },
    { label: t.nav.skills, id: 'skills' },
    { label: t.nav.projects, id: 'projects' },
    { label: t.nav.contact, id: 'contact' },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <motion.div
              key={`footer-brand-${language}`}
              whileHover={{ scale: 1.05 }}
              className="font-space-grotesk font-bold text-2xl text-primary-400 cursor-pointer"
              onClick={() => scrollToSection('hero')}
            >
              Alper Taş
            </motion.div>
            <p className="text-gray-400 leading-relaxed">
              React Native & Frontend Developer building exceptional digital experiences.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Navigation</h3>
            <nav className="space-y-2">
              {navItems.map(item => (
                <motion.button
                  key={`footer-nav-${item.id}-${language}`}
                  whileHover={{ x: 5 }}
                  onClick={() => scrollToSection(item.id)}
                  className="block text-gray-400 hover:text-primary-400 transition-colors duration-300"
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map(link => (
                <motion.a
                  key={`footer-social-${link.label}-${language}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2 bg-gray-800 hover:bg-primary-500 rounded-lg transition-colors duration-300"
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          key={`footer-bottom-${language}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p className="text-gray-400 text-center md:text-left">{t.footer.copyright}</p>
          <p className="text-gray-400 text-center md:text-right flex items-center space-x-1">
            <span>{t.footer.built}</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
