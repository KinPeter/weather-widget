<script setup lang="ts">
import { ApiKeysState, useApiKeysStore } from '../stores/apiKeysStore.ts';
import { usePostMessengerStore } from '../stores/postMessengerStore.ts';
import WeatherSummary from '../components/weather/WeatherSummary.vue';
import NotAvailable from '../components/common/NotAvailable.vue';
import { useMainStore } from '../stores/mainStore.ts';
import { watch } from 'vue';
import { storeToRefs } from 'pinia';

const apiKeys = useApiKeysStore();
const store = useMainStore();
usePostMessengerStore();
const { loading, location, weather } = storeToRefs(store);

watch([loading, location, weather], () => {
  console.log('watch store', loading.value, location.value, weather.value);
});
</script>

<template>
  <main v-if="apiKeys.status === ApiKeysState.READY">
    <RouterLink to="/location">Location</RouterLink>
    <WeatherSummary />
  </main>
  <main v-else>
    <NotAvailable :status="apiKeys.status" />
  </main>
</template>

<style scoped>
main {
  height: 100%;
}
</style>
