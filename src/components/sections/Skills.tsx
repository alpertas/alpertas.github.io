import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../hooks/useLanguage';
import { translations } from '../../data/translations';
import { skillsData } from '../../data/content';

interface Skill {
  name: string;
  level: number;
  icon: string;
}

export const Skills: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [currentPage, setCurrentPage] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Get all skills or filtered skills
  const allSkills = activeCategory 
    ? (skillsData as Record<string, Skill[]>)[activeCategory] || []
    : Object.values(skillsData).flat();

  // Pagination logic
  const ITEMS_PER_PAGE = 10; // 2 rows x 5 columns
  const totalPages = Math.ceil(allSkills.length / ITEMS_PER_PAGE);
  const currentSkills = allSkills.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const CircularProgress: React.FC<{ percentage: number; delay: number }> = ({ percentage, delay }) => {
    const circumference = 2 * Math.PI * 30;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 70 70">
          {/* Background circle */}
          <circle
            cx="35"
            cy="35"
            r="30"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress circle */}
          <motion.circle
            cx="35"
            cy="35"
            r="30"
            stroke="url(#gradient)"
            strokeWidth="3"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset } : {}}
            transition={{ duration: 2, delay, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: delay + 0.5 }}
            className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white"
          >
            {percentage}%
          </motion.span>
        </div>
      </div>
    );
  };

  const SkillCard: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => (
    <motion.div
      key={`skill-${skill.name}-${language}-${currentPage}`}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.05,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05,
        y: -10,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      className="group relative"
    >
      <div className="relative h-full">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-white/10 dark:to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 shadow-lg group-hover:shadow-2xl transition-all duration-300" />
        
        {/* Decorative corner */}
        <div className="absolute top-2 right-2 w-3 h-3 sm:w-4 sm:h-4">
          <div className="w-full h-full bg-gradient-to-r from-primary-500 to-secondary-500 transform rotate-45 opacity-20 group-hover:opacity-60 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="relative p-4 sm:p-6 text-center h-full flex flex-col justify-between">
          {/* Icon with floating animation */}
          <motion.div
            animate={{ 
              y: [0, -8, 0],
              rotate: [0, 3, -3, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              repeatType: "reverse",
              delay: index * 0.2
            }}
            className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300"
          >
            {skill.icon}
          </motion.div>

          {/* Skill name */}
          <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm sm:text-base group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300 min-h-[2.5rem] flex items-center justify-center">
            {skill.name}
          </h3>

          {/* Circular progress */}
          <CircularProgress 
            percentage={skill.level} 
            delay={index * 0.1} 
          />

          {/* Skill level text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.8 }}
            className="text-xs text-gray-600 dark:text-gray-400 font-medium"
          >
            {skill.level >= 90 ? t.skills.levels.expert : skill.level >= 70 ? t.skills.levels.advanced : skill.level >= 50 ? t.skills.levels.intermediate : t.skills.levels.beginner}
          </motion.div>
        </div>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/20 to-secondary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />
      </div>
    </motion.div>
  );

  const CategoryTab: React.FC<{ category: string; isActive: boolean; onClick: () => void }> = ({ 
    category, 
    isActive, 
    onClick 
  }) => (
    <motion.button
      onClick={() => {
        onClick();
        setCurrentPage(0); // Reset to first page when category changes
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-3 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-base font-medium transition-all duration-300 whitespace-nowrap ${
        isActive
          ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
          : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-800/70'
      } backdrop-blur-sm border border-white/20 dark:border-gray-700/50`}
    >
      {category === 'all' ? t.skills.categories.all : t.skills.categories[category as keyof typeof t.skills.categories]}
    </motion.button>
  );

  const NavigationArrow: React.FC<{ direction: 'left' | 'right'; onClick: () => void }> = ({ 
    direction, 
    onClick 
  }) => (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className="absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-gray-800/40 hover:border-primary-400/50 transition-all duration-300 shadow-lg"
      style={{
        [direction === 'left' ? 'left' : 'right']: '-1.5rem'
      }}
    >
      <svg 
        className={`w-5 h-5 sm:w-6 sm:h-6 ${direction === 'left' ? 'rotate-180' : ''}`} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </motion.button>
  );

  const categories = Object.keys(skillsData);

  return (
    <section id="skills" className="py-16 sm:py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 opacity-30">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          key={`skills-header-${language}`}
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-space-grotesk font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {t.skills.title}
          </motion.h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t.skills.subtitle}
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 sm:mb-16 overflow-x-auto pb-2"
        >
          <CategoryTab
            category="all"
            isActive={activeCategory === null}
            onClick={() => setActiveCategory(null)}
          />
          {categories.map((category) => (
            <CategoryTab
              key={category}
              category={category}
              isActive={activeCategory === category}
              onClick={() => setActiveCategory(activeCategory === category ? null : category)}
            />
          ))}
        </motion.div>

        {/* Skills Grid with Navigation */}
        <div className="relative">
          {/* Navigation Arrows */}
          {totalPages > 1 && (
            <>
              <NavigationArrow direction="left" onClick={prevPage} />
              <NavigationArrow direction="right" onClick={nextPage} />
            </>
          )}

          {/* Skills Grid Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/20 dark:border-gray-700/20 shadow-2xl"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`skills-page-${currentPage}-${activeCategory}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                {/* Mobile: 2 columns, Tablet: 3 columns, Desktop: 5 columns */}
                                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-8">
                   {/* First Row */}
                   {currentSkills.slice(0, 5).map((skill: Skill, index: number) => (
                     <SkillCard key={`${skill.name}-${index}`} skill={skill} index={index} />
                   ))}
                 </div>
                 
                 {/* Second Row */}
                 {currentSkills.length > 5 && (
                   <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                     {currentSkills.slice(5, 10).map((skill: Skill, index: number) => (
                       <SkillCard key={`${skill.name}-${index + 5}`} skill={skill} index={index + 5} />
                     ))}
                   </div>
                 )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Pagination Dots */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex justify-center mt-8 gap-2"
            >
              {Array.from({ length: totalPages }).map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentPage
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 shadow-lg'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                />
              ))}
            </motion.div>
          )}
        </div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
            {[
              { label: t.skills.stats.totalSkills, value: Object.values(skillsData).flat().length },
              { label: t.skills.stats.categories, value: categories.length },
              { label: t.skills.stats.expertLevel, value: Object.values(skillsData).flat().filter(s => s.level >= 90).length },
              { label: t.skills.stats.experience, value: '3+' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="text-center p-4 sm:p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300"
              >
                <div className="text-xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};