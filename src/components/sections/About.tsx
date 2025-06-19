import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Code, Brain, Lightbulb, Zap } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../hooks/useLanguage';
import { translations } from '../../data/translations';

export const About: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const skills = [
    { icon: Code, label: t.about.skills.development, color: 'text-blue-500' },
    { icon: Brain, label: t.about.skills.problemSolving, color: 'text-purple-500' },
    { icon: Lightbulb, label: t.about.skills.innovation, color: 'text-yellow-500' },
    { icon: Zap, label: t.about.skills.performance, color: 'text-green-500' }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-dark-bg dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          key={`about-header-${language}`}
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto"></div>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-space-grotesk font-bold text-gray-900 dark:text-white mb-6">
            {t.about.title}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t.about.subtitle}
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Skills Section */}
          <motion.div
            key={`about-skills-${language}`}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-1"
          >
            {/* Skills Grid */}
            <motion.div
              key={`about-skills-grid-${language}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 lg:grid-cols-1 gap-4"
            >
              {skills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <motion.div
                    key={`${skill.label}-${language}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <IconComponent className={`w-10 h-10 ${skill.color} mb-3`} />
                    <p className="font-medium text-gray-700 dark:text-gray-300">{skill.label}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            key={`about-content-${language}`}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Bio */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {t.about.bio}
              </p>

              {/* Highlights */}
              <div className="space-y-4">
                {t.about.highlights.map((highlight, index) => (
                  <motion.div
                    key={`highlight-${index}-${language}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="flex items-start space-x-4 group"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors duration-300">
                      <CheckCircle className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Enhanced Stats */}
            <motion.div
              key={`about-stats-${language}`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-3xl md:text-4xl font-bold mb-2">3+</div>
                <div className="text-primary-100">{t.about.stats.experience}</div>
              </div>
              <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-3xl md:text-4xl font-bold mb-2">3+</div>
                <div className="text-secondary-100">{t.about.stats.projects}</div>
              </div>
              <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-3xl md:text-4xl font-bold mb-2">10+</div>
                <div className="text-accent-100">{t.about.stats.technologies}</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};