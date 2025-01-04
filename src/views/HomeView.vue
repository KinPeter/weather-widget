<script setup lang="ts">
import { ApiKeysState, useApiKeysStore } from '../stores/apiKeysStore.ts';
import CurrentWeather from '../components/weather/CurrentWeather.vue';
import LoadingIndicator from '../components/common/LoadingIndicator.vue';
import NotAvailable from '../components/common/NotAvailable.vue';
import NoGeolocation from '../components/common/NoGeolocation.vue';
import { useMainStore } from '../stores/mainStore.ts';
import { storeToRefs } from 'pinia';
import DailyWeather from '../components/weather/DailyWeather.vue';
import HourlyWeather from '../components/weather/HourlyWeather.vue';

const apiKeys = useApiKeysStore();
const store = useMainStore();
const { loading, geolocationDisabled, weather } = storeToRefs(store);
</script>

<template>
  <main v-if="loading" class="loading">
    <LoadingIndicator />
  </main>
  <main v-else-if="apiKeys.status === ApiKeysState.READY && (weather || !geolocationDisabled)">
    <CurrentWeather />
    <DailyWeather />
    <HourlyWeather />
  </main>
  <main v-else-if="geolocationDisabled && !weather">
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
