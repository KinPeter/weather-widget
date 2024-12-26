<script setup lang="ts">
import CardBase from '../common/CardBase.vue';
import { useMainStore } from '../../stores/mainStore.ts';
import { computed } from 'vue';
import IconPrecip from '../icons/IconPrecip.vue';
import WeatherIcon from './WeatherIcon.vue';

const store = useMainStore();
const daily = computed(() => store.weather.daily.slice(1, store.weather.daily.length - 1));
</script>

<template>
  <CardBase>
    <div v-for="day of daily" :key="day.date" class="day">
      <div class="day-left">
        <p>{{ day.dayOfWeek }}</p>
        <p>{{ day.date }}</p>
      </div>
      <div class="day-right">
        <div class="precip">
          <IconPrecip class="icon-precip" />
          {{ day.precipitation ?? '0mm' }}
        </div>
        <span>{{ day.tempMax }}&deg;C</span>
        <span>{{ day.tempMin }}&deg;C</span>
        <WeatherIcon :icon="day.icon" class="day-icon" />
      </div>
    </div>
  </CardBase>
</template>

<style scoped>
.day {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  padding: 0.25rem;

  &:not(:first-of-type) {
    border-top: 1px solid var(--color-border);
  }

  .day-left {
    p:first-child {
      font-weight: bold;
    }
    p:last-child {
      font-size: 0.8rem;
    }
  }

  .day-right {
    display: flex;
    align-items: center;

    .precip {
      margin-right: 0.5rem;
      font-size: 0.9rem;

      .icon-precip {
        width: 14px;
        height: 14px;
        margin-right: 0.25rem;
        position: relative;
        top: 2px;
        color: var(--color-accent);
      }
    }
    span {
      font-size: 1rem;
      margin-right: 0.5rem;

      &:first-of-type {
        color: var(--color-error);
      }
      &:last-of-type {
        color: var(--color-accent);
      }
    }

    > .day-icon {
      width: 28px;
      height: 28px;
      margin-left: 0.35rem;
    }
  }
}
</style>
