import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';

export enum ApiKeysState {
  READY = 'READY',
  NO_API_KEYS = 'NO_API_KEYS',
  LOCATION_KEY_MISSING = 'LOCATION_KEY_MISSING',
  WEATHER_KEY_MISSING = 'WEATHER_KEY_MISSING',
}

export const useApiKeysStore = defineStore('apiKeys', () => {
  const { query } = useRoute();

  const weatherApiKey = ref<string | undefined>(import.meta.env.VITE_WEATHER_API_KEY ?? undefined);
  const locationApiKey = ref<string | undefined>(
    import.meta.env.VITE_LOCATION_API_KEY ?? undefined
  );

  const status = computed(() => {
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

  function setApiKeys(weather: string, location: string) {
    weatherApiKey.value = weather;
    locationApiKey.value = location;
  }

  watch([weatherApiKey, locationApiKey], () => {
    console.log('from store:', weatherApiKey.value, locationApiKey.value);
  });

  if (query?.weatherApiKey && query?.locationApiKey) {
    setApiKeys(query.weatherApiKey.toString(), query.locationApiKey.toString());
  }

  return { weatherApiKey, locationApiKey, status };
});
