# git-repos

## Description

App searches github repos with most stars in given period of time, includes search configurations.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev (http://localhost:8080)
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Improvements

- Handling accessibility, keyboard navigation on UI elements (search dropdown).
- Validations on search filters, eg date picker limits (upper limit and lower limits).
- Virtualized lists on each repositories list of languages shown.
- Handling button loading/error on pagination.
- Tests on page components and store.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Type Support for `.vue` Imports in TS

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 <script setup> SFCs, check out the script setup docs to learn more.

Learn more about the recommended Project Setup and IDE Support in the Vue Docs TypeScript Guide.
