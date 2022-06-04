// const tailwindcssReactNative = require('tailwindcss-react-native/tailwind/native');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './navigation/**/*.{js,ts,jsx,tsx}',
    '../../packages/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  // plugins: [tailwindcssReactNative()],
};
