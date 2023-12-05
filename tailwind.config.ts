import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5c58bd',
        secondary: '#9391e2',
        accent: '#5954e5',
        text: '#09090c',
        bg: '#f5f5fa',
      },
      screens: {
        xs: "400px"
      }
    },
  },
  plugins: [],
}
export default config
