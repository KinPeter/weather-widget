import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';

export enum ApiKeysState {
  INITIALIZING = 'INITIALIZING',
  READY = 'READY',
  NO_API_KEYS = 'NO_API_KEYS',
  LOCATION_KEY_MISSING = 'LOCATION_KEY_MISSING',
  WEATHER_KEY_MISSING = 'WEATHER_KEY_MISSING',
}

export const useApiKeysStore = defineStore('apiKeys', () => {
  const { query } = useRoute();

  const weatherApiKey = ref<string | undefined>();
  const locationApiKey = ref<string | undefined>();
  const initialized = ref(false);

  const status = computed(() => {
    if (!initialized.value) {
      return ApiKeysState.INITIALIZING;
    }
    if (!weatherApiKey.value && !locationApiKey.value) {
      return ApiKeysState.NO_API_KEYS;
    } else if (!locationApiKey.value) {
      return ApiKeysState.LOCATION_KEY_MISSING;
    } else if (!weatherApiKey.value) {
      return ApiKeysState.WEATHER_KEY_MISSING;
    } else {
      return ApiKeysState.READY;
    }
  });

  function setApiKeys(weather: string | undefined, location: string | undefined): void {
    weatherApiKey.value = weather;
    locationApiKey.value = location;
    initialized.value = true;
  }

  watch([weatherApiKey, locationApiKey], () => {
    console.log('from store:', weatherApiKey.value, locationApiKey.value);
  });

  if (import.meta.env.VITE_LOCATION_API_KEY || import.meta.env.VITE_WEATHER_API_KEY) {
    setApiKeys(import.meta.env.VITE_WEATHER_API_KEY, import.meta.env.VITE_LOCATION_API_KEY);
  }

  if (query?.locationApiKey || query?.weatherApiKey) {
    setApiKeys(
      query.weatherApiKey?.toString() ?? undefined,
      query.locationApiKey?.toString() ?? undefined
    );
  }

  return { weatherApiKey, locationApiKey, status, setApiKeys };
});
