import { type Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {},
      colors: {
        primary: '#283271',
        secondary: '#f8f8f8',
        tertiary: '#ff0000',
      },
    },
  },

  plugins: [],
} satisfies Config
