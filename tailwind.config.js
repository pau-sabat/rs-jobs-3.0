/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.pug",
    "./public/**/*.{html,js,css}",
    "./app.js"
  ],
  theme: {
    extend: {
      screens: {
        'md-2': '900px',
      },
      fontFamily: {
        'rethink': ['RethinkSans', 'sans-serif'],
        'sans': ['RethinkSans', 'sans-serif'],
      },
      colors: {
        primary: '#F0386B',
        secondary: '#0B2A52',
        light: '#F8F9FA',
        dark: '#343A40',
        blue: '#0D6EFD',
        gray: '#6C757D',
        green: '#28A745',
        red: '#DC3545',
        yellow: '#FFC107',
        cyan: '#17A2B8',
      },
      fontSize: {
        'heading-mobile-1': ['32px', { lineHeight: '120%' }],
        'heading-mobile-2': ['28px', { lineHeight: '120%' }],
        'heading-mobile-3': ['22px', { lineHeight: '120%' }],
        'heading-mobile-4': ['18px', { lineHeight: '120%' }],
        'heading-desktop-1': ['48px', { lineHeight: '120%' }],
        'heading-desktop-2': ['36px', { lineHeight: '120%' }],
        'heading-desktop-3': ['28px', { lineHeight: '120%' }],
        'heading-desktop-4': ['22px', { lineHeight: '120%' }],
        'body-mobile': ['16px', { lineHeight: '150%' }],
        'body-desktop': ['18px', { lineHeight: '150%' }],
        'small-mobile': ['14px', { lineHeight: '150%' }],
        'small-desktop': ['16px', { lineHeight: '150%' }],
        'caption-mobile': ['12px', { lineHeight: '140%' }],
        'caption-desktop': ['14px', { lineHeight: '140%' }],
        'label-mobile': ['11px', { lineHeight: '130%' }],
        'label-desktop': ['12px', { lineHeight: '130%' }],
      },
      boxShadow: {
        'md': '0 2px 8px 0 rgba(0, 0, 0, 0.15)'
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(rgba(240, 56, 107, 0.05), rgba(240, 56, 107, 0.05))',
        'gradient-secondary': 'linear-gradient(rgba(11, 42, 82, 0.05), rgba(11, 42, 82, 0.05))',
      }
    },
  },
  plugins: [],
}
