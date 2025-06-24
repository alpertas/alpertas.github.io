import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import { useLanguage } from './hooks/useLanguage';

// Components
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { CV } from './components/sections/CV';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';

// Error Boundary Component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Please refresh the page and try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-300"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const { theme } = useTheme();
  const { language } = useLanguage();

  // Apply theme class to html element with scrollbar stability
  console.log('version 1.0.0');
  useEffect(() => {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    // Add theme class
    htmlElement.className = theme === 'dark' ? 'dark' : '';

    // Force scrollbar consistency
    htmlElement.style.scrollbarWidth = 'thin';

    // Ensure mobile scrolling works properly
    bodyElement.style.overflowY = 'auto';
    bodyElement.style.setProperty('-webkit-overflow-scrolling', 'touch');
    bodyElement.style.touchAction = 'pan-y';

    // Mobile-specific fixes
    if (window.innerWidth <= 768) {
      htmlElement.style.height = '100%';
      htmlElement.style.overflow = 'hidden auto';
      bodyElement.style.height = 'auto';
      bodyElement.style.minHeight = '100vh';
    }

    return () => {
      // Ensure scrolling is never disabled
      bodyElement.style.overflow = '';
    };
  }, [theme]);

  // Apply language to html element
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <ErrorBoundary>
      <Header key={`header-${language}`} />
      <AnimatePresence mode="wait">
        <motion.div
          key={`app-${theme}-${language}`}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-white theme-stable"
          style={{
            width: '100%',
            maxWidth: '100vw',
            height: 'auto',
            minHeight: '100vh',
            overflowX: 'hidden',
            overflowY: 'auto',
          }}
        >
          <main key={`main-${language}`}>
            <Hero key={`hero-${language}`} />
            <About key={`about-${language}`} />
            <Skills key={`skills-${language}`} />
            <Projects key={`projects-${language}`} />
            <CV key={`cv-${language}`} />
            <Contact key={`contact-${language}`} />
          </main>
          <Footer key={`footer-${language}`} />
        </motion.div>
      </AnimatePresence>
    </ErrorBoundary>
  );
}

export default App;
