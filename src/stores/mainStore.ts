import { defineStore, storeToRefs } from 'pinia';
import type { LocationIqResponse, Weather } from '../utils/weather.types.ts';
import { ref, watch } from 'vue';
import { ApiKeysState, useApiKeysStore } from './apiKeysStore.ts';
import { getSavedLocationForCoords, saveLocationForCoords } from '../utils/location.utils.ts';
import { transformWeather } from '../utils/weather.utils.ts';
import { usePostMessengerStore } from './postMessengerStore.ts';

/**
 * API docs:
 * LocationIQ: https://locationiq.com/docs
 * OpenWeatherMap: https://openweathermap.org/api/one-call-3
 */
export const useMainStore = defineStore('main', () => {
  const apiKeysStore = useApiKeysStore();
  const { status } = storeToRefs(apiKeysStore);
  const { sendMessageToHost } = usePostMessengerStore();

  const location = ref<string>('');
  const weather = ref<Weather | undefined>();
  const loading = ref<boolean>(false);
  const geolocationDisabled = ref<boolean>(false);
  const locationApiKey = ref<string | undefined>();
  const weatherApiKey = ref<string | undefined>();
  const coords = ref<GeolocationCoordinates | undefined>();
  const fetchTimer = ref<NodeJS.Timeout | number>(0);

  watch(
    status,
    () => {
      if (status.value !== ApiKeysState.READY) {
        return;
      }

      locationApiKey.value = apiKeysStore.locationApiKey;
      weatherApiKey.value = apiKeysStore.weatherApiKey;
      loading.value = true;

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          position => getLocation(position.coords),
          err => {
            loading.value = false;
            geolocationDisabled.value = true;
            console.log('[WEATHER] Geolocation error', err);
            sendMessageToHost('weather.errorNotification', `Geolocation error: ${err.message}`);
          }
        );
      } else {
        geolocationDisabled.value = true;
      }
    },
    { immediate: true }
  );

  async function getLocation(coords: GeolocationCoordinates): Promise<void> {
    if (!locationApiKey.value) return;
    if (!coords?.latitude || !coords?.longitude) {
      geolocationDisabled.value = true;
      return;
    }
    const savedLocationForCoordinates: LocationIqResponse | null =
      getSavedLocationForCoords(coords);
    if (savedLocationForCoordinates) {
      onGetLocation(savedLocationForCoordinates, coords);
      return;
    }
    try {
      loading.value = true;
      const params = new URLSearchParams({
        // lat: 37.549615,
        // lon: 127.141532,
        key: locationApiKey.value,
        format: 'json',
        lat: coords.latitude.toString(),
        lon: coords.longitude.toString(),
      });
      const res = await fetch(`https://eu1.locationiq.com/v1/reverse.php?${params.toString()}`);
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message);
      }
      console.log('Geolocation success', json);
      onGetLocation(json, coords);
    } catch (e) {
      sendMessageToHost('weather.errorNotification', `Geolocation error: ${(e as Error).message}`);
    } finally {
      loading.value = false;
    }
  }

  function onGetLocation(
    locationResponse: LocationIqResponse,
    receivedCoords: GeolocationCoordinates
  ): void {
    saveLocationForCoords(locationResponse, receivedCoords);
    coords.value = receivedCoords;
    const { city, district, country, town, village, region, state } = locationResponse.address;
    location.value = city
      ? city + (district ? `, ${district}` : '')
      : (village ?? town ?? state ?? region ?? country ?? 'Unknown location :(');
    fetchWeather();
    setFetchTimer();
  }

  async function fetchWeather(): Promise<void> {
    if (!weatherApiKey.value || !coords.value) {
      return;
    }
    loading.value = true;
    try {
      const params = new URLSearchParams({
        lat: coords.value.latitude.toString(),
        lon: coords.value.longitude.toString(),
        appId: weatherApiKey.value,
        exclude: 'minutely',
        units: 'metric',
      });
      const res = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?${params.toString()}`
      );
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message);
      }
      weather.value = transformWeather(json);
    } catch (e) {
      sendMessageToHost(
        'weather.errorNotification',
        `Weather fetch error: ${(e as Error).message}`
      );
    } finally {
      loading.value = false;
    }
  }

  function setFetchTimer(): void {
    if (fetchTimer.value) clearInterval(fetchTimer.value!);
    fetchTimer.value = setInterval(() => fetchWeather(), 1000 * 60 * 60);
  }

  return { location, weather, loading, geolocationDisabled };
});
