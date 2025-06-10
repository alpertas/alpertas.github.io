import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { translations } from '../../data/translations';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { label: t.nav.about, id: 'about' },
    { label: t.nav.skills, id: 'skills' },
    { label: t.nav.projects, id: 'projects' },
    { label: t.nav.contact, id: 'contact' }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`
        fixed top-0 left-0 right-0 z-[9999] transition-all duration-300
        ${isScrolled 
          ? 'bg-gray-900/95 dark:bg-gray-950/95 backdrop-blur-lg shadow-xl border-b border-gray-700/30 dark:border-gray-600/30' 
          : 'bg-gray-900/80 dark:bg-gray-950/80 backdrop-blur-sm'
        }
      `}
      style={{
        position: 'fixed',
        width: '100%',
        height: '64px'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="font-space-grotesk font-bold text-xl text-white cursor-pointer z-10 relative flex-shrink-0 hover:text-blue-300 transition-colors duration-300"
            onClick={() => scrollToSection('hero')}
          >
            AT
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 z-10 relative flex-1 justify-center">
            {navItems.map((item) => (
              <motion.button
                key={`nav-${item.id}-${language}`}
                whileHover={{ scale: 1.05 }}
                whileFocus={{ scale: 1.05 }}
                onClick={() => scrollToSection(item.id)}
                className="
                  font-medium transition-all duration-300 whitespace-nowrap
                  text-gray-100 hover:text-white focus:text-white
                  hover:bg-white/10 focus:bg-white/10
                  px-3 py-2 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-400/50
                "
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-3 z-10 relative flex-shrink-0">
            {/* Language Switcher */}
            <div className="relative">
              <LanguageSwitcher 
                variant="text" 
                showFlag={false} 
                showNativeName={false}
                className="
                  text-gray-100 hover:text-white focus:text-white
                  hover:bg-white/10 focus:bg-white/10
                  focus:outline-none focus:ring-2 focus:ring-blue-400/50
                "
              />
            </div>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              whileFocus={{ scale: 1.1 }}
              onClick={toggleTheme}
              className="
                p-2 rounded-lg transition-all duration-300 w-10 h-10 flex items-center justify-center
                bg-white/10 hover:bg-white/20 focus:bg-white/20 backdrop-blur-sm
                text-gray-100 hover:text-white focus:text-white
                focus:outline-none focus:ring-2 focus:ring-blue-400/50
              "
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              whileFocus={{ scale: 1.1 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="
                md:hidden p-2 rounded-lg transition-all duration-300 w-10 h-10 flex items-center justify-center
                bg-white/10 hover:bg-white/20 focus:bg-white/20 backdrop-blur-sm
                text-gray-100 hover:text-white focus:text-white
                focus:outline-none focus:ring-2 focus:ring-blue-400/50
              "
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          className="md:hidden overflow-hidden bg-gray-800/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-lg mt-2 shadow-xl border border-gray-600/30 dark:border-gray-500/30"
        >
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <motion.button
                key={`mobile-nav-${item.id}-${language}`}
                whileHover={{ x: 10 }}
                whileFocus={{ x: 10 }}
                onClick={() => scrollToSection(item.id)}
                className="
                  block w-full text-left py-3 px-3 rounded-lg
                  text-gray-100 hover:text-white focus:text-white
                  hover:bg-white/10 focus:bg-white/10
                  transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-blue-400/50
                "
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};