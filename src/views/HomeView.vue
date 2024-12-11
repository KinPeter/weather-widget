<script setup lang="ts">
import HelloWorld from '../components/HelloWorld.vue';
import { useApiKeysStore } from '../stores/apiKeys';
import IconClearDay from '../components/icons/IconClearDay.vue';
import IconClearNight from '../components/icons/IconClearNight.vue';
import IconCloudy from '../components/icons/IconCloudy.vue';
import IconFog from '../components/icons/IconFog.vue';
import IconHail from '../components/icons/IconHail.vue';
import IconPartlyCloudyDay from '../components/icons/IconPartlyCloudyDay.vue';
import IconPartlyCloudyNight from '../components/icons/IconPartlyCloudyNight.vue';
import IconPrecip from '../components/icons/IconPrecip.vue';
import IconRain from '../components/icons/IconRain.vue';
import IconSleet from '../components/icons/IconSleet.vue';
import IconSnow from '../components/icons/IconSnow.vue';
import IconTempHighWarning from '../components/icons/IconTempHighWarning.vue';
import IconTempLowWarning from '../components/icons/IconTempLowWarning.vue';
import IconThunderstorm from '../components/icons/IconThunderstorm.vue';
import IconWind from '../components/icons/IconWind.vue';
import { IconPlus } from '@tabler/icons-vue';

useApiKeysStore();
</script>

<template>
  <main>
    <HelloWorld msg="World" />

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
  </main>
</template>

<style scoped>
.icons {
  display: flex;
  color: white;
}
</style>
