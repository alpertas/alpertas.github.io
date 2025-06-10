import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../hooks/useLanguage';
import { translations } from '../../data/translations';
import { skillsData } from '../../data/content';
import { Card } from '../ui/Card';

export const Skills: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const SkillCard: React.FC<{ skill: any; index: number }> = ({ skill, index }) => (
    <motion.div
      key={`skill-${skill.name}-${language}`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="group"
    >
      <Card className="p-6 text-center hover:shadow-xl">
        <div className="text-3xl mb-3 group-hover:animate-bounce">
          {skill.icon}
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          {skill.name}
        </h3>
        <div className="relative">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: `${skill.level}%` } : {}}
              transition={{ duration: 1.5, delay: index * 0.1 + 0.5 }}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
            />
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {skill.level}%
          </span>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          key={`skills-header-${language}`}
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-gray-900 dark:text-white mb-4">
            {t.skills.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t.skills.subtitle}
          </p>
        </motion.div>

        <div className="space-y-12">
          {Object.entries(skillsData).map(([category, skills], categoryIndex) => (
            <motion.div
              key={`skills-category-${category}-${language}`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
            >
              <h3 className="text-2xl font-space-grotesk font-semibold text-gray-900 dark:text-white mb-6 text-center">
                {t.skills.categories[category as keyof typeof t.skills.categories]}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {skills.map((skill, index) => (
                  <SkillCard key={`${skill.name}-${language}`} skill={skill} index={index} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};