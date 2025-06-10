import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      className={`
        bg-white dark:bg-dark-surface 
        rounded-xl shadow-lg dark:shadow-gray-900/20 
        border border-gray-100 dark:border-dark-border
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};