<script setup lang="ts">
import CardBase from '../common/CardBase.vue';
import { useMainStore } from '../../stores/mainStore.ts';
import { computed } from 'vue';
import IconPrecip from '../icons/IconPrecip.vue';
import WeatherIcon from './WeatherIcon.vue';

const store = useMainStore();
const hourly = computed(() => store.weather!.hourly);
</script>

<template>
  <CardBase v-if="store.weather">
    <div class="hourly-wrapper">
      <div v-for="hour of hourly" :key="hour.time" class="hour">
        <p class="time">{{ hour.time }}</p>
        <WeatherIcon :icon="hour.icon" class="hour-icon" />
        <p class="temp">{{ hour.temperature }}&deg;C</p>
        <div class="precip">
          <IconPrecip class="precip-icon" />
          {{ hour.precipitation ?? '0mm' }}
        </div>
      </div>
    </div>
  </CardBase>
</template>

<style scoped>
.hourly-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  overflow-x: auto;
}

.hour {
  text-align: center;
}

p {
  margin: 0 0 0.25rem;
}

.time {
  font-size: 0.65rem;
  color: var(--color-primary);
}

.temp {
  font-size: 0.8rem;
}

.precip {
  font-size: 0.75rem;
  margin-bottom: 0.5rem;

  .precip-icon {
    width: 10px;
    height: 10px;
    position: relative;
    color: var(--color-accent);
  }
}
</style>
