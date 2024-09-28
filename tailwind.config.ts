import type {Config} from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pastelPink: '#f7d3dc',
        pastelBlue: '#d3e5f7',
        pastelYellow: '#f7ecd3',
        pastelPurple: '#e5d3f7',
        darkGray: '#2f2f2f',
        lightGray: '#ededed',
        retroCream: '#faf9f6',
      },
      boxShadow: {
        retro: '4px 4px 0px 0px rgba(0, 0, 0, 0.25)', // 레트로 느낌의 그림자 효과
      },
    },
  },
  plugins: [],
}
export default config
