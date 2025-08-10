import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#0b1220'
        }
      },
      boxShadow: {
        glow: '0 0 30px rgba(34,211,238,0.25)'
      }
    }
  },
  plugins: []
}
export default config
