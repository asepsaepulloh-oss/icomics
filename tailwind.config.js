/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neu: {
          bg: '#171923',
          surface: '#202431',
          light: '#252A38',
          text: '#F4F5FA',
          muted: '#A5ADBE',
          accent: '#8B7CFF',
          accentHover: '#A99DFF',
          // Light Mode
          lightBg: '#E9ECF2',
          lightSurface: '#F0F3F9',
          lightText: '#1A1E29',
          lightMuted: '#687182',
        }
      },
      boxShadow: {
        'neu-flat': '7px 7px 14px rgba(0, 0, 0, 0.28), -7px -7px 14px rgba(255, 255, 255, 0.025)',
        'neu-inset': 'inset 4px 4px 8px rgba(0, 0, 0, 0.25), inset -4px -4px 8px rgba(255, 255, 255, 0.025)',
        'neu-btn': '4px 4px 10px rgba(0, 0, 0, 0.28), -4px -4px 10px rgba(255, 255, 255, 0.025)',
        'neu-btn-active': 'inset 3px 3px 6px rgba(0, 0, 0, 0.28), inset -3px -3px 6px rgba(255, 255, 255, 0.025)',
      }
    },
  },
  plugins: [],
}
