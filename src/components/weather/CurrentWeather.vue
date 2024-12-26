<script setup lang="ts">
import CardBase from '../common/CardBase.vue';
import { useMainStore } from '../../stores/mainStore.ts';
import { format } from 'date-fns';
import {
  HIGH_TEMP_WARNING_THRESHOLD,
  LOW_TEMP_WARNING_THRESHOLD,
  TODAY_FORMAT,
} from '../../utils/weather.types.ts';
import { computed } from 'vue';
import IconPrecip from '../icons/IconPrecip.vue';
import IconWind from '../icons/IconWind.vue';
import IconTempHighWarning from '../icons/IconTempHighWarning.vue';
import IconTempLowWarning from '../icons/IconTempLowWarning.vue';
import WeatherIcon from './WeatherIcon.vue';

const store = useMainStore();
const today = format(new Date(), TODAY_FORMAT);
const location = computed(() => store.location);
const current = computed(() => store.weather!.current);
const daily = computed(() => store.weather!.daily);

const thresholds = {
  high: HIGH_TEMP_WARNING_THRESHOLD,
  low: LOW_TEMP_WARNING_THRESHOLD,
};
</script>

<template>
  <CardBase v-if="store.weather">
    <div class="current-weather">
      <header>
        <p>{{ location }}</p>
        <p>{{ today }}</p>
      </header>
      <main>
        <div class="current-left">
          <p>
            <b>{{ current?.description }}</b>
          </p>
          <p>
            <IconPrecip class="precip-icon" />
            {{ daily[0].precipitation ?? '0mm' }}
          </p>
          <p>
            <IconWind class="wind-icon" />
            {{ current?.wind }}
          </p>
        </div>
        <div class="current-right">
          <div class="temps">
            <IconTempHighWarning
              class="high warning-icon"
              v-if="(current?.temperature ?? 0) > thresholds.high" />
            <IconTempLowWarning
              class="low warning-icon"
              v-if="(current?.temperature ?? 0) < thresholds.low" />
            <div class="degrees">
              <p>{{ current?.temperature }}&deg;C</p>
              <p>
                <span>{{ daily[0].tempMax }}&deg;C</span>
                <span>{{ daily[0].tempMin }}&deg;C</span>
              </p>
            </div>
          </div>
          <WeatherIcon class="current-icon" :icon="current?.icon" />
        </div>
      </main>
    </div>
  </CardBase>
</template>

<style scoped>
.current-weather {
  header {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 1rem;

    p {
      margin: 0;
    }
    p:first-child {
      font-weight: bold;
    }
  }

  main {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;

    .current-left {
      p {
        margin: 0 0 0.25rem;
        &:last-child {
          margin: 0;
        }
      }
      .precip-icon,
      .wind-icon {
        width: 16px;
        height: 16px;
        margin-right: 0.3rem;
        position: relative;
        top: 2px;
        color: var(--color-accent);
      }
    }
    .current-right {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      p {
        margin: 0;
      }

      .temps {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .warning-icon {
          width: 32px;
          height: 32px;

          &.low {
            color: var(--color-accent);
          }

          &.high {
            color: var(--color-error);
          }
        }
      }

      .degrees {
        text-align: center;

        p:first-child {
          font-size: 1.8rem;
          font-weight: bold;
        }
        p:last-child {
          font-size: 1rem;
        }
        span:first-child {
          color: var(--color-error);
          margin-right: 0.5rem;
        }
        span:last-child {
          color: var(--color-accent);
        }
      }

      .current-icon {
        width: 52px;
        height: 52px;
      }
    }
  }
}
</style>
