import type { Config } from 'tailwindcss';
const withMT = require('@material-tailwind/react/utils/withMT');

const config: Config = withMT({
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        button: '3px 5px 0 rgb(0,0,0,0.5)',
        button_active: '1.5px 2.5px 0 rgb(0,0,0,0.5)',
      },
      keyframes: {
        ripple: {
          '0%': { transform: 'width: 0px; height: 0px; opacity: 0.5;' },
          '100%': {
            transform: 'width: 5rem; height:5rem; opacity:0;',
          },
        },
      },
      animation: {
        ripple: 'ripple 1s linear',
      },
    },
  },
  plugins: [],
});

export default config;
