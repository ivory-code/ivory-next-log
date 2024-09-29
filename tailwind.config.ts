import type {Config} from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        '2xl': {max: '1419px'},
        xl: {max: '1179px'},
        lg: {max: '1023px'},
        md: {max: '767px'},
        sm: {max: '480px'},
      },
      colors: {
        pastelPink: '#f7d3dc',
        pastelBlue: '#d3e5f7',
        pastelYellow: '#f7ecd3',
        pastelPurple: '#e5d3f7',
        darkGray: '#2f2f2f',
        lightGray: '#ededed',
        retroCream: '#faf9f6',
        background: '#141718',
        primary: {
          1: '#0084FF',
          2: '#3FDD78',
        },
        accent: {
          1: '#D84C10',
          2: '#3E90F0',
          3: '#8E55EA',
          4: '#8C6584',
          5: '#DDA73F',
        },
        n: {
          1: '#FEFEFE',
          2: '#F3F5F7',
          3: '#E8ECEF',
          4: '#6C7275',
          5: '#343839',
          6: '#232627',
          7: '#141718',
        },
      },
      boxShadow: {
        retro: '4px 4px 0px 0px rgba(0, 0, 0, 0.25)', // 레트로 느낌의 그림자 효과
      },
      spacing: {
        0.25: '0.0625rem',
        0.75: '0.1875rem',
        4.5: '1.125rem',
        5.5: '1.375rem',
        6.5: '1.75rem',
        13: '3.25rem',
        15: '3.75rem',
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
        34: '8.5rem',
        38: '9.5rem',
        58: '14.5rem',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'linear',
      },
      fontFamily: {
        sans: ['Nunito', 'Nanum Square', 'sans-serif'],
      },
      fontSize: {
        0: ['0px', '0px'],
        xl: ['1.125rem', '2rem'],
        '2xl': ['1.5rem', '2.5rem'],
        '3xl': ['1.75rem', '2.5rem'],
        '4xl': ['2.5rem', '3rem'],
        '5xl': ['3rem', '3.5rem'],
        '6xl': ['4rem', '4.5rem'],
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
      },
      borderWidth: {
        3: '0.1875rem',
        6: '0.375rem',
      },
      opacity: {
        15: '.15',
      },
      keyframes: {
        loaderDots: {
          '0%': {opacity: '1'},
          '50%,100%': {opacity: '0.15'},
        },
      },
    },
  },
  plugins: [],
}
export default config
