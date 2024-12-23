<script setup lang="ts">
import { IconPlus } from '@tabler/icons-vue';
import IconClearDay from '../icons/IconClearDay.vue';
import IconClearNight from '../icons/IconClearNight.vue';
import IconCloudy from '../icons/IconCloudy.vue';
import IconFog from '../icons/IconFog.vue';
import IconHail from '../icons/IconHail.vue';
import IconPartlyCloudyDay from '../icons/IconPartlyCloudyDay.vue';
import IconPartlyCloudyNight from '../icons/IconPartlyCloudyNight.vue';
import IconPrecip from '../icons/IconPrecip.vue';
import IconRain from '../icons/IconRain.vue';
import IconSleet from '../icons/IconSleet.vue';
import IconSnow from '../icons/IconSnow.vue';
import IconTempHighWarning from '../icons/IconTempHighWarning.vue';
import IconTempLowWarning from '../icons/IconTempLowWarning.vue';
import IconThunderstorm from '../icons/IconThunderstorm.vue';
import IconWind from '../icons/IconWind.vue';
</script>

<template>
  <div class="icons">
    <IconClearDay />
    <IconClearNight />
    <IconCloudy />
    <IconFog />
    <IconHail />
    <IconPartlyCloudyDay />
    <IconPartlyCloudyNight />
    <IconPrecip />
    <IconRain />
    <IconSleet />
    <IconSnow />
    <IconTempHighWarning />
    <IconTempLowWarning />
    <IconThunderstorm />
    <IconWind />
    <IconPlus />
  </div>
</template>

<style scoped>
.icons {
  display: flex;
  color: white;
}
</style>
