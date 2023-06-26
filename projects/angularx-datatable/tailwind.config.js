/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './projects/angularx-datatable-tailwind/*.{html,ts,css,scss}',
    './**/*.{html,ts,css,scss}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

