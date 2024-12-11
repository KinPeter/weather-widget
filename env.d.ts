/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_LOCATION_API_KEY: string;
  readonly VITE_WEATHER_API_KEY: string;
  // Add other environment variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
