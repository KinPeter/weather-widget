import { type Ref, ref } from 'vue';
import { transformWeather } from '../utils/weather.utils.ts';
import type { Weather } from '../utils/weather.types.ts';

interface Params {
  weatherApiKey: Ref<string | undefined>;
  sendMessageToHost(topic: string, payload: unknown): void;
}

/**
 * API docs:
 * OpenWeatherMap: https://openweathermap.org/api/one-call-3
 */
export const useWeather = ({ weatherApiKey, sendMessageToHost }: Params) => {
  const loading = ref<boolean>(false);
  const weather = ref<Weather | undefined>();

  async function fetchWeather(name: string, lat: number, lon: number): Promise<void> {
    if (!weatherApiKey.value) {
      return;
    }
    loading.value = true;
    try {
      const params = new URLSearchParams({
        lat: lat.toString(),
        lon: lon.toString(),
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
      const transformedWeather = transformWeather(json);
      weather.value = transformedWeather;
      sendMessageToHost('weather.update', {
        currentWeather: transformedWeather.current,
        location: {
          name,
          lat,
          lon,
        },
        lastUpdated: transformedWeather.lastUpdated,
      });
    } catch (e) {
      sendMessageToHost(
        'weather.errorNotification',
        `Weather fetch error: ${(e as Error).message}`
      );
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    weather,
    fetchWeather,
  };
};
