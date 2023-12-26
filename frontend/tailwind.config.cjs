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
                    DEFAULT: '#5A67BA',
                    100: '#eaf1ff',
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
                    DEFAULT: '#e7515a',
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
                    DEFAULT: '#3b3f5c',
                    100: '#eaeaec',
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
                nunito: ['Nunito', 'sans-serif'],
                primary: ['Poppins', 'sans-serif'],
                secondary: ['Open Sans', 'sans-serif'],
            },
            spacing: {
                1: '2px',
                2: '4px',
                3: '6px',
                4: '8px',
                4.5: '10px',
                5: '12px',
                5.5: '14px',
                6: '16px',
                7: '18px',
                8: '20px',
                9: '24px',
                9.5: '28px',
                10: '32px',
                11: '40px',
                12: '45px',
            },
            boxShadow: {
                '3xl': '0 2px 2px rgb(224 230 237 / 46%), 1px 6px 7px rgb(224 230 237 / 46%)',
            },
            fontSize: {
                'xl': '1.17856rem',
                // '2xl': '1.17856rem',
                '3xl': '1.77338rem',
                '4xl': '2.04063rem',
                '5xl': '3rem',
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
        require('@tailwindcss/typography'),
    ],
};
