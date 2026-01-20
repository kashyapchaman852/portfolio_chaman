import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { 
  FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaDownload, 
  FaArrowRight, FaStar, FaRocket, FaCode, FaHeart, FaFire, 
  FaBolt, FaCog, FaMousePointer, FaPalette, FaGlobe, FaChevronDown 
} from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiMongodb, SiReact } from 'react-icons/si';
import { TypeAnimation } from 'react-type-animation';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Enhanced Theme configurations with custom CSS variables
const themes = {
  electric: {
    name: 'Electric',
    primary: 'from-blue-400 via-purple-400 to-pink-400',
    secondary: 'from-cyan-400 to-blue-500',
    bgGradient: 'from-gray-900 via-black to-gray-900',
    accent: 'blue',
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      tertiary: '#ec4899'
    },
    icon: <FaBolt className="text-yellow-400" />
  },
  neon: {
    name: 'Neon',
    primary: 'from-green-400 via-cyan-400 to-blue-400',
    secondary: 'from-emerald-400 to-cyan-500',
    bgGradient: 'from-gray-950 via-black to-gray-950',
    accent: 'cyan',
    colors: {
      primary: '#10b981',
      secondary: '#06b6d4',
      tertiary: '#0ea5e9'
    },
    icon: <FaFire className="text-green-400" />
  },
  sunset: {
    name: 'Sunset',
    primary: 'from-orange-400 via-red-400 to-pink-400',
    secondary: 'from-amber-400 to-orange-500',
    bgGradient: 'from-gray-900 via-gray-950 to-black',
    accent: 'orange',
    colors: {
      primary: '#f97316',
      secondary: '#ef4444',
      tertiary: '#ec4899'
    },
    icon: <FaHeart className="text-red-400" />
  },
  cosmic: {
    name: 'Cosmic',
    primary: 'from-purple-400 via-violet-400 to-indigo-400',
    secondary: 'from-purple-400 to-indigo-600',
    bgGradient: 'from-gray-950 via-purple-950 to-black',
    accent: 'purple',
    colors: {
      primary: '#8b5cf6',
      secondary: '#7c3aed',
      tertiary: '#4f46e5'
    },
    icon: <FaCog className="text-purple-400" />
  }
};

// Performance optimization: Memoize static arrays
const SOCIAL_LINKS = [
  { icon: <FaGithub />, label: 'GitHub', url: 'https://github.com', color: 'hover:text-gray-300', bgColor: 'bg-gray-900/50' },
  { icon: <FaLinkedin />, label: 'LinkedIn', url: 'https://linkedin.com', color: 'hover:text-blue-400', bgColor: 'bg-blue-900/20' },
  { icon: <FaTwitter />, label: 'Twitter', url: 'https://twitter.com', color: 'hover:text-sky-400', bgColor: 'bg-sky-900/20' },
  { icon: <FaEnvelope />, label: 'Email', url: 'mailto:kashyapchaman852@gmail.com', color: 'hover:text-red-400', bgColor: 'bg-red-900/20' }
];

const TECH_STACK = [
  { name: 'React', icon: <SiReact />, color: 'hover:border-cyan-400 hover:text-cyan-400', bg: 'bg-cyan-900/10' },
  { name: 'TypeScript', icon: <SiTypescript />, color: 'hover:border-blue-400 hover:text-blue-400', bg: 'bg-blue-900/10' },
  { name: 'Node.js', icon: <SiNodedotjs />, color: 'hover:border-green-400 hover:text-green-400', bg: 'bg-green-900/10' },
  { name: 'Next.js', icon: <SiNextdotjs />, color: 'hover:border-gray-300 hover:text-gray-300', bg: 'bg-gray-800/50' },
  { name: 'Tailwind', icon: <SiTailwindcss />, color: 'hover:border-teal-400 hover:text-teal-400', bg: 'bg-teal-900/10' },
  { name: 'MongoDB', icon: <SiMongodb />, color: 'hover:border-green-500 hover:text-green-500', bg: 'bg-emerald-900/10' }
];

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('electric');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [themeChangeCount, setThemeChangeCount] = useState(0);
  const [isThemeChanging, setIsThemeChanging] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTech, setActiveTech] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const { ref: inViewRef, inView } = useInView({ threshold: 0.3 });
  
  // Parallax effects
  const parallaxY = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  
  // Theme configuration
  const theme = themes[currentTheme];
  
  // Memoized theme-specific styles
  const themeStyles = useMemo(() => ({
    '--theme-primary': theme.colors.primary,
    '--theme-secondary': theme.colors.secondary,
    '--theme-tertiary': theme.colors.tertiary,
  }), [theme]);

  // Initialize with optimized useEffect
  useEffect(() => {
    setIsVisible(true);
    setIsMobile(window.innerWidth < 768);
    
    // Debounced particle creation
    const createParticles = () => {
      const particleCount = window.innerWidth < 768 ? 8 : 15;
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 1.5 + 0.5,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.2 + 0.1,
        color: `rgba(${parseInt(theme.colors.primary.slice(1, 3), 16)}, ${parseInt(theme.colors.primary.slice(3, 5), 16)}, ${parseInt(theme.colors.primary.slice(5, 7), 16)}, 0.3)`
      }));
      setParticles(newParticles);
    };

    createParticles();

    // Handle window resize with debouncing
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
        createParticles();
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    // Theme rotation
    let themeTimeout;
    const rotateTheme = () => {
      setIsThemeChanging(true);
      setThemeChangeCount(prev => prev + 1);
      
      setTimeout(() => {
        setCurrentTheme(prev => {
          const themesList = Object.keys(themes);
          const currentIndex = themesList.indexOf(prev);
          return themesList[(currentIndex + 1) % themesList.length];
        });
        
        setTimeout(() => setIsThemeChanging(false), 500);
      }, 500);
      
      themeTimeout = setTimeout(rotateTheme, 20000);
    };

    themeTimeout = setTimeout(rotateTheme, 20000);

    // Scroll detection
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe elements for lazy loading
    document.querySelectorAll('.lazy-load').forEach(el => observer.observe(el));

    return () => {
      clearTimeout(themeTimeout);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Optimized mouse move handler with throttling using requestAnimationFrame
  const handleMouseMove = useCallback((e) => {
    requestAnimationFrame(() => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 100;
      const y = (clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
      setCursorPosition({ x: clientX, y: clientY });
    });
  }, []);

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Interactive theme changer
  const handleThemeChange = (themeName) => {
    setIsThemeChanging(true);
    setCurrentTheme(themeName);
    setInteractionCount(prev => prev + 1);
    
    // Update particles with new theme colors
    setParticles(prev => prev.map(p => ({
      ...p,
      color: `rgba(${parseInt(theme.colors.primary.slice(1, 3), 16)}, ${parseInt(theme.colors.primary.slice(3, 5), 16)}, ${parseInt(theme.colors.primary.slice(5, 7), 16)}, 0.3)`
    })));
    
    setTimeout(() => setIsThemeChanging(false), 500);
  };

  // Enhanced click handlers
  const handleContactClick = () => {
    setInteractionCount(prev => prev + 1);
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleProjectsClick = () => {
    setInteractionCount(prev => prev + 1);
    const projectsElement = document.getElementById('projects');
    if (projectsElement) {
      projectsElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Scroll to next section
  const handleScrollDown = () => {
    window.scrollBy({ 
      top: window.innerHeight * 0.8, 
      behavior: 'smooth' 
    });
  };

  // Tech hover handler
  const handleTechHover = (techName) => {
    setActiveTech(techName);
  };

  return (
    <>
      {/* Custom Cursor */}
      {!isMobile && (
        <>
          <motion.div
            className="fixed w-6 h-6 border-2 border-blue-400 rounded-full pointer-events-none z-50"
            animate={{
              x: cursorPosition.x - 12,
              y: cursorPosition.y - 12,
            }}
            transition={{ type: "spring", mass: 0.5 }}
            style={{ mixBlendMode: 'difference' }}
          />
          <motion.div
            className="fixed w-1 h-1 bg-blue-400 rounded-full pointer-events-none z-50"
            animate={{
              x: cursorPosition.x - 2,
              y: cursorPosition.y - 2,
            }}
            transition={{ type: "spring", mass: 0.3 }}
          />
        </>
      )}

      <section 
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-16"
        onMouseMove={handleMouseMove}
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            var(--theme-primary, #3b82f6) 0%, 
            transparent 60%)`,
          transition: 'background 0.5s ease',
          ...themeStyles
        }}
      >
        {/* Navbar */}
        <motion.nav 
          className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
            isScrolled 
              ? 'bg-gray-900/90 backdrop-blur-md border-b border-gray-800' 
              : 'bg-transparent'
          }`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <motion.div 
                className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                AJ
              </motion.div>
              
              <div className="flex items-center gap-4">
                {/* Theme Selector Dropdown */}
                <div className="relative group">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 hover:border-blue-500 transition-all duration-300"
                  >
                    <FaPalette className="text-blue-400" />
                    <span className="text-sm text-gray-300">{theme.name}</span>
                  </motion.button>
                  
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-900/90 backdrop-blur-lg rounded-xl border border-gray-700 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    {Object.entries(themes).map(([name, config]) => (
                      <button
                        key={name}
                        onClick={() => handleThemeChange(name)}
                        className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-800/50 transition-colors duration-200"
                      >
                        <span className="text-lg">{config.icon}</span>
                        <span className="text-gray-300">{config.name}</span>
                        {currentTheme === name && (
                          <span className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleContactClick}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  Hire Me
                </motion.button>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Performance-optimized Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            initial={{ opacity: 0 }}
            animate={{ 
              x: [`${particle.x}%`, `${particle.x + 5}%`],
              y: [`${particle.y}%`, `${particle.y - 5}%`],
              opacity: [particle.opacity, particle.opacity * 0.5]
            }}
            transition={{
              duration: particle.speed * 15,
              repeat: Infinity,
              repeatType: "reverse",
              delay: particle.delay,
              ease: "easeInOut"
            }}
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              filter: 'blur(1px)'
            }}
          />
        ))}

        {/* Enhanced Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -50, 0]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-10"
            animate={{
              scale: [1, 1.1, 1],
              x: [0, -20, 0],
              y: [0, 20, 0]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            ref={inViewRef}
          >
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              {/* Theme Indicator */}
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/50 backdrop-blur-sm border border-blue-500/30 rounded-full"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Currently on {theme.name} Theme
                </span>
                <FaRocket className="text-pink-400 ml-2" />
              </motion.div>

              {/* Main Heading */}
              <div className="relative">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <motion.span 
                    className="block text-gray-300"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    Hi, I'm
                  </motion.span>
                  <motion.span 
                    className={`block bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent bg-size-200`}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{ 
                      opacity: { duration: 1 },
                      backgroundPosition: { 
                        duration: 3, 
                        repeat: Infinity,
                        ease: "linear" 
                      }
                    }}
                  >
                    Alex Johnson
                  </motion.span>
                </h1>
                <motion.div 
                  className="absolute -top-4 -right-4 text-4xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  ✨
                </motion.div>
              </div>

              {/* Animated Typing Text */}
              <div className="h-20 sm:h-24 flex items-center gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <FaCode className="text-2xl text-blue-400" />
                </motion.div>
                <TypeAnimation
                  sequence={[
                    'Full Stack Developer',
                    2000,
                    'UI/UX Designer',
                    2000,
                    'Problem Solver',
                    2000,
                    'Tech Enthusiast',
                    2000,
                    'Open Source Contributor',
                    2000,
                  ]}
                  wrapper="div"
                  cursor={true}
                  repeat={Infinity}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-300 min-h-[1.5em]"
                />
              </div>

              {/* Description */}
              <motion.p 
                className="text-lg text-gray-400 max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                I craft <span className="text-blue-400 font-semibold">exceptional digital experiences</span> that are fast, accessible, visually appealing, 
                and responsive. Let's turn your ideas into reality with cutting-edge technologies.
                <span className="block mt-4 text-gray-500 text-sm flex items-center gap-2">
                  <FaGlobe /> Available for remote work worldwide
                </span>
              </motion.p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleContactClick}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-lg overflow-hidden shadow-xl"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get In Touch
                    <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleProjectsClick}
                  className="group relative px-8 py-4 bg-gray-900/50 backdrop-blur-sm border-2 border-gray-700 rounded-full font-semibold text-lg overflow-hidden hover:border-blue-500 transition-all duration-300"
                >
                  <span className="flex items-center gap-2 relative z-10">
                    <FaDownload className="group-hover:animate-bounce" />
                    View Projects
                  </span>
                </motion.button>
              </div>

              {/* Social Links */}
              <div className="pt-8">
                <p className="text-gray-500 mb-4 flex items-center gap-2">
                  <FaMousePointer /> Connect with me
                </p>
                <div className="flex gap-4">
                  {SOCIAL_LINKS.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, rotate: 3 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 ${link.bgColor} backdrop-blur-sm rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 ${link.color} group relative overflow-hidden`}
                      aria-label={link.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onMouseEnter={() => handleTechHover(link.label)}
                      onMouseLeave={() => setActiveTech(null)}
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform duration-300 block relative z-10">
                        {link.icon}
                      </span>
                      {activeTech === link.label && (
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                          layoutId="social-bg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Enhanced Profile Visual */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{ y: parallaxY, opacity }}
            >
              <div className="relative mx-auto lg:mx-0 max-w-lg">
                {/* Main Profile Container */}
                <motion.div 
                  className="relative bg-gradient-to-br from-gray-900/80 to-black/80 rounded-3xl p-8 backdrop-blur-xl border border-gray-800 shadow-2xl"
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Profile Image */}
                  <div className="relative mb-12">
                    <motion.div 
                      className="w-64 h-64 mx-auto rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1"
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      }}
                    >
                      <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                        <motion.div 
                          className="text-7xl"
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          👨‍💻
                        </motion.div>
                      </div>
                    </motion.div>
                    
                    {/* Floating Stats */}
                    <motion.div 
                      className="absolute -top-2 -right-2 bg-gray-900/90 backdrop-blur-md p-3 rounded-2xl border border-blue-500/30 shadow-lg"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="text-center">
                        <div className="text-xl font-bold text-white flex items-center gap-2">
                          50+
                          <FaStar className="text-yellow-400" />
                        </div>
                        <div className="text-xs text-gray-400">Projects</div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h3 className="text-lg font-semibold text-center mb-6 text-gray-300">
                      Tech Stack
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {TECH_STACK.map((tech, index) => (
                        <motion.button
                          key={index}
                          className={`flex flex-col items-center p-4 ${tech.bg} border border-gray-800 rounded-2xl transition-all duration-300 ${tech.color} group`}
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onMouseEnter={() => handleTechHover(tech.name)}
                          onMouseLeave={() => setActiveTech(null)}
                        >
                          <span className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                            {tech.icon}
                          </span>
                          <span className="text-sm font-medium">{tech.name}</span>
                          {activeTech === tech.name && (
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/30"
                              layoutId="tech-bg"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Experience Bar */}
                  <div className="mt-8 pt-6 border-t border-gray-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400">Experience Level</span>
                      <span className="text-sm font-bold text-blue-400">Expert</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        transition={{ duration: 2, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={handleScrollDown}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-500">Explore more</span>
            <div className="relative w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center">
              <motion.div 
                className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Custom CSS */}
      <style jsx>{`
        :root {
          --theme-primary: #3b82f6;
          --theme-secondary: #8b5cf6;
          --theme-tertiary: #ec4899;
        }
        
        .bg-size-200 {
          background-size: 200% auto;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .hide-on-mobile {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}