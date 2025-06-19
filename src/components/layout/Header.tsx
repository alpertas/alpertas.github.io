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
      const scrollPosition = window.scrollY;
      const shouldShowBg = scrollPosition > 50;
      setIsScrolled(shouldShowBg);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`
        fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 h-16 w-full
        ${isScrolled
          ? 'backdrop-blur-lg shadow-md'
          : 'bg-transparent backdrop-blur-sm'
        }
      `}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '64px',
        zIndex: 9999,
        transform: 'none',
        willChange: 'background-color, backdrop-filter, box-shadow',
        background: isScrolled 
          ? 'linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(30, 41, 59) 50%, rgb(51, 65, 85) 100%)'
          : 'transparent'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full"
      >
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`font-space-grotesk font-bold text-xl cursor-pointer z-10 relative flex-shrink-0 transition-colors duration-300 ${
              isScrolled 
                ? 'text-white hover:text-blue-300' 
                : 'text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
            }`}
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
                className={`
                  whitespace-nowrap px-3 py-2 rounded-lg font-medium transition-colors duration-300
                  focus:outline-none focus:ring-2 focus:ring-primary-500/50
                  ${isScrolled 
                    ? 'text-gray-100 hover:text-white focus:text-white hover:bg-white/10 focus:bg-white/10' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
                  }
                `}
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
                className={`
                  focus:outline-none focus:ring-2 focus:ring-primary-500/50 font-medium transition-colors duration-300
                  ${isScrolled 
                    ? 'text-gray-100 hover:text-white focus:text-white hover:bg-white/10 focus:bg-white/10' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
                  }
                `}
              />
            </div>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              whileFocus={{ scale: 1.1 }}
              onClick={toggleTheme}
              className={`
                p-2 rounded-lg transition-all duration-300 w-10 h-10 flex items-center justify-center
                focus:outline-none focus:ring-2 focus:ring-primary-500/50
                ${isScrolled 
                  ? 'text-gray-100 hover:text-white focus:text-white hover:bg-white/10 focus:bg-white/10' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800'
                }
              `}
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              whileFocus={{ scale: 1.1 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`
                md:hidden p-2 rounded-lg transition-all duration-300 w-10 h-10 flex items-center justify-center
                focus:outline-none focus:ring-2 focus:ring-primary-500/50
                ${isScrolled 
                  ? 'text-gray-100 hover:text-white focus:text-white hover:bg-white/10 focus:bg-white/10' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800'
                }
              `}
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
          className={`md:hidden overflow-hidden backdrop-blur-lg rounded-lg mt-2 shadow-lg border ${
            isScrolled 
              ? 'border-gray-500/40 dark:border-gray-400/40' 
              : 'border-gray-200 dark:border-gray-700'
          }`}
          style={{
            background: isScrolled 
              ? 'linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(30, 41, 59) 50%, rgb(51, 65, 85) 100%)'
              : 'rgba(255, 255, 255, 0.95)'
          }}
        >
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <motion.button
                key={`mobile-nav-${item.id}-${language}`}
                whileHover={{ x: 10 }}
                whileFocus={{ x: 10 }}
                onClick={() => scrollToSection(item.id)}
                className={`
                  block w-full text-left py-3 px-3 rounded-lg
                  font-medium transition-colors duration-300
                  focus:outline-none focus:ring-2 focus:ring-primary-500/50
                  ${isScrolled 
                    ? 'text-gray-100 hover:text-white focus:text-white hover:bg-white/10 focus:bg-white/10' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800'
                  }
                `}
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