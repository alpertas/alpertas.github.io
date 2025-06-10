import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../hooks/useLanguage';
import { translations } from '../../data/translations';
import { projectsData } from '../../data/content';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const Projects: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const ProjectCard: React.FC<{ project: any; index: number }> = ({ project, index }) => (
    <motion.div
      key={`project-${project.id}-${language}`}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      <Card hover className="overflow-hidden h-full">
        <div className="relative group">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex space-x-2">
              <Button
                size="sm"
                className="flex items-center space-x-2"
                onClick={() => window.open(project.demoUrl, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
                <span>{t.projects.viewDemo}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 bg-white/20 border-white/30 text-white hover:bg-white hover:text-gray-900"
                onClick={() => window.open(project.codeUrl, '_blank')}
              >
                <Github className="w-4 h-4" />
                <span>{t.projects.viewCode}</span>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-space-grotesk font-semibold text-gray-900 dark:text-white mb-2">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <section id="projects" className="py-20 bg-white dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          key={`projects-header-${language}`}
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-gray-900 dark:text-white mb-4">
            {t.projects.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t.projects.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={`${project.id}-${language}`} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};