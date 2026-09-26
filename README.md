# React Webpack Starter

A starter for React 18 apps in TypeScript on a hand-written webpack 5 config instead of Create React App. The sample page shows a counter button over a full-screen background image. Built in December 2021.

## Features

- TypeScript through ts-loader, and JavaScript or JSX through Babel (preset-env, and preset-react with the automatic JSX runtime).
- SCSS with Dart Sass, resolve-url-loader and PostCSS (Autoprefixer in production builds), extracted into CSS files by mini-css-extract-plugin.
- Images and fonts are emitted as asset modules into `images/` and `fonts/`.
- html-webpack-plugin builds `index.html` from `public/index.html`, adds the favicon and loads the scripts from the head with `defer`.
- Development server on port 3000 with hot module replacement, history API fallback, an overlay for build errors and source maps. It opens the browser on start.
- ESLint and Stylelint run as webpack plugins in development and report problems without stopping the build.
- Production builds get content hashes in file names, Terser and CSS minification and collapsed HTML whitespace. Both modes put vendor code in its own chunk next to a single runtime chunk and clean `build/` first.

## Tech stack

- **Framework:** React 18, TypeScript 4
- **Styling:** SCSS (Dart Sass 1), PostCSS Autoprefixer 10
- **Tooling:** webpack 5, webpack-dev-server 4, Babel 7, ts-loader 9, ESLint 8 (Airbnb, typescript-eslint), Stylelint 14, Prettier 2

## Getting started

You need Node.js 16 or 18 and Yarn 1.

```bash
git clone https://github.com/androfficial/react-webpack-starter.git
cd react-webpack-starter
yarn install
yarn start
```

The development server opens http://localhost:3000 in the browser.

## Scripts

| Command | Description |
| --- | --- |
| `yarn start` | Starts webpack-dev-server in development mode |
| `yarn dev` | Development build into `build/` with plain file names |
| `yarn build` | Production build into `build/` with hashed and minified files |
| `yarn watch` | Development build that rebuilds on every change |

## Project structure

```text
public/
  index.html          HTML template with the #wrapper root element
  favicon.svg         favicon that html-webpack-plugin adds to the page
src/
  assets/             images; image.jpg is the page background
  components/         Footer sample component
  styles/             style.scss entry with reset, fonts, mixins and UI blocks
  App.tsx             sample page with a counter
  index.tsx           entry: global styles and createRoot
webpack.config.js     the whole build setup
tsconfig.json         TypeScript options for ts-loader
```

## Notes

- Every script sets `NODE_ENV` with cross-env, and the config reads it to switch between the development and production settings above.
