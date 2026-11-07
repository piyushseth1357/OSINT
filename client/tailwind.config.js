/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: { 950: '#07090f', 900: '#0c1018', 800: '#141a26', 700: '#1e2637' },
        accent: { DEFAULT: '#5b8cff', soft: '#8fb0ff' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(91,140,255,.25), 0 12px 40px -12px rgba(91,140,255,.5)',
      },
    },
  },
  plugins: [],
};
