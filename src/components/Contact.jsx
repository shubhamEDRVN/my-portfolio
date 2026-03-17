import React, { useRef, useState } from 'react';
import { animate } from 'animejs';
import { useMouseMagnetic } from '../hooks/useMouseMagnetic';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success
  const btnRef = useRef(null);
  
  useMouseMagnetic(btnRef, 0.2);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic Client-Side Validation
    if (!formState.name || !formState.email || !formState.message) {
      animate('.form-input', {
        translateX: [
          { to: -10, duration: 50 },
          { to: 10, duration: 50 },
          { to: -10, duration: 50 },
          { to: 0, duration: 50 }
        ],
        ease: 'linear'
      });
      return;
    }

    setStatus('sending');
    
    // Simulate API call for static portfolio
    setTimeout(() => {
      setStatus('success');
      
      // Morph Text Animation
      animate(btnRef.current, {
        scale: [1, 1.05, 1],
        duration: 800,
        ease: 'outElastic(1, .5)'
      });

      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden w-full min-h-[110vh] flex items-center" style={{ background: 'transparent' }}>
      
      {/* Ambient Blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-theme-accent rounded-full blur-[150px] opacity-10 animate-float translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-theme-accent2 rounded-full blur-[150px] opacity-10 animate-pulse-glow -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-[1200px] mt-12 mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Info & Form Stacked */}
          <div className="flex flex-col justify-start gap-16 pointer-events-auto">
            
            {/* Info Section */}
            <div className="flex flex-col justify-center">
              <h2 className="font-display text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">
                Let's <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-accent to-theme-accent2">Connect</span>
              </h2>
              <p className="font-body text-theme-text2 text-lg mb-12 max-w-md">
                Whether you have a specific project in mind, need a full-stack architect, or just want to discuss the future of AI. My inbox is always open.
              </p>

              <div className="space-y-6">
                {[
                  { icon: 'MAIL', label: 'Email', value: 'mehtashubham0070@gmail.com', href: 'mailto:mehtashubham0070@gmail.com' },
                  { icon: 'LINK', label: 'LinkedIn', value: 'linkedin.com/in/shubhammehta', href: 'https://linkedin.com/in/shubhammehta' },
                  { icon: 'GIT', label: 'GitHub', value: 'github.com/shubhamEDRVN', href: 'https://github.com/shubhamEDRVN' }
                ].map((item, idx) => (
                  <a 
                    key={idx} 
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col p-6 rounded-xl bg-theme-surface/80 border border-theme-border backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-theme-accent/50 hover:shadow-[0_10px_30px_rgba(0,245,212,0.1)] relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-[2px] h-0 bg-theme-accent transition-all duration-300 group-hover:h-full" />
                    <span className="font-mono text-xs text-theme-text2 tracking-widest uppercase mb-2">
                      // {item.icon}
                    </span>
                    <div className="font-display text-lg text-theme-text1 group-hover:text-theme-accent transition-colors">
                      {item.value}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Form Section */}
            <div className="flex flex-col justify-center">
              <form onSubmit={handleSubmit} className="bg-theme-surface/50 border border-theme-border rounded-2xl p-8 sm:p-10 backdrop-blur-md relative overflow-hidden">
                
                <div className="absolute top-0 right-0 w-32 h-32 bg-theme-accent/20 blur-[60px]" />
                
                <div className="space-y-8 relative z-10">
                  <div className="relative group">
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="form-input block w-full bg-transparent border-0 border-b-2 border-theme-border text-theme-text1 font-mono py-3 px-1 focus:outline-none focus:ring-0 focus:border-theme-accent transition-colors peer"
                      placeholder=" "
                    />
                    <label htmlFor="name" className="absolute text-sm text-theme-text2 font-mono duration-300 transform -translate-y-6 scale-90 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6 peer-focus:text-theme-accent">
                      NAME
                    </label>
                  </div>

                  <div className="relative group">
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="form-input block w-full bg-transparent border-0 border-b-2 border-theme-border text-theme-text1 font-mono py-3 px-1 focus:outline-none focus:ring-0 focus:border-theme-accent transition-colors peer"
                      placeholder=" "
                    />
                    <label htmlFor="email" className="absolute text-sm text-theme-text2 font-mono duration-300 transform -translate-y-6 scale-90 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6 peer-focus:text-theme-accent">
                      EMAIL
                    </label>
                  </div>

                  <div className="relative group">
                    <textarea 
                      id="message"
                      name="message"
                      rows="4"
                      value={formState.message}
                      onChange={handleChange}
                      className="form-input block w-full bg-transparent border-0 border-b-2 border-theme-border text-theme-text1 font-mono py-3 px-1 focus:outline-none focus:ring-0 focus:border-theme-accent transition-colors peer resize-none"
                      placeholder=" "
                    ></textarea>
                    <label htmlFor="message" className="absolute text-sm text-theme-text2 font-mono duration-300 transform -translate-y-6 scale-90 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6 peer-focus:text-theme-accent">
                      MESSAGE
                    </label>
                  </div>

                  <button 
                    ref={btnRef}
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full relative overflow-hidden bg-gradient-to-r from-theme-accent to-theme-accent2 text-theme-bg font-display font-bold text-lg tracking-wider uppercase py-4 rounded-sm mt-4 shadow-[0_0_20px_rgba(0,245,212,0.2)] hover:shadow-[0_0_30px_rgba(191,90,242,0.4)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {/* Shimmer Effect */}
                    <div className="absolute top-0 -left-[100%] w-1/2 h-full skew-x-12 bg-white/20 group-hover:animate-[gradient-shift_1.5s_ease-out_infinite] z-0" />
                    
                    <span className="relative z-10">
                      {status === 'idle' ? '[ TRANSMIT ]' : status === 'sending' ? 'TRANSMITTING...' : 'MESSAGE SENT ✓'}
                    </span>
                  </button>
                </div>
              </form>
            </div>

          </div>

          {/* Right Column: Empty spacer for 3D Keyboard */}
          <div className="hidden lg:block pointer-events-none relative">
            {/* The 3D model will float here, managed by SplineBackground.jsx */}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
