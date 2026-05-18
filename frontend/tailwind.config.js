/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0F172A',
        'dark-card': '#1E293B',
        'primary': '#6366F1',
        'accent': '#8B5CF6',
        'text-primary': '#F8FAFC',
        'text-secondary': '#CBD5E1'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
