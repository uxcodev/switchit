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
    "./node_modules/vue3-tailwind-modal/**/*.js",
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
        xs: ['12px', { lineHeight: '13.76px' }],
        xsm: ['13px', { lineHeight: '15.6px' }],
        sm: ['14px', { lineHeight: '15.4px', }],
        base: ['16px', { lineHeight: '17.6px' }],
        lg: ['18px', { lineHeight: '24px' }],
        xl: ['20px', { lineHeight: '28px'  }],
        '2xl': ['26px', { lineHeight: '28.6px' }],
      },
      fontFamily: {
        metropolis: ['Metropolis', 'sans-serif'],
      },
      colors: {
        primary: '#00C6C6',
        darker: '#151E27',
        dark: '#2c3e50',
        shade: {
          '33': '#333',
          '55': '#555555',
          '5d': '#5D647A',
          '67': '#676A76',
          'ee': '#eeeeee',
          'e5': '#e5e5e5',
          'f1': '#f1f1f1',
          'f2': '#f2f2f2',
          'f5': '#f5f5f5',
          'dd': '#ddd'
        },
        gray: {
          800: '#424242',
          900: '#212121',
        },
        'blue-gray': {
          600: '#546E7A',
          900: '#22485B'
        },
        yellow: {
          '100': '#FFECB3',
          '200': '#FFE082',
          '700': '#795548',
        },
        blue: {
          light: '#019CCD'
        },
        teal: {
          100: '#B2DFDB',
          200: '#80CBC4',
          700: '#00796B'
        },
        red: {
          100: '#FFCDD2',
          200: '#EF9A9A',
          700: '#C62828',
        }
      },
    },
  },
  plugins: [],
}

