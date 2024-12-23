<script setup lang="ts">
import type { ApiKeysState } from '../../stores/apiKeysStore.ts';

defineProps<{
  status: ApiKeysState;
}>();
</script>

<template>
  <div>
    <h1>Service is not available</h1>
    <h2>Reason: {{ status.replace(/_/g, ' ').toLowerCase() }}</h2>
  </div>
</template>

<style scoped>
div {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 1.2rem;
  }

  h2 {
    font-size: 0.8rem;
  }
}
</style>
