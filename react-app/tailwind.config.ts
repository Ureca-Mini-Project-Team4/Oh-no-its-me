/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pl: ['Pretendard-Light'],
        pr: ['Pretendard-Regular'],
        pm: ['Pretendard-Medium'],
        ps: ['Pretendard-SemiBold'],
        pb: ['Pretendard-Bold'],
      },
    },
  },
  plugins: [],
};
