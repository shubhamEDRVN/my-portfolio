import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full border-t border-theme-border bg-theme-bg py-8 mt-auto relative z-10">
      <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex flex-col items-center md:items-start">
          <span className="font-display font-bold text-xl text-theme-text1 tracking-widest">SM.</span>
          <span className="font-mono text-theme-text2 text-xs mt-2">© {new Date().getFullYear()} SHUBHAM MEHTA</span>
        </div>

        <div className="flex gap-6 font-mono text-sm">
          <a href="https://github.com/shubhamEDRVN" target="_blank" rel="noopener noreferrer" className="text-theme-text2 hover:text-theme-accent transition-colors">
            [ GITHUB ]
          </a>
          <a href="https://linkedin.com/in/shubhammehta" target="_blank" rel="noopener noreferrer" className="text-theme-text2 hover:text-theme-accent2 transition-colors">
            [ LINKEDIN ]
          </a>
        </div>
        
        <div className="hidden md:block">
          <span className="font-mono text-[10px] text-theme-text2 tracking-widest opacity-50">
            SYS_ONLINE // BUILD_COMPLETE
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
