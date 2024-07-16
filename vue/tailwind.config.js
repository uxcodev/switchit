const sizes= {};
for (let i = 0; i < 500; i++) {
  sizes[i] = `${i / 4}rem`;
  sizes[`${i}.5`] = `${(i + 0.5) / 4}rem`;
}

const opacities = {};
for (let i = 0; i <= 100; i++) {
  opacities[i] = `${i / 100}`;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: sizes,
      minWidth: sizes,
      maxWidth: sizes,
      minHeight: sizes,
      maxHeight: sizes,
      borderRadius: {
        sm: '3px',
        ...sizes,
      },
      fontSize: {
        xxs: ['11px', { lineHeight: '16px', letterSpacing: '0.54px' }],
        xs: ['12px', { lineHeight: '17px', letterSpacing: '0.54px' }],
        sm: ['14px', { lineHeight: '20px', letterSpacing: '0.63px' }],
        base: ['16px', { lineHeight: '22px', letterSpacing: '0.48px' }],
        lg: ['18px', { lineHeight: '24px', letterSpacing: '0.6px' }],
        xl: ['20px', { lineHeight: '28px', letterSpacing: '0.6px' }],
        '2xl': ['24px', { lineHeight: '32px', letterSpacing: '0.72px' }],
      },
      colors: {
        primary: '#00203F',
        secondary: '#05C4CB',
        shade: {
          20: '#53657B',
        },
      },
    },
  },
  plugins: [],
}

