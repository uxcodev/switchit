const sizes= {};
for (let i = 0; i < 500; i++) {
  sizes[i] = `${i / 4}rem`;
  sizes[`${i}.5`] = `${(i + 0.5) / 4}rem`;
}

const opacities = {};
for (let i = 0; i <= 100; i++) {
  opacities[i] = `${i / 100}`;
}

const shadows = {
  'sidebar': '0 0 14px 0 rgba(0, 0, 0, .05)'
};

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
      boxShadow: shadows,
      dropShadow: shadows,
      fontSize: {
        xs: ['12px', { lineHeight: '17px' }],
        xsm: ['13px', { lineHeight: '14.3px' }],
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
        primary: '#00C6C6',
        darker: '#151E27',
        dark: '#2c3e50',
        shade: {
          '5d': '#5D647A',
          'e5': '#e5e5e5',
          'f1': '#f1f1f1',
          'f2': '#f2f2f2'
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

