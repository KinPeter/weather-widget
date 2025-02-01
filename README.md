# weather-widget

Microfrontend widget for a personal dashboard application to display weather information and location data.

## Project Setup

### Prerequisites

* Node.js version >=22.5.1

Install the dependencies:
```sh
npm ci
```

### API keys

The app requires the following API keys:
* [OpenWeatherMap](https://openweathermap.org/api) for weather data
* [LocationIQ](https://locationiq.com/) for location data

There are three ways to provide the API keys:

#### 1) From a `.env` file
For development, you can use a `.env` file according to the example in `.env.example`.
New variables must have the `VITE_` prefix and be registered in the `env.d.ts` file.

#### 2) Query Parameters
You can also provide the API keys as query parameters in the URL:
```
http://localhost:5173/#/?weatherApiKey=your_key&locationApiKey=your_key
```

#### 3) Via the PostMessage API
In production, when the widget is embedded in the main application, the API keys should be sent via the PostMessage API.
The application listens for the `weather.apiKeys` topic messages. 
See the communication options in the `src/stores/postMessengerStore.ts` file.


### Running the Application

#### Compile and Hot-Reload for Development

```sh
npm run dev
```

#### Type-Check, Compile and Minify for Production

```sh
npm run build
```

#### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test
```

#### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

#### Format with [Prettier](https://prettier.io/)

```sh
npm run format
```
