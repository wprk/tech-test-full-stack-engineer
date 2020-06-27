const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    truncate: {
      lines: {
        2: '2',
        4: '4',
        6: '6',
        none: '9999',
      }
    },
    extend: {
      borderWidth: {
        '3': '3px',
      },
      colors: {
        hipages: {
          orange: '#E65C0D',
          'primary-btn': '#FF7B14',
          'primary-btn-active': '#E65C0D',
          'primary-btn-focus': '#E65C0D',
          'primary-btn-hover': '#CC620F',
          'secondary-btn': '#EEEEEE',
          'secondary-btn-active': '#999999',
          'secondary-btn-focus': '#999999',
          'secondary-btn-hover': '#BEBEBE',
        }
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        xs: '400px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/ui'),
    require('tailwindcss-truncate-multiline')(['hover', 'group-hover']), 
  ]
}