<script setup lang="ts">
import { ApiKeysState, useApiKeysStore } from '../stores/apiKeysStore.ts';
import WeatherSummary from '../components/weather/WeatherSummary.vue';
import NotAvailable from '../components/common/NotAvailable.vue';

const { status } = useApiKeysStore();
</script>

<template>
  <main v-if="status === ApiKeysState.READY">
    <RouterLink to="/location">Location</RouterLink>
    <WeatherSummary />
  </main>
  <main v-else>
    <NotAvailable :status="status" />
  </main>
</template>

<style scoped>
main {
  height: 100%;
}
</style>
