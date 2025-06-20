import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage, type Language } from '../../hooks/useLanguage';

interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
  },
  {
    code: 'tr',
    name: 'Turkish',
    nativeName: 'Türkçe',
    flag: '🇹🇷',
  },
];

interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'toggle' | 'text';
  showFlag?: boolean;
  showNativeName?: boolean;
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'text',
  showFlag = false,
  showNativeName = false,
  className = '',
}) => {
  const { language, setLanguage, toggleLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (newLanguage: Language) => {
    // Use the setLanguage function from useLanguage hook which handles event emission
    setLanguage(newLanguage);
    setIsOpen(false);

    // Add visual feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  // Text variant - simple clickable text with optimal contrast
  if (variant === 'text') {
    return (
      <motion.button
        key={`lang-switcher-${language}`} // Force re-render on language change
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        whileFocus={{ scale: 1.05 }}
        onClick={toggleLanguage}
        className={`
          flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300
          font-medium text-sm
          ${className}
        `}
        title={`Switch to ${language === 'en' ? 'Türkçe' : 'English'}`}
        aria-label={`Switch to ${language === 'en' ? 'Turkish' : 'English'}`}
      >
        <Globe className="w-4 h-4" />
        {showFlag && (
          <span className="text-sm\" aria-hidden="true">
            {currentLanguage.flag}
          </span>
        )}
        <span className="font-medium">{currentLanguage.code.toUpperCase()}</span>
      </motion.button>
    );
  }

  if (variant === 'toggle') {
    return (
      <motion.button
        key={`lang-switcher-toggle-${language}`} // Force re-render on language change
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        whileFocus={{ scale: 1.05 }}
        onClick={toggleLanguage}
        className={`
          flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300
          bg-white/10 hover:bg-white/20 focus:bg-white/20 backdrop-blur-sm border border-white/20
          text-gray-100 hover:text-white focus:text-white
          focus:outline-none focus:ring-2 focus:ring-blue-400/50
          ${className}
        `}
        title={`Switch to ${language === 'en' ? 'Türkçe' : 'English'}`}
        aria-label={`Switch to ${language === 'en' ? 'Turkish' : 'English'}`}
      >
        <Globe className="w-4 h-4" />
        {showFlag && (
          <span className="text-sm\" aria-hidden="true">
            {currentLanguage.flag}
          </span>
        )}
        <span className="text-sm font-medium">
          {showNativeName ? currentLanguage.nativeName : currentLanguage.code.toUpperCase()}
        </span>
      </motion.button>
    );
  }

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        whileFocus={{ scale: 1.02 }}
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300
          bg-gray-700 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-700 
          focus:bg-gray-600 dark:focus:bg-gray-700
          text-gray-100 hover:text-white focus:text-white 
          border border-gray-600 dark:border-gray-600
          min-w-[120px] justify-between
          focus:outline-none focus:ring-2 focus:ring-blue-400/50
        "
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4" />
          {showFlag && (
            <span className="text-sm\" aria-hidden="true">
              {currentLanguage.flag}
            </span>
          )}
          <span className="text-sm font-medium">
            {showNativeName ? currentLanguage.nativeName : currentLanguage.name}
          </span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="
              absolute top-full left-0 mt-2 w-full min-w-[160px]
              bg-gray-800 dark:bg-gray-900 backdrop-blur-lg
              border border-gray-600 dark:border-gray-600
              rounded-lg shadow-xl overflow-hidden
            "
            style={{
              zIndex: 99999,
              position: 'absolute',
            }}
            role="listbox"
          >
            {languages.map(lang => (
              <motion.button
                key={lang.code}
                whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                whileFocus={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                onClick={() => handleLanguageChange(lang.code)}
                className="
                  w-full flex items-center justify-between px-4 py-3
                  text-left transition-colors duration-200
                  text-gray-100 hover:text-white focus:text-white
                  first:rounded-t-lg last:rounded-b-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-inset
                "
                role="option"
                aria-selected={language === lang.code}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg" aria-hidden="true">
                    {lang.flag}
                  </span>
                  <div>
                    <div className="font-medium">{lang.name}</div>
                    <div className="text-xs text-gray-300">{lang.nativeName}</div>
                  </div>
                </div>
                {language === lang.code && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    <Check className="w-4 h-4 text-blue-400" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
