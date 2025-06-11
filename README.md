# Alper Taş - Personal Portfolio

A modern, responsive personal portfolio website built with React, TypeScript, and Tailwind CSS. Features an interactive network background, smooth animations, and multi-language support.

## ✨ Features

### 🎨 Design & UI
- **Modern Design**: Clean, professional interface with dark/light theme support
- **Interactive Network Background**: Dynamic particle system with React Native atom-inspired orbital effects
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Accessibility**: WCAG AA compliant with proper contrast ratios and keyboard navigation

### 🌐 Multi-language Support
- **Bilingual Interface**: English and Turkish language support
- **Dynamic Language Switching**: Instant UI updates without page reload
- **Localized Content**: All text content available in both languages
- **Browser Language Detection**: Automatically detects user's preferred language

### 🎯 Interactive Elements
- **Sticky Navigation**: Fixed header with smooth scroll-to-section functionality
- **Theme Toggle**: Seamless dark/light mode switching with system preference detection
- **Contact Form**: Functional contact form with validation and error handling
- **CV Download**: Downloadable CV in both English and Turkish

### 📱 Sections
- **Hero Section**: Eye-catching introduction with animated network background
- **About**: Personal introduction with highlights and statistics
- **Skills**: Interactive skill showcase with progress bars and categories
- **Projects**: Featured project gallery with hover effects and external links
- **Contact**: Contact form and information with social media links

## 🛠️ Technologies Used

### Frontend Framework
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with enhanced IDE support
- **Vite** - Fast build tool and development server

### Styling & Animation
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Framer Motion** - Production-ready motion library for React
- **Custom CSS** - Additional styling for complex animations and effects

### UI Components & Icons
- **Lucide React** - Beautiful, customizable SVG icons
- **React Hook Form** - Performant forms with easy validation
- **React Intersection Observer** - Efficient scroll-based animations

### Development Tools
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing with Autoprefixer
- **TypeScript ESLint** - TypeScript-specific linting rules

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/alper-tas-portfolio.git
   cd alper-tas-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the portfolio

### Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory, ready for deployment.

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── effects/         # Special effect components
│   │   └── NetworkBackground.tsx
│   ├── layout/          # Layout components
│   │   └── Header.tsx
│   ├── sections/        # Page sections
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── CV.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   └── Skills.tsx
│   └── ui/              # Basic UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       └── LanguageSwitcher.tsx
├── data/                # Static data and content
│   ├── content.ts       # Skills and projects data
│   └── translations.ts  # Multi-language translations
├── hooks/               # Custom React hooks
│   ├── useLanguage.ts   # Language management
│   └── useTheme.ts      # Theme management
├── utils/               # Utility functions
│   └── languageUtils.ts # Language helper functions
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles and Tailwind imports
```

## 🎨 Customization

### Adding New Languages
1. Add language option to `src/hooks/useLanguage.ts`
2. Add translations to `src/data/translations.ts`
3. Update language switcher in `src/components/ui/LanguageSwitcher.tsx`

### Modifying Content
- **Skills**: Edit `skillsData` in `src/data/content.ts`
- **Projects**: Edit `projectsData` in `src/data/content.ts`
- **Translations**: Edit language objects in `src/data/translations.ts`

### Styling Changes
- **Colors**: Modify color palette in `tailwind.config.js`
- **Fonts**: Update font imports in `index.html` and `tailwind.config.js`
- **Animations**: Customize animations in component files or add new ones

### Network Background
The interactive network background can be customized by modifying props in `src/components/sections/Hero.tsx`:
- `nodeCount`: Number of particles
- `connectionDistance`: Distance for particle connections
- `mouseInfluence`: Mouse interaction radius

## 🌐 Deployment

### Netlify (Recommended)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure redirects for SPA routing

### Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Vite and configure build settings
3. Deploy with automatic CI/CD

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add deploy script to package.json
3. Run: `npm run deploy`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Performance Optimizations

- **Code Splitting**: Automatic code splitting with Vite
- **Image Optimization**: Optimized images from Pexels CDN
- **Lazy Loading**: Intersection Observer for scroll-based animations
- **Bundle Optimization**: Tree shaking and minification
- **Caching**: Proper cache headers for static assets

## 🎯 SEO Features

- **Meta Tags**: Comprehensive meta tags for social sharing
- **Open Graph**: Facebook and Twitter card support
- **Semantic HTML**: Proper HTML5 semantic structure
- **Alt Text**: Descriptive alt text for all images
- **Structured Data**: JSON-LD structured data for better search visibility

## 🔒 Accessibility

- **WCAG AA Compliance**: Meets accessibility standards
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels and roles
- **Color Contrast**: Sufficient contrast ratios for all text
- **Focus Management**: Visible focus indicators

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📞 Contact

- **Email**: alper@example.com
- **LinkedIn**: [linkedin.com/in/alpertas](https://linkedin.com/in/alpertas)
- **GitHub**: [github.com/alpertas](https://github.com/alpertas)
- **Website**: [alpertas.dev](https://alpertas.dev)

## 🙏 Acknowledgments

- **Design Inspiration**: Modern portfolio designs and React Native branding
- **Images**: [Pexels](https://pexels.com) for high-quality stock photos
- **Icons**: [Lucide](https://lucide.dev) for beautiful SVG icons
- **Fonts**: [Google Fonts](https://fonts.google.com) for Inter and Space Grotesk

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
