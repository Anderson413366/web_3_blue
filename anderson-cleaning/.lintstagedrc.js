module.exports = {
  // Run ESLint on JS/TS files
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],

  // Run Prettier on other files
  '*.{json,md,yml,yaml,css,scss}': ['prettier --write'],

  // Run type check on TypeScript files (but don't fix)
  '*.{ts,tsx}': () => 'tsc --noEmit',

  // Run tests related to changed files (optional, can be slow)
  // '*.{js,jsx,ts,tsx}': () => 'jest --bail --findRelatedTests',
}
