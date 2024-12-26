<script setup lang="ts">
import { WeatherIcons } from '../../utils/weather.types.ts';
import IconPartlyCloudyDay from '../icons/IconPartlyCloudyDay.vue';
import IconWind from '../icons/IconWind.vue';
import IconSnow from '../icons/IconSnow.vue';
import IconRain from '../icons/IconRain.vue';
import IconCloudy from '../icons/IconCloudy.vue';
import IconClearNight from '../icons/IconClearNight.vue';
import IconClearDay from '../icons/IconClearDay.vue';
import IconPartlyCloudyNight from '../icons/IconPartlyCloudyNight.vue';
import IconThunderstorm from '../icons/IconThunderstorm.vue';
import IconFog from '../icons/IconFog.vue';
import IconSleet from '../icons/IconSleet.vue';
import IconHail from '../icons/IconHail.vue';

defineProps<{
  icon?: WeatherIcons;
}>();
</script>

<template>
  <IconClearDay v-if="icon === WeatherIcons.CLEAR_DAY" />
  <IconClearNight v-else-if="icon === WeatherIcons.CLEAR_NIGHT" />
  <IconCloudy v-else-if="icon === WeatherIcons.CLOUDY" />
  <IconFog v-else-if="icon === WeatherIcons.FOG" />
  <IconHail v-else-if="icon === WeatherIcons.HAIL" />
  <IconPartlyCloudyDay v-else-if="icon === WeatherIcons.PARTLY_CLOUDY_DAY" />
  <IconPartlyCloudyNight v-else-if="icon === WeatherIcons.PARTLY_CLOUDY_NIGHT" />
  <IconRain v-else-if="icon === WeatherIcons.RAIN" />
  <IconSleet v-else-if="icon === WeatherIcons.SLEET" />
  <IconSnow v-else-if="icon === WeatherIcons.SNOW" />
  <IconThunderstorm v-else-if="icon === WeatherIcons.THUNDERSTORM" />
  <IconWind v-else-if="icon === WeatherIcons.WIND" />
</template>
