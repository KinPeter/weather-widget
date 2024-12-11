<script setup lang="ts">
defineProps<{
  msg: string;
}>();

console.log('from env:', import.meta.env.VITE_LOCATION_API_KEY);
</script>

<template>
  <div class="greetings">
    <h1 class="green">Hello {{ msg }}</h1>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}
</style>
