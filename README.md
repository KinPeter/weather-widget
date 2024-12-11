# weather-widget


## Project Setup

```sh
npm ci
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Environment variables

For development use a `.env` file according to the example in `.env.example`.
New variables must have the `VITE_` prefix and be registered in the `env.d.ts` file.