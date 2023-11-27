// // prettier.config.js
// module.exports = {
//   plugins: ['prettier-plugin-tailwindcss'],
//   singleQuote: true,
//   trailingComma: 'all',
//   semi: false,
// }
/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  singleQuote: true,
  trailingComma: 'all',
  semi: false,
};

export default config;
