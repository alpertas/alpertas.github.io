import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../hooks/useLanguage';
import { translations } from '../../data/translations';
import { Button } from '../ui/Button';

export const CV: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const handleDownload = (lang: 'en' | 'tr') => {
    // In a real implementation, this would download the actual CV file
    const fileName = `Alper_Tas_CV_${lang.toUpperCase()}.pdf`;
    console.log(`Downloading ${fileName}`);

    // Track download analytics
    if (typeof window !== 'undefined' && 'gtag' in window && typeof window.gtag === 'function') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag('event', 'download', {
        event_category: 'CV',
        event_label: lang,
        value: 1,
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-dark-surface dark:to-dark-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          key={`cv-content-${language}`}
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-space-grotesk font-bold text-gray-900 dark:text-white mb-4">
            {t.cv.title}
          </h2>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* English CV */}
            <motion.div
              key={`cv-english-${language}`}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group"
            >
              <div className="bg-white dark:bg-dark-surface rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-dark-border">
                <div className="flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t.cv.english}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  {t.cv.format} • 2.3 MB
                </p>
                <Button
                  onClick={() => handleDownload('en')}
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </Button>
              </div>
            </motion.div>

            {/* Turkish CV */}
            <motion.div
              key={`cv-turkish-${language}`}
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="group"
            >
              <div className="bg-white dark:bg-dark-surface rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-dark-border">
                <div className="flex items-center justify-center w-16 h-16 bg-secondary-100 dark:bg-secondary-900/30 rounded-full mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-8 h-8 text-secondary-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t.cv.turkish}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  {t.cv.format} • 2.1 MB
                </p>
                <Button
                  variant="secondary"
                  onClick={() => handleDownload('tr')}
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>İndir</span>
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
