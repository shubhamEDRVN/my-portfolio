/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: '#050505',
          accent: '#00F5D4', // Cyan
          accent2: '#BF5AF2', // Purple 
          accent3: '#FF6B35',
          text1: '#FFFFFF',
          text2: '#A0A0AB',
          surface: '#0A0A0A',
          border: 'rgba(255, 255, 255, 0.08)',
        }
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
        mono: ['Space Grotesk', 'sans-serif'] // Using Space Grotesk globally for the minimalist geometric look
      },
      boxShadow: {
        'glow-cyan': '0 0 10px rgba(0, 245, 212, 0.5), inset 0 0 10px rgba(0, 245, 212, 0.2)',
        'glow-purple': '0 0 10px rgba(191, 90, 242, 0.5), inset 0 0 10px rgba(191, 90, 242, 0.2)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        }
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        glitch: 'glitch 0.2s linear infinite',
      }
    },
  },
  plugins: [],
}
