import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Hero', href: '#hero' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('Hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      
      // Calculate active section based on scroll position
      const sections = navLinks.map(link => document.querySelector(link.href));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActive(navLinks[i].name);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ease-in-out backdrop-blur-md border-b border-theme-border flex justify-center items-center ${
          scrolled ? 'py-3 bg-theme-bg/80' : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] w-full px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="font-display text-2xl font-bold tracking-wider relative group">
            SM
            <span className="absolute bottom-1 -right-2 w-1.5 h-1.5 rounded-full bg-theme-accent transition-transform transform group-hover:scale-150"></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 relative">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setActive(link.name)}
                className={`text-sm font-medium transition-colors hover:text-theme-text1 relative py-2 ${
                  active === link.name ? 'text-theme-text1' : 'text-theme-text2'
                }`}
              >
                {link.name}
                {active === link.name && (
                  <motion.div 
                    layoutId="navbar-underline"
                    className="absolute left-0 bottom-0 w-full h-[2px] bg-theme-accent"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-[110]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-theme-text1 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
            <span className={`block w-6 h-0.5 bg-theme-text1 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-6 h-0.5 bg-theme-text1 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[105] bg-theme-surface bg-opacity-95 backdrop-blur-xl flex flex-col justify-center items-center md:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  onClick={() => {
                    setActive(link.name);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-3xl font-display uppercase tracking-widest hover:text-theme-accent transition-colors ${
                    active === link.name ? 'text-theme-accent' : 'text-theme-text1'
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
