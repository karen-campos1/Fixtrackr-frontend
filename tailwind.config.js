module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#0466C8',
        secondary: '#F3F5F9',
        white: '#FFFFFF',
        'text-primary': '#333333',
        'text-secondary': '#5C5D6D',
        'text-tertiary': '#B3B3B3',
        gray: {
          icon: '#CCCCCC',
          border: '#D9D9D9',
        },
        alert: {
          green: '#28A745',
          yellow: '#FFC107',
          red: '#DC3545',
        },
      },
      fontFamily: {
        work: ['Work Sans', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
      },
      fontSize: {
        'heading-1': ['48px', { lineHeight: '56.3px' }],
        'heading-2': ['32px', { lineHeight: '37.54px' }],
        'heading-3': ['24px', { lineHeight: '28.15px' }],
        'body-text': ['16px', { lineHeight: '21.79px' }],
        button: ['16px', { lineHeight: '21.79px' }],
      },
      fontWeight: {
        regular: 400,
        medium: 600,
        bold: 700,
      },
    },
  },
  plugins: [],
};
