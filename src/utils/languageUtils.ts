import { translations, type TranslationKey } from '../data/translations';
import { type Language } from '../hooks/useLanguage';

/**
 * Get translation with fallback support
 */
export const getTranslation = (
  language: Language,
  key: string,
  fallbackLanguage: Language = 'en'
): string => {
  try {
    // Try to get translation for current language
    const translation = key.split('.').reduce((obj, k) => obj?.[k], translations[language]);
    if (translation && typeof translation === 'string') return translation;
    
    // Fallback to fallback language
    const fallbackTranslation = key.split('.').reduce((obj, k) => obj?.[k], translations[fallbackLanguage]);
    if (fallbackTranslation && typeof fallbackTranslation === 'string') return fallbackTranslation;
    
    // Return key if no translation found
    return key;
  } catch (error) {
    console.warn(`Translation error for key "${key}":`, error);
    return key;
  }
};

/**
 * Format date according to language locale
 */
export const formatDate = (date: Date, language: Language): string => {
  const locale = language === 'tr' ? 'tr-TR' : 'en-US';
  
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

/**
 * Format number according to language locale
 */
export const formatNumber = (number: number, language: Language): string => {
  const locale = language === 'tr' ? 'tr-TR' : 'en-US';
  
  return new Intl.NumberFormat(locale).format(number);
};

/**
 * Get text direction for language (for future RTL support)
 */
export const getTextDirection = (language: Language): 'ltr' | 'rtl' => {
  // Currently all supported languages are LTR
  // This can be extended for RTL languages like Arabic
  return 'ltr';
};

/**
 * Validate if a language is supported
 */
export const isSupportedLanguage = (lang: string): lang is Language => {
  return ['en', 'tr'].includes(lang);
};

/**
 * Get browser's preferred language from supported languages
 */
export const getBrowserLanguage = (): Language => {
  if (typeof navigator === 'undefined') return 'en';
  
  const browserLangs = navigator.languages || [navigator.language];
  
  for (const lang of browserLangs) {
    const langCode = lang.split('-')[0].toLowerCase();
    if (isSupportedLanguage(langCode)) {
      return langCode;
    }
  }
  
  return 'en'; // Default fallback
};

/**
 * Language metadata
 */
export const languageMetadata = {
  en: {
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    locale: 'en-US',
    direction: 'ltr' as const
  },
  tr: {
    name: 'Turkish',
    nativeName: 'Türkçe',
    flag: '🇹🇷',
    locale: 'tr-TR',
    direction: 'ltr' as const
  }
} as const;