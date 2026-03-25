/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Palette Studio Étoile
        rose:    { DEFAULT: '#FFB6C1', dark: '#FF85A1', light: '#FFE4EA' },
        rubis:   { DEFAULT: '#E8003D', dark: '#B5002F', light: '#FF4D75' },
        corail:  { DEFAULT: '#FF6B6B', dark: '#E04040', light: '#FFB3B3' },
        lavande: { DEFAULT: '#C8A2C8', dark: '#9B72A6', light: '#EAD8EA' },
        or:      { DEFAULT: '#FFD700', dark: '#CCA800', light: '#FFF0A0' },
        porcelaine: { DEFAULT: '#FFF8F8' },
        perle:   { DEFAULT: '#F0EBF4' },
      },
      fontFamily: {
        nunito:   ['Nunito', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      animation: {
        'bounce-slow':  'bounce 2s infinite',
        'pulse-rose':   'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'sparkle':      'sparkle 1.5s ease-in-out infinite',
        'slide-up':     'slideUp 0.4s ease-out',
        'pop':          'pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      keyframes: {
        sparkle: {
          '0%, 100%': { opacity: 1,   transform: 'scale(1)' },
          '50%':      { opacity: 0.6, transform: 'scale(1.15)' },
        },
        slideUp: {
          '0%':   { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pop: {
          '0%':   { transform: 'scale(0.8)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'rose-glow': '0 0 20px rgba(255, 182, 193, 0.6)',
        'or-glow':   '0 0 20px rgba(255, 215, 0, 0.5)',
        'card':      '0 4px 20px rgba(200, 162, 200, 0.2)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
