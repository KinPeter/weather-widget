<script setup lang="ts">
import { ApiKeysState, useApiKeysStore } from '../stores/apiKeysStore.ts';
import WeatherSummary from '../components/weather/WeatherSummary.vue';
import LoadingIndicator from '../components/common/LoadingIndicator.vue';
import NotAvailable from '../components/common/NotAvailable.vue';
import NoGeolocation from '../components/common/NoGeolocation.vue';
import { useMainStore } from '../stores/mainStore.ts';
import { watch } from 'vue';
import { storeToRefs } from 'pinia';

const apiKeys = useApiKeysStore();
const store = useMainStore();
const { loading, location, weather, geolocationDisabled } = storeToRefs(store);

watch([location, weather], () => {
  console.log('watch store', location.value, weather.value);
});
</script>

<template>
  <main v-if="loading" class="loading">
    <LoadingIndicator />
  </main>
  <main v-else-if="apiKeys.status === ApiKeysState.READY && !geolocationDisabled">
    <RouterLink to="/location">Location</RouterLink>
    <WeatherSummary />
  </main>
  <main v-else-if="geolocationDisabled">
    <NoGeolocation />
  </main>
  <main v-else>
    <NotAvailable :status="apiKeys.status" />
  </main>
</template>

<style scoped>
main {
  height: 100%;

  &.loading {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
