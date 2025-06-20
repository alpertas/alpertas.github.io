import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Sparkles } from 'lucide-react';
// import { ExternalLink, Github } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../hooks/useLanguage';
import { translations } from '../../data/translations';
// import { projectsData } from '../../data/content';
// import { Card } from '../ui/Card';
// import { Button } from '../ui/Button';

export const Projects: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  // interface Project {
  //   id: number;
  //   title: string;
  //   description: string;
  //   image: string;
  //   demoUrl: string;
  //   codeUrl: string;
  //   tags: string[];
  // }

  // const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => (
  //   <motion.div
  //     key={`project-${project.id}-${language}`}
  //     initial={{ opacity: 0, y: 50 }}
  //     animate={inView ? { opacity: 1, y: 0 } : {}}
  //     transition={{ duration: 0.8, delay: index * 0.2 }}
  //   >
  //     <Card hover className="overflow-hidden h-full">
  //       <div className="relative group overflow-hidden">
  //         <img
  //           src={project.image}
  //           alt={project.title}
  //           className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
  //         />
  //         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  //         <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
  //           <div className="flex space-x-2">
  //             <Button
  //               size="sm"
  //               className="flex items-center space-x-2"
  //               onClick={() => window.open(project.demoUrl, '_blank')}
  //             >
  //               <ExternalLink className="w-4 h-4" />
  //               <span>{t.projects.viewDemo}</span>
  //             </Button>
  //             <Button
  //               variant="outline"
  //               size="sm"
  //               className="flex items-center space-x-2 bg-white/20 border-white/30 text-white hover:bg-white hover:!text-gray-900 transition-colors duration-200"
  //               onClick={() => window.open(project.codeUrl, '_blank')}
  //             >
  //               <Github className="w-4 h-4" />
  //               <span>{t.projects.viewCode}</span>
  //             </Button>
  //           </div>
  //         </div>
  //       </div>

  //       <div className="p-6">
  //         <h3 className="text-xl font-space-grotesk font-semibold text-gray-900 dark:text-white mb-2">
  //           {project.title}
  //         </h3>
  //         <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
  //           {project.description}
  //         </p>
  //         <div className="flex flex-wrap gap-2">
  //           {project.tags.map((tag: string) => (
  //             <span
  //               key={tag}
  //               className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm rounded-full"
  //             >
  //               {tag}
  //             </span>
  //           ))}
  //         </div>
  //       </div>
  //     </Card>
  //   </motion.div>
  // );

  return (
    <section id="projects" className="py-20 bg-white dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          key={`projects-header-${language}`}
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-gray-900 dark:text-white mb-4">
            {t.projects.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">{t.projects.subtitle}</p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative p-12 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-3xl border border-primary-100 dark:border-primary-800">
              <div className="absolute -top-4 -right-4">
                <div className="bg-primary-500 text-white p-3 rounded-full shadow-lg">
                  <Sparkles className="w-6 h-6" />
                </div>
              </div>
              
              <div className="flex items-center justify-center mb-6">
                <Clock className="w-12 h-12 text-primary-500 mr-4" />
                <h3 className="text-3xl font-space-grotesk font-bold text-gray-900 dark:text-white">
                  {t.projects.comingSoon}
                </h3>
              </div>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {t.projects.comingSoonDescription}
              </p>
                         </div>
           </motion.div>

           {/* Grid for projects - uncomment when needed */}
           {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
             {projectsData.map((project, index) => (
               <ProjectCard key={`${project.id}-${language}`} project={project} index={index} />
             ))}
           </div> */}
         </motion.div>
       </div>
     </section>
   );
 };
