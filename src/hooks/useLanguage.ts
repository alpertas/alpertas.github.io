import { useState, useEffect, useCallback } from 'react';

export type Language = 'en' | 'tr';

// Create a simple event emitter for language changes
class LanguageEventEmitter {
  private listeners: Set<() => void> = new Set();

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  emit() {
    this.listeners.forEach(listener => listener());
  }
}

const languageEmitter = new LanguageEventEmitter();

// Language detection utilities
const detectBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';

  const browserLang = navigator.language.toLowerCase();
  const supportedLanguages = ['tr', 'en'];

  // Check exact match first
  if (supportedLanguages.includes(browserLang)) {
    return browserLang as Language;
  }

  // Check language prefix (e.g., 'tr-TR' -> 'tr')
  const langPrefix = browserLang.split('-')[0];
  if (supportedLanguages.includes(langPrefix)) {
    return langPrefix as Language;
  }

  // Default to English
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

const storeLanguage = (language: Language): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem('portfolio-language', language);
  } catch (error) {
    console.warn('Failed to store language in localStorage:', error);
  }
};

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    // Priority: stored preference > browser language > default (en)
    return getStoredLanguage() || detectBrowserLanguage();
  });

  // Force re-render when language changes globally
  const [updateKey, setUpdateKey] = useState(0);
  const forceUpdate = useCallback(() => {
    setUpdateKey(prev => prev + 1);
  }, []);

  useEffect(() => {
    const unsubscribe = languageEmitter.subscribe(() => {
      forceUpdate();
    });
    return unsubscribe;
  }, [forceUpdate]);

  useEffect(() => {
    // Store language preference
    storeLanguage(language);

    // Update document language attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }

    // Dispatch custom event for external integrations
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('languageChange', {
          detail: { language },
        })
      );
    }

    // Emit change event to notify other components
    languageEmitter.emit();
  }, [language]);

  const setLanguageWithUpdate = useCallback(
    (newLanguage: Language) => {
      if (newLanguage === language) {
        return; // Prevent unnecessary updates
      }

      // Update language state immediately
      setLanguage(newLanguage);

      // Force immediate re-render for all subscribed components
      requestAnimationFrame(() => {
        languageEmitter.emit();
        forceUpdate();
      });
    },
    [language, forceUpdate]
  );

  const toggleLanguage = useCallback(() => {
    const newLanguage = language === 'en' ? 'tr' : 'en';
    setLanguageWithUpdate(newLanguage);
  }, [language, setLanguageWithUpdate]);

  return {
    language,
    setLanguage: setLanguageWithUpdate,
    toggleLanguage,
    updateKey, // Include update key for components that need it
  };
};

// Utility function to get translation with fallback
export const getTranslation = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translations: Record<Language, any>,
  key: string,
  fallbackLanguage: Language = 'en'
): string => {
  const currentLang = getStoredLanguage() || detectBrowserLanguage();

  try {
    // Try to get translation for current language
    const translation = key.split('.').reduce((obj, k) => obj?.[k], translations[currentLang]);
    if (translation) return translation;

    // Fallback to fallback language
    const fallbackTranslation = key
      .split('.')
      .reduce((obj, k) => obj?.[k], translations[fallbackLanguage]);
    if (fallbackTranslation) return fallbackTranslation;

    // Return key if no translation found
    return key;
  } catch (_error) {
    console.warn(`Translation error for key "${key}":`, _error);
    return key;
  }
};
