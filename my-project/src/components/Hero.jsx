import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaDownload, FaArrowRight } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const socialLinks = [
    { icon: <FaGithub />, label: 'GitHub', url: 'https://github.com', color: 'hover:text-gray-300' },
    { icon: <FaLinkedin />, label: 'LinkedIn', url: 'https://linkedin.com', color: 'hover:text-blue-400' },
    { icon: <FaTwitter />, label: 'Twitter', url: 'https://twitter.com', color: 'hover:text-sky-400' },
    { icon: <FaEnvelope />, label: 'Email', url: 'mailto:hello@example.com', color: 'hover:text-red-400' }
  ];

  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProjectsClick = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #4F46E5 1px, transparent 1px),
                              linear-gradient(to bottom, #4F46E5 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className={`space-y-8 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Available for opportunities
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block">Hi, I'm</span>
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Alex Johnson
              </span>
            </h1>

            {/* Animated Typing Text */}
            <div className="h-20 sm:h-24">
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
                ]}
                wrapper="div"
                cursor={true}
                repeat={Infinity}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-300"
              />
            </div>

            {/* Description */}
            <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
              I craft exceptional digital experiences that are fast, accessible, visually appealing, 
              and responsive. Let's turn your ideas into reality with cutting-edge technologies.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={handleContactClick}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get In Touch
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button
                onClick={handleProjectsClick}
                className="group px-8 py-4 border-2 border-gray-700 rounded-full font-semibold text-lg hover:border-blue-500 transition-all duration-300 hover:bg-blue-500/10"
              >
                <span className="flex items-center gap-2">
                  <FaDownload className="group-hover:animate-bounce" />
                  View Projects
                </span>
              </button>
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <p className="text-gray-500 mb-4">Connect with me</p>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 ${link.color} hover:scale-110`}
                    aria-label={link.label}
                  >
                    <span className="text-xl">{link.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Profile Image/Visual */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative mx-auto lg:mx-0 max-w-lg">
              {/* Main Profile Container */}
              <div className="relative bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl p-8 backdrop-blur-sm border border-gray-700/50">
                {/* Profile Image */}
                <div className="relative">
                  <div className="w-64 h-64 mx-auto rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1 animate-gradient-xy">
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                      <div className="text-7xl">👨‍💻</div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 bg-gray-900/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-700 shadow-2xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">50+</div>
                      <div className="text-sm text-gray-400">Projects</div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 bg-gray-900/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-700 shadow-2xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">4+</div>
                      <div className="text-sm text-gray-400">Years Exp</div>
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mt-12">
                  <h3 className="text-lg font-semibold text-center mb-4 text-gray-300">Tech Stack</h3>
                  <div className="flex justify-center flex-wrap gap-3">
                    {['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind', 'MongoDB'].map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-sm hover:border-blue-500 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Animated Floating Elements */}
              <div className="absolute -z-10 top-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full animate-float"></div>
              <div className="absolute -z-10 bottom-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full animate-float animation-delay-2000"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-sm text-gray-500">Scroll down</span>
            <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2 animate-scroll"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes gradient-xy {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(8px); opacity: 0; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-blob {
          animation: blob 20s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-gradient-xy {
          background-size: 200% 200%;
          animation: gradient-xy 5s ease infinite;
        }
        .animate-scroll {
          animation: scroll 2s infinite;
        }
      `}</style>
    </section>
  );
}