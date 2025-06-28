/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B00',
        secondary: '#1A1A1A',
        background: '#F7F7F7',
        card: '#FFFFFF',
        text: '#222222',
        success: '#00C48C',
        error: '#FF3B30',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
