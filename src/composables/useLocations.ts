import { type Ref, ref } from 'vue';
import type { Coords, Location, LocationIqReverseResponse } from '../utils/location.types.ts';
import { getSavedLocationForCoords, saveLocationForCoords } from '../utils/location.utils.ts';

interface Params {
  locationApiKey: Ref<string | undefined>;
  sendMessageToHost(topic: string, payload: unknown): void;
}

/**
 * API docs:
 * LocationIQ: https://locationiq.com/docs
 */
export const useLocations = ({ locationApiKey, sendMessageToHost }: Params) => {
  const loading = ref<boolean>(false);
  const geolocationDisabled = ref<boolean>(false);
  const originalLocation = ref<Location | undefined>();
  const location = ref<string>('');
  const coords = ref<Coords | undefined>();

  function getNavigatorGeolocation(): void {
    if ('geolocation' in navigator) {
      loading.value = true;
      navigator.geolocation.getCurrentPosition(
        position => getLocation({ lat: position.coords.latitude, lon: position.coords.longitude }),
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
  }

  async function getLocation(coords: Coords): Promise<void> {
    if (!locationApiKey.value) return;
    if (!coords?.lat || !coords?.lon) {
      geolocationDisabled.value = true;
      return;
    }
    const savedLocationForCoordinates: LocationIqReverseResponse | null =
      getSavedLocationForCoords(coords);
    if (savedLocationForCoordinates) {
      onLocationReceived(savedLocationForCoordinates, coords);
      loading.value = false;
      return;
    }
    try {
      loading.value = true;
      const params = new URLSearchParams({
        // lat: 37.549615,
        // lon: 127.141532,
        key: locationApiKey.value,
        format: 'json',
        lat: coords.lat.toString(),
        lon: coords.lon.toString(),
      });
      const res = await fetch(`https://eu1.locationiq.com/v1/reverse.php?${params.toString()}`);
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message);
      }
      console.log('[WEATHER] Geolocation success', json);
      onLocationReceived(json, coords);
    } catch (e) {
      sendMessageToHost('weather.errorNotification', `Geolocation error: ${(e as Error).message}`);
    } finally {
      loading.value = false;
    }
  }

  function onLocationReceived(
    locationResponse: LocationIqReverseResponse,
    receivedCoords: Coords
  ): void {
    saveLocationForCoords(locationResponse, receivedCoords);
    coords.value = receivedCoords;
    const { city, district, country, town, village, region, state } = locationResponse.address;
    const locationName = city
      ? city + (district ? `, ${district}` : '')
      : (village ?? town ?? state ?? region ?? country ?? 'Unknown location :(');
    location.value = locationName;
    originalLocation.value = {
      name: locationName,
      ...receivedCoords,
    };
  }

  return {
    loading,
    originalLocation,
    location,
    coords,
    geolocationDisabled,
    getNavigatorGeolocation,
  };
};
