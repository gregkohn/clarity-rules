/** @type {import('tailwindcss').Config} */

import plugin from 'tailwindcss/plugin'
import colors from 'tailwindcss/colors'

const rem = (px) => `${px / 16}rem`
const remPair = (px) => ({ [px]: rem(px) })
// const pxPair = (px) => ({ [px]: `${px}px` });

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      animation: {
        'scale-in': 'scale-in 0.5s forwards',
        'fade-in': 'fade-in 0.5s forwards',
      },
      keyframes: {
        'scale-in': {
          from: {
            opacity: 0,
            transform: 'translateY(5px) scale(0.85)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0) scale(1)',
          },
        },
        'fade-in': {
          from: {
            opacity: 0,
            transform: 'translateY(5px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      },
    },
    colors: {
      white: '#fff',
      black: '#000',
      transparent: 'transparent',
      current: 'currentColor',
      brand: {
        DEFAULT: '#755dc8',
        dark: '#4e3e8a',
        light: '#dcd6f1',
      },
      gray: {
        ...colors.gray,
        50: '#fbfbfc',
        100: '#e6e5e8',
        300: '#aeaeae',
        400: '#9090a6',
        700: '#65657a',
        900: '#1f1738',
      },
      green: {
        ...colors.green,
        500: '#3eb660',
      },
      error: colors.rose[400],
    },
    spacing: {
      0: 0,
      ...remPair(1),
      ...remPair(2),
      ...remPair(4),
      ...remPair(5),
      ...remPair(6),
      ...remPair(8),
      ...remPair(10),
      ...remPair(12),
      ...remPair(14),
      ...remPair(16),
      ...remPair(18),
      ...remPair(20),
      ...remPair(24),
      ...remPair(32),
      ...remPair(36),
      ...remPair(40),
      ...remPair(48),
      ...remPair(56),
      ...remPair(64),
      ...remPair(72),
      ...remPair(80),
      ...remPair(88),
      ...remPair(96),
      ...remPair(300),
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      // addVariant('state-open', '&[data-state="open"]')
      // addVariant('group-state-open', ':merge(.group)[data-state="open"] &')
      // addVariant('state-closed', '&[data-state="closed"]')
      addVariant('state-checked', '&[data-state="checked"]')
    }),
  ],
}
