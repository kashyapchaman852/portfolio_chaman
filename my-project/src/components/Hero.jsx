import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaDownload, FaArrowRight } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const socialLinks = [
    { icon: <FaGithub />, label: 'GitHub', url: 'https://github.com', color: 'hover:text-purple-400' },
    { icon: <FaLinkedin />, label: 'LinkedIn', url: 'https://linkedin.com', color: 'hover:text-blue-400' },
    { icon: <FaTwitter />, label: 'Twitter', url: 'https://twitter.com', color: 'hover:text-cyan-400' },
    { icon: <FaEnvelope />, label: 'Email', url: 'mailto:hello@example.com', color: 'hover:text-pink-400' }
  ];

  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProjectsClick = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 pt-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-blob animation-delay-4000"></div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 animate-grid-flow" style={{
            backgroundImage: `linear-gradient(to right, rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-float-particle opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`
              }}
            ></div>
          ))}
        </div>

        {/* Mouse Follower Glow */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full filter blur-3xl pointer-events-none transition-all duration-300"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className={`space-y-8 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Badge with Pulse Animation */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-purple-500/40 rounded-full backdrop-blur-sm animate-pulse-glow">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </div>
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-text">
                Available for opportunities
              </span>
            </div>

            {/* Main Heading with Stagger Animation */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block animate-slide-in-left">Hi, I'm</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-300% animate-gradient-flow animate-slide-in-right">
                Alex Johnson
              </span>
            </h1>

            {/* Animated Typing Text */}
            <div className="h-20 sm:h-24 animate-fade-in-up">
              <TypeAnimation
                sequence={[
                  'Full Stack Developer 🚀',
                  2000,
                  'UI/UX Designer 🎨',
                  2000,
                  'Problem Solver 💡',
                  2000,
                  'Tech Enthusiast ⚡',
                  2000,
                ]}
                wrapper="div"
                cursor={true}
                repeat={Infinity}
                className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent"
              />
            </div>

            {/* Description */}
            <p className="text-lg text-gray-300 max-w-2xl leading-relaxed animate-fade-in-up animation-delay-300">
              I craft exceptional digital experiences that are fast, accessible, visually appealing, 
              and responsive. Let's turn your ideas into reality with cutting-edge technologies.
            </p>

            {/* CTA Buttons with Enhanced Animations */}
            <div className="flex flex-wrap gap-4 pt-4 animate-fade-in-up animation-delay-500">
              <button
                onClick={handleContactClick}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full font-semibold text-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 animate-shimmer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get In Touch
                  <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-pink-600 blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              </button>

              <button
                onClick={handleProjectsClick}
                className="group px-8 py-4 border-2 border-purple-500/50 rounded-full font-semibold text-lg hover:border-purple-400 transition-all duration-300 hover:bg-purple-500/20 backdrop-blur-sm relative overflow-hidden hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FaDownload className="group-hover:animate-bounce" />
                  View Projects
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
              </button>
            </div>

            {/* Social Links with Enhanced Hover */}
            <div className="pt-8 animate-fade-in-up animation-delay-700">
              <p className="text-gray-400 mb-4 font-medium">Connect with me</p>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group p-4 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-purple-500 transition-all duration-300 ${link.color} hover:scale-110 hover:rotate-6 relative overflow-hidden`}
                    aria-label={link.label}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="text-xl relative z-10">{link.icon}</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Profile Image/Visual */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative mx-auto lg:mx-0 max-w-lg">
              {/* Main Profile Container */}
              <div className="relative bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl p-8 backdrop-blur-sm border border-purple-500/30 hover:border-purple-400/50 transition-all duration-500 animate-float-slow">
                {/* Profile Image */}
                <div className="relative group">
                  <div className="w-64 h-64 mx-auto rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 via-purple-500 to-pink-500 p-1 animate-gradient-rotate">
                    <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden group-hover:scale-95 transition-transform duration-500">
                      <div className="text-7xl group-hover:scale-110 transition-transform duration-500">👨‍💻</div>
                    </div>
                  </div>
                  
                  {/* Floating Elements with Enhanced Animation */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md p-4 rounded-2xl border border-purple-500/40 shadow-2xl shadow-purple-500/20 animate-float animation-delay-1000 hover:scale-110 transition-transform cursor-pointer">
                    <div className="text-center">
                      <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">50+</div>
                      <div className="text-sm text-gray-400">Projects</div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md p-4 rounded-2xl border border-pink-500/40 shadow-2xl shadow-pink-500/20 animate-float animation-delay-2000 hover:scale-110 transition-transform cursor-pointer">
                    <div className="text-center">
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">4+</div>
                      <div className="text-sm text-gray-400">Years Exp</div>
                    </div>
                  </div>
                </div>

                {/* Tech Stack with Stagger Animation */}
                <div className="mt-12">
                  <h3 className="text-lg font-semibold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Tech Stack</h3>
                  <div className="flex justify-center flex-wrap gap-3">
                    {['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind', 'MongoDB'].map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-gray-700 rounded-full text-sm hover:border-purple-500 hover:bg-purple-500/20 transition-all duration-300 cursor-pointer hover:scale-110 backdrop-blur-sm animate-fade-in-up"
                        style={{ animationDelay: `${index * 100 + 800}ms` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Animated Floating Elements */}
              <div className="absolute -z-10 top-10 -left-10 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full animate-float blur-2xl"></div>
              <div className="absolute -z-10 bottom-10 -right-10 w-48 h-48 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full animate-float animation-delay-2000 blur-2xl"></div>
              <div className="absolute -z-10 top-1/2 -right-20 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full animate-float animation-delay-4000 blur-2xl"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-400 font-medium">Scroll down</span>
            <div className="w-6 h-10 border-2 border-purple-500/50 rounded-full flex justify-center backdrop-blur-sm">
              <div className="w-1 h-3 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 rounded-full mt-2 animate-scroll"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-particle {
          0%, 100% { 
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
          }
          10%, 90% {
            opacity: 0.4;
          }
          50% { 
            transform: translate(50px, -100px) rotate(180deg);
            opacity: 0.6;
          }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.15); }
          66% { transform: translate(-30px, 30px) scale(0.95); }
        }
        @keyframes gradient-xy {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes gradient-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.3); }
          50% { box-shadow: 0 0 30px rgba(168, 85, 247, 0.5); }
        }
        @keyframes slide-in-left {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-in-right {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fade-in-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes grid-flow {
          0% { transform: translateY(0); }
          100% { transform: translateY(60px); }
        }
        @keyframes gradient-text {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-particle {
          animation: float-particle linear infinite;
        }
        .animate-blob {
          animation: blob 20s infinite;
        }
        .animate-gradient-rotate {
          animation: gradient-rotate 8s linear infinite;
        }
        .animate-gradient-flow {
          animation: gradient-flow 6s ease infinite;
        }
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        .animate-grid-flow {
          animation: grid-flow 20s linear infinite;
        }
        .animate-gradient-text {
          background-size: 200% auto;
          animation: gradient-text 5s ease infinite;
        }
        .animate-scroll {
          animation: scroll 2s infinite;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .animation-delay-700 {
          animation-delay: 0.7s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .bg-300% {
          background-size: 300%;
        }
      `}</style>
    </section>
  );
}