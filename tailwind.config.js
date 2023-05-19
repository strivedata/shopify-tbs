const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  important: true,
  content: [
    './layout/*.liquid',
    './templates/*.liquid',
    './templates/customers/*.liquid',
    './sections/*.liquid',
    './snippets/*.liquid',
  ],
  theme: {
    columns: replaceRem(defaultTheme.columns),
    spacing: replaceRem(defaultTheme.spacing),
    borderRadius: replaceRem(defaultTheme.borderRadius),
    fontSize: replaceRem(defaultTheme.fontSize),
    lineHeight: replaceRem(defaultTheme.lineHeight),
    maxWidth: replaceRem(defaultTheme.maxWidth),
    screens: {
      sm: '320px',
      md: '750px',
      lg: '990px'
    },
    extend: {
      fontFamily: {
        heading: 'var(--font-heading-family)',
      },
    },
    color: {
      black: '#000000',
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
};


/**
 * Recursively replace all `rem` values from root font-size 16px to root font-size `10px`.
 *
 * @template T
 * @param {T} value value to convert, all rem values are assumed to be based on a root font-size of `16px`
 * @returns {T} value with all rem values converted to a root font-size of `10px`
 */
function replaceRem(value) {
  if (value == null) {
    return value
  } else if (Array.isArray(value)) {
    return value.map(replaceRem)
  } else if (typeof value === 'object') {
    return Object.entries(value).reduce(
      (prev, [key, value]) => ({ ...prev, [key]: replaceRem(value) }),
      {}
    )
  } else if (typeof value === 'function') {
    return (...args) => replaceRem(value(...args))
  } else if (typeof value === 'string' && value.endsWith('rem')) {
    const originalValue = parseFloat(value.replace('rem', ''))
    return `${(originalValue * 16) / 10}rem`
  }

  return value
}