# git-repos

## Description

App searches github repositories with most stars in given period of time, includes search configurations.

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

### Implementation details

App uses router to show the search and list repositories view (default route). State management is used to manage the list and search filters repositories view state. Includes styled ui component.

- Search repositories section (Filters)

  - App is available on http://localhost:8080, followed the UI patterns as similar to wire frame.
  - Static languages (Javascript, Typescript, Rust, C and python) are used to search, once selected they appear as chip and the search selected filters button will be enabled (button will be disabled once the chips are cleared).
  - Initially date is set to today's date (date validation is not implemented), handled the api error on invalid date to show the error message on the repositories list section.
  - Stars filters could be ranged from 100 - 10000.
  - Selected filters.

- Repositories (List)
  - Respective language selected and applied filters shows the card/tile of the same.
  - Default of 30 items are showed in the list incase more repositories of selected language appears.
  - Shows pagination button instead on more items (not implemented fetching on scroll).
  - Responsiveness on the cards.

### Improvements (needs to implemented)

- Handling accessibility, keyboard navigation on UI elements (search dropdown).
- Validations on search filters, eg date picker limits (upper limit and lower limits).
- Pagination on scrolling of cards/tiles (use case for virtualized lists component)
- Handling button loading/no items found/error on cards and pagination.
- Handling responsiveness to make search and list appear as stack on smaller devices.
- Search filters store could be used to manage the ui form state (loading, error , disabled/enabled, dirty checking).
- Tests on page components and store.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Type Support for `.vue` Imports in TS

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 <script setup> SFCs, check out the script setup docs to learn more.

Learn more about the recommended Project Setup and IDE Support in the Vue Docs TypeScript Guide.
