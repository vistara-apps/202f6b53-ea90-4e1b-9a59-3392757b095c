/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(240 74% 47%)',
        accent: 'hsl(204 99% 48%)',
        bg: 'hsl(210 40% 96%)',
        surface: 'hsl(0 0% 100%)',
        textPrimary: 'hsl(220 39% 14%)',
        textSecondary: 'hsl(220 65% 47%)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
      },
      spacing: {
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
        'xl': '32px',
      },
      boxShadow: {
        'card': '0 8px 24px hsla(0, 0%, 0%, 0.12)',
        'dropdown': '0 4px 12px hsla(0, 0%, 0%, 0.08)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
