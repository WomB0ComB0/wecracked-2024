# Wecracked 2024

## ⚡️ Stack

- [`Next.js`](https://nextjs.org/)
- [`Typescript`](typescriptlang.org)
- [`Styled Components`](https://styled-components.com/)
- [`ESLint`](https://eslint.org/)
- [`Prettier`](https://prettier.io/)
- [`Husky`](https://github.com/typicode/husky)

## Available Scripts

- `yarn dev` Next dev
- `yarn start`: Next start
- `yarn build`: Next build
- `yarn analyze`: Generate bundle-analyzer
- `yarn lint`: Audit code quality

### Styling Performance

In order to improve performance, Styled Components are generated at build time and served with the document generated by Next's Server Side Rendering.

There is already a font preloaded from Google Fonts, Poppins. Using Google Fonts allows Next.js to CSS inline the font at build time.

All of this is happening at `_document.tsx`

## 🏁 Tooling

### ESLint

ESLint extends [`eslint-config-airbnb`](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb), [`eslint-config-next`](https://www.npmjs.com/package/eslint-config-next), and some accesibility recomendations from [`eslint-plugin-jsx-a11y`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y).

There are also some opinionated rules you can change at `.eslintrc.js`.

### Prettier

Prettier will be managed using ESLint.
For Code Styling the Prettier config at `.prettierrc.js` will be used.

Some popular settings are already set.

```js
trailingComma: 'es5',
singleQuote: true,
printWidth: 80,
tabWidth: 2,
useTabs: false,
endOfLine: 'lf'
```

### Absolute imports

Absolute imports working with prefix `@/` starting from `src` folder.

```json
"paths": {
  "@/*": ["src/*"],
}
```

_tsconfig.json_

### Sorting and grouping imports

Imports will be grouped by dependencies, absolute imports (`@/*`) and relative imports.
Also they will be sorted by insensitive ascending order.

![](https://media.giphy.com/media/fuNPWZvyuRutgQ7f4z/giphy.gif)

This is done using [`eslint-plugin-simple-import-sort`](https://github.com/lydell/eslint-plugin-simple-import-sort) and `sort-keys` from _.eslintrc.js_

### Validate staged files

On every commit, the staged files will be validated to pass ESLint config.

This is done using `husky` and `lint-staged`

```json
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": "eslint --cache --fix --cache-location ./node_modules/.cache/.eslintcache"
  },
```

### Indexing

`/public/robots.txt` file already provided allowing indexing.
