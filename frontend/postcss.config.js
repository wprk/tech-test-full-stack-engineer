const tailwindcss = require('tailwindcss');

const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    './src/components/*.tsx',
    './src/pages/*.tsx',
  ],

  defaultExtractor: content => content.match(/[\w-/.:]+(?<!:)/g) || []
})

module.exports = {
  plugins: [
    tailwindcss('./tailwind.config.js'),
    require('autoprefixer'),
    ...process.env.NODE_ENV === 'production'
      ? [purgecss]
      : []
  ]
};