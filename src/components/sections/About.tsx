import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../hooks/useLanguage';
import { translations } from '../../data/translations';

export const About: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="about" className="py-20 bg-white dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          key={`about-header-${language}`}
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-gray-900 dark:text-white mb-4">
            {t.about.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t.about.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            key={`about-image-${language}`}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl opacity-20 blur-xl"
              />
              <img
                src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg"
                alt="Alper Taş working"
                className="relative rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            key={`about-content-${language}`}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {t.about.bio}
            </p>

            <div className="space-y-4">
              {t.about.highlights.map((highlight, index) => (
                <motion.div
                  key={`highlight-${index}-${language}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-6 h-6 text-primary-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              key={`about-stats-${language}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="pt-6"
            >
              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary-500">5+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
                </div>
                <div className="bg-secondary-50 dark:bg-secondary-900/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-secondary-500">50+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</div>
                </div>
                <div className="bg-accent-50 dark:bg-accent-900/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-accent-500">100%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Client Satisfaction</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};