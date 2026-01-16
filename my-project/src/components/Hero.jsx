import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaDownload, FaArrowRight, FaStar, FaRocket, FaCode, FaHeart, FaFire, FaBolt, FaCog, FaMousePointer } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';

// Theme configurations
const themes = {
  electric: {
    primary: 'from-blue-400 via-purple-400 to-pink-400',
    bgGradient: 'from-gray-900 via-black to-gray-900',
    accent: 'blue',
    blobColors: ['blue-500', 'purple-500', 'pink-500'],
    icon: <FaBolt className="text-yellow-400" />
  },
  neon: {
    primary: 'from-green-400 via-cyan-400 to-blue-400',
    bgGradient: 'from-gray-950 via-black to-gray-950',
    accent: 'cyan',
    blobColors: ['green-500', 'cyan-500', 'blue-500'],
    icon: <FaFire className="text-green-400" />
  },
  sunset: {
    primary: 'from-orange-400 via-red-400 to-pink-400',
    bgGradient: 'from-gray-900 via-gray-950 to-black',
    accent: 'orange',
    blobColors: ['orange-500', 'red-500', 'pink-500'],
    icon: <FaHeart className="text-red-400" />
  },
  cosmic: {
    primary: 'from-purple-400 via-violet-400 to-indigo-400',
    bgGradient: 'from-gray-950 via-purple-950 to-black',
    accent: 'purple',
    blobColors: ['purple-500', 'violet-500', 'indigo-500'],
    icon: <FaCog className="text-purple-400" />
  }
};

// Performance optimization: Memoize static arrays
const SOCIAL_LINKS = [
  { icon: <FaGithub />, label: 'GitHub', url: 'https://github.com', color: 'hover:text-gray-300', bgColor: 'bg-gray-900' },
  { icon: <FaLinkedin />, label: 'LinkedIn', url: 'https://linkedin.com', color: 'hover:text-blue-400', bgColor: 'bg-blue-900/20' },
  { icon: <FaTwitter />, label: 'Twitter', url: 'https://twitter.com', color: 'hover:text-sky-400', bgColor: 'bg-sky-900/20' },
  { icon: <FaEnvelope />, label: 'Email', url: 'mailto:kashyapchaman852@gmail.com', color: 'hover:text-red-400', bgColor: 'bg-red-900/20' }
];

const TECH_STACK = [
  { name: 'React', icon: '⚛️', color: 'hover:border-cyan-400 hover:text-cyan-400', bg: 'bg-cyan-900/20' },
  { name: 'TypeScript', icon: '📘', color: 'hover:border-blue-400 hover:text-blue-400', bg: 'bg-blue-900/20' },
  { name: 'Node.js', icon: '🟢', color: 'hover:border-green-400 hover:text-green-400', bg: 'bg-green-900/20' },
  { name: 'Next.js', icon: '▲', color: 'hover:border-gray-300 hover:text-gray-300', bg: 'bg-gray-800' },
  { name: 'Tailwind', icon: '🎨', color: 'hover:border-teal-400 hover:text-teal-400', bg: 'bg-teal-900/20' },
  { name: 'MongoDB', icon: '🍃', color: 'hover:border-green-500 hover:text-green-500', bg: 'bg-emerald-900/20' }
];

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('electric');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [themeChangeCount, setThemeChangeCount] = useState(0);
  const [isThemeChanging, setIsThemeChanging] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [interactionCount, setInteractionCount] = useState(0);
  const heroRef = useRef(null);

  // Initialize with optimized useEffect
  useEffect(() => {
    setIsVisible(true);
    
    // Throttled particle creation for performance
    const createParticles = () => {
      const particleCount = window.innerWidth < 768 ? 10 : 20;
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 0.5,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.3 + 0.1
      }));
      setParticles(newParticles);
    };

    createParticles();

    // Handle window resize
    const handleResize = () => {
      createParticles();
    };

    window.addEventListener('resize', handleResize);

    // Theme rotation with enhanced transition
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
      
      themeTimeout = setTimeout(rotateTheme, 15000); // 15 seconds
    };

    themeTimeout = setTimeout(rotateTheme, 15000);

    // Scroll progress tracking
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / rect.height));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => {
      clearTimeout(themeTimeout);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Optimized mouse move handler with throttling
  const handleMouseMove = useCallback((e) => {
    if (e.clientX % 2 === 0) return; // Throttle updates
    
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) * 100;
    const y = (clientY / window.innerHeight) * 100;
    setMousePosition({ x, y });
  }, []);

  // Interactive theme changer
  const handleThemeChange = (themeName) => {
    setIsThemeChanging(true);
    setCurrentTheme(themeName);
    setInteractionCount(prev => prev + 1);
    setTimeout(() => setIsThemeChanging(false), 500);
  };

  // Enhanced click handlers with analytics simulation
  const handleContactClick = () => {
    setInteractionCount(prev => prev + 1);
    document.getElementById('contact')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleProjectsClick = () => {
    setInteractionCount(prev => prev + 1);
    document.getElementById('projects')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const theme = themes[currentTheme];

  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-16"
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
          rgba(var(--theme-${currentTheme}-rgb), 0.15), 
          transparent 60%)`,
        transition: 'background 0.5s ease'
      }}
    >
      {/* Interactive Theme Selector */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        {Object.entries(themes).map(([name, config]) => (
          <motion.button
            key={name}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleThemeChange(name)}
            className={`p-2 rounded-full backdrop-blur-sm border ${
              currentTheme === name 
                ? 'border-white/50 bg-white/10' 
                : 'border-gray-700/50 bg-black/20'
            } transition-all duration-300 hover:border-white/70`}
            title={`Switch to ${name} theme`}
          >
            {config.icon}
          </motion.button>
        ))}
      </div>

      {/* Performance-optimized Particles with requestAnimationFrame */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20"
          initial={{ opacity: 0 }}
          animate={{ 
            x: [`${particle.x}%`, `${particle.x + 10}%`],
            y: [`${particle.y}%`, `${particle.y - 10}%`],
            opacity: [particle.opacity, particle.opacity * 0.5]
          }}
          transition={{
            duration: particle.speed * 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: particle.delay,
            ease: "easeInOut"
          }}
          style={{
            width: particle.size,
            height: particle.size,
            filter: 'blur(1px)'
          }}
        />
      ))}

      {/* Enhanced Gradient Orbs with Framer Motion */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
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
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
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
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            x: ["-50%", "-45%", "-50%"],
            y: ["-50%", "-55%", "-50%"]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />

        {/* Theme-specific dynamic blobs */}
        {theme.blobColors.map((color, index) => (
          <motion.div
            key={index}
            className={`absolute w-64 h-64 rounded-full mix-blend-screen filter blur-3xl opacity-10`}
            style={{
              background: `radial-gradient(circle, ${color.replace('-500', '-400')} 0%, transparent 70%)`,
            }}
            animate={{
              x: [0, Math.sin(index) * 100, 0],
              y: [0, Math.cos(index) * 100, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 15 + index * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index
            }}
          />
        ))}

        {/* Animated Grid Pattern with parallax */}
        <div className="absolute inset-0 opacity-5">
          <motion.div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(90deg, transparent 95%, rgba(79, 70, 229, 0.3) 100%),
                linear-gradient(0deg, transparent 95%, rgba(79, 70, 229, 0.3) 100%)
              `,
              backgroundSize: '50px 50px',
            }}
            animate={{
              backgroundPosition: ['0px 0px', '50px 50px']
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800 z-30">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgress * 100}%` }}
          transition={{ type: "spring", stiffness: 100 }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="grid lg:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Left Column - Text Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Interactive Theme Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-full cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleThemeChange(currentTheme)}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Theme #{themeChangeCount + 1}
              </span>
              <FaRocket className="text-pink-400 group-hover:rotate-45 transition-transform duration-300 ml-2" />
            </motion.div>

            {/* Enhanced Main Heading */}
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

            {/* Enhanced Description */}
            <motion.p 
              className="text-lg text-gray-400 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              I craft <span className="text-blue-400 font-semibold">exceptional digital experiences</span> that are fast, accessible, visually appealing, 
              and responsive. Let's turn your ideas into reality with cutting-edge technologies.
              <span className="block mt-2 text-gray-500 text-sm">
                Interactions: <span className="text-green-400">{interactionCount}</span>
              </span>
            </motion.p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContactClick}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-lg overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get In Touch
                  <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300 group-hover:rotate-12" />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 blur-xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.2 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleProjectsClick}
                className="group relative px-8 py-4 border-2 border-gray-700 rounded-full font-semibold text-lg overflow-hidden"
              >
                <span className="flex items-center gap-2 relative z-10">
                  <FaDownload className="group-hover:animate-bounce" />
                  View Projects
                </span>
                <motion.div 
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </motion.button>
            </div>

            {/* Enhanced Social Links */}
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
                    className={`p-3 ${link.bgColor} backdrop-blur-sm rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 ${link.color} group`}
                    aria-label={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform duration-300 block">
                      {link.icon}
                    </span>
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
          >
            <div className="relative mx-auto lg:mx-0 max-w-lg">
              {/* Main Profile Container */}
              <motion.div 
                className="relative bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl p-8 backdrop-blur-lg border border-gray-700/50 shadow-2xl shadow-blue-500/10"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 0.5, -0.5, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Enhanced Profile Image */}
                <div className="relative">
                  <motion.div 
                    className="w-64 h-64 mx-auto rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1"
                    animate={{
                      rotate: 360,
                      background: [
                        'linear-gradient(to bottom right, #3b82f6, #8b5cf6, #ec4899)',
                        'linear-gradient(to bottom right, #ec4899, #3b82f6, #8b5cf6)',
                        'linear-gradient(to bottom right, #8b5cf6, #ec4899, #3b82f6)',
                        'linear-gradient(to bottom right, #3b82f6, #8b5cf6, #ec4899)'
                      ]
                    }}
                    transition={{
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      background: { duration: 10, repeat: Infinity, ease: "linear" }
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
                    className="absolute -top-4 -right-4 bg-gray-900/80 backdrop-blur-sm p-4 rounded-2xl border border-blue-500/30 shadow-lg shadow-blue-500/20"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white flex items-center gap-2">
                        50+
                        <FaStar className="text-yellow-400" />
                      </div>
                      <div className="text-sm text-gray-400">Projects</div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute -bottom-4 -left-4 bg-gray-900/80 backdrop-blur-sm p-4 rounded-2xl border border-purple-500/30 shadow-lg shadow-purple-500/20"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">4+</div>
                      <div className="text-sm text-gray-400">Years Exp</div>
                    </div>
                  </motion.div>

                  {/* Orbiting Tech Icons */}
                  <div className="absolute inset-0">
                    {TECH_STACK.map((tech, index) => (
                      <motion.div
                        key={index}
                        className="absolute w-10 h-10 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-700"
                        animate={{
                          rotate: 360,
                          x: Math.cos(index * (2 * Math.PI / TECH_STACK.length)) * 120,
                          y: Math.sin(index * (2 * Math.PI / TECH_STACK.length)) * 120
                        }}
                        transition={{
                          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                          x: { duration: 10 + index, repeat: Infinity, ease: "linear" },
                          y: { duration: 10 + index, repeat: Infinity, ease: "linear" }
                        }}
                        whileHover={{ scale: 1.5, zIndex: 50 }}
                      >
                        <span className="text-lg">{tech.icon}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mt-16">
                  <h3 className="text-lg font-semibold text-center mb-4 text-gray-300">
                    Tech Stack
                  </h3>
                  <div className="flex justify-center flex-wrap gap-3">
                    {TECH_STACK.map((tech, index) => (
                      <motion.span
                        key={index}
                        className={`px-4 py-2 ${tech.bg} border border-gray-700 rounded-full text-sm transition-all duration-300 ${tech.color} cursor-pointer`}
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {tech.name}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Animated Code Preview */}
                <div className="mt-8 p-4 bg-gray-900/50 rounded-lg">
                  <div className="flex gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="space-y-2 font-mono text-sm">
                    <motion.div 
                      className="h-2 bg-gray-700 rounded"
                      animate={{ width: ['100%', '75%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div 
                      className="h-2 bg-gray-700 rounded"
                      animate={{ width: ['75%', '50%', '75%'] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div 
                      className="h-2 bg-gray-700 rounded"
                      animate={{ width: ['50%', '100%', '50%'] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-500">Scroll to explore</span>
            <div className="relative w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center group">
              <motion.div 
                className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div 
                className="absolute inset-0 border-2 border-transparent rounded-full"
                animate={{ borderColor: ['transparent', 'rgba(59, 130, 246, 0.5)', 'transparent'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Performance Optimized Styles */}
      <style jsx>{`
        @property --theme-electric-rgb {
          syntax: '<color>';
          initial-value: 59, 130, 246;
          inherits: false;
        }
        
        @property --theme-neon-rgb {
          syntax: '<color>';
          initial-value: 34, 197, 94;
          inherits: false;
        }
        
        @property --theme-sunset-rgb {
          syntax: '<color>';
          initial-value: 249, 115, 22;
          inherits: false;
        }
        
        @property --theme-cosmic-rgb {
          syntax: '<color>';
          initial-value: 139, 92, 246;
          inherits: false;
        }

        .bg-size-200 {
          background-size: 200% auto;
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}