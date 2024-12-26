import { defineStore, storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import { ApiKeysState, useApiKeysStore } from './apiKeysStore.ts';
import { usePostMessengerStore } from './postMessengerStore.ts';
import { useLocations } from '../composables/useLocations.ts';
import { useWeather } from '../composables/useWeather.ts';

export const useMainStore = defineStore('main', () => {
  const apiKeysStore = useApiKeysStore();
  const { status } = storeToRefs(apiKeysStore);
  const { sendMessageToHost } = usePostMessengerStore();

  const locationApiKey = ref<string | undefined>();
  const weatherApiKey = ref<string | undefined>();
  const fetchTimer = ref<NodeJS.Timeout | number>(0);

  const {
    loading: locationLoading,
    location,
    originalLocation,
    coords,
    geolocationDisabled,
    getNavigatorGeolocation,
    searchForLocation,
    selectOriginalLocation,
    selectOtherLocation,
  } = useLocations({ locationApiKey, sendMessageToHost });
  const {
    loading: weatherLoading,
    weather,
    fetchWeather,
  } = useWeather({ weatherApiKey, sendMessageToHost });

  const loading = computed(() => locationLoading.value || weatherLoading.value);

  watch(
    status,
    () => {
      if (status.value !== ApiKeysState.READY) {
        return;
      }

      locationApiKey.value = apiKeysStore.locationApiKey;
      weatherApiKey.value = apiKeysStore.weatherApiKey;

      getNavigatorGeolocation();
    },
    { immediate: true }
  );

  watch(coords, () => {
    if (coords.value) {
      const { lat, lon } = coords.value;
      fetchWeather(location.value, lat, lon);
      setFetchTimer();
    }
  });

  function setFetchTimer(): void {
    if (fetchTimer.value) clearInterval(fetchTimer.value!);
    fetchTimer.value = setInterval(
      () => fetchWeather(location.value, coords.value!.lat, coords.value!.lon),
      1000 * 60 * 60
    );
  }

  return {
    location,
    originalLocation,
    weather,
    loading,
    geolocationDisabled,
    searchForLocation,
    selectOriginalLocation,
    selectOtherLocation,
  };
});
