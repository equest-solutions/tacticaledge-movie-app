/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   darkMode: 'class',
   theme: {
      container: {
         center: true,
      },
      extend: {
         colors: {
            primary: {
               DEFAULT: '#2BD17E',
               100: '#2daf6e',
               400: '#707FDD',
               500: '#374286',
               'dark-light': 'rgba(67,97,238,.15)',
            },
            secondary: {
               DEFAULT: '#805dca',
               100: '#ebe4f7',
               'dark-light': 'rgb(128 93 202 / 15%)',
            },
            success: {
               DEFAULT: '#00ab55',
               100: '#ddf5f0',
               'dark-light': 'rgba(0,171,85,.15)',
            },
            danger: {
               DEFAULT: '#EB5757',
               100: '#fff5f5',
               'dark-light': 'rgba(231,81,90,.15)',
            },
            warning: {
               DEFAULT: '#e2a03f',
               100: '#fff9ed',
               'dark-light': 'rgba(226,160,63,.15)',
            },
            info: {
               DEFAULT: '#2196f3',
               100: '#e7f7ff',
               'dark-light': 'rgba(33,150,243,.15)',
            },
            dark: {
               DEFAULT: '#093545',
               100: '#092C39',
               200: '#224957',
               300: '#0829358C',
               'dark-light': 'rgba(59,63,92,.15)',
            },
            black: {
               DEFAULT: '#000',
               100: '#343434',
               200: '#474747',
               'dark-light': 'rgba(14,23,38,.15)',
            },
            gray: {
               DEFAULT: '#929292',
               100: '#C8C8C8',
               200: '#828282',
               300: '#8B8B8B',
            },
            white: {
               DEFAULT: '#ffffff',
               100: '#e0e6ed',
               800: '#888ea8',
            },
         },
         fontFamily: {
            primary: ['Montserrat', 'sans-serif'],
         },
         spacing: {
            1: '2px',
            2: '4px',
            3: '8px',
            3.5: '10px',
            4: '12px',
            4.5: '14px',
            5: '16px',
            5.5: '20px',
            6: '24px',
            6.5: '28px',
            7: '32px',
            8: '40px',
            9: '48px',
            9.5: '54px',
            10: '64px',
            11: '80px',
            12: '120px',
            13: '160px',
         },
         boxShadow: {
            '3xl': '0 2px 2px rgb(224 230 237 / 46%), 1px 6px 7px rgb(224 230 237 / 46%)',
         },
         fontSize: {
            xs: ['0.75rem', '1.33333'],
            sm: ['0.875rem', '1.71429'],
            xl: ['1.25rem', '1.6'],
            '2xl': ['2rem', '1.25'],
            '3xl': ['3rem', '1.16667'],
            '4xl': ['4rem', '1.25'],
            '5xl': ['5rem', '1.25'],
         },
      },
   },
   plugins: [
      require('@tailwindcss/forms')({
         strategy: 'class',
      }),
      require('@tailwindcss/typography'),
   ],
};
