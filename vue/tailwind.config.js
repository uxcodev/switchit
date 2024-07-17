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
      borderRadius: sizes,
      fontSize: {
        xs: ['12px', { lineHeight: '17px' }],
        sm: ['14px', { lineHeight: '18px', }],
        base: ['16px', { lineHeight: '20px' }],
        lg: ['18px', { lineHeight: '24px' }],
        xl: ['20px', { lineHeight: '28px'  }],
        '2xl': ['24px', { lineHeight: '32px' }],
      },
      fontFamily: {
        metropolis: ['Metropolis', 'sans-serif'],
      },
      colors: {
        darker: '#151E27',
        dark: '#2c3e50',
        shade: {
          '5d': '#5D647A',
          'f1': '#f1f1f1'
        },
        gray: {
          800: '#424242',
          900: '#212121',
        }
      },
    },
  },
  plugins: [],
}

