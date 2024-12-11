import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';

export const useApiKeysStore = defineStore('apiKeys', () => {
  const { query } = useRoute();

  const weatherApiKey = ref<string | undefined>();
  const locationApiKey = ref<string | undefined>();
  const computedThing = computed(() => weatherApiKey.value + '-' + weatherApiKey.value);

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

  return { weatherApiKey, locationApiKey, computedThing };
});
