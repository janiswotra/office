/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1a1a2e',
          light: '#25254f',
          dark: '#0f0f1e'
        },
        teal: '#00d4aa',
        'agent-blue': '#4A90D9',
        'agent-orange': '#FF6B35',
        'agent-purple': '#9B59B6',
        'agent-pink': '#E74C8C',
        'agent-green': '#2ECC71'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'typing': 'typing 1.5s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.5s ease-in',
        'slideIn': 'slideIn 0.3s ease-out'
      },
      keyframes: {
        typing: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideIn: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}
