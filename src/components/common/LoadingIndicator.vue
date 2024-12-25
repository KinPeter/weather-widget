<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: string;
}>();

const multiplier = computed(() => {
  switch (props.size) {
    case 'xs':
      return 0.3;
    case 'sm':
      return 0.5;
    case 'md':
      return 1;
    case 'lg':
      return 2;
    default:
      return 0.5;
  }
});
</script>

<template>
  <div class="lds-ellipsis" :style="{ '--multiplier': multiplier, color: props.color }">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<style scoped>
.lds-ellipsis {
  --multiplier: 1;
  --ellipsis-size: 13.33333px;
  --animation-base: 8px;
  display: inline-block;
  position: relative;
  width: calc(80px * var(--multiplier));
  height: calc(16px * var(--multiplier));
}

.lds-ellipsis,
.lds-ellipsis div {
  box-sizing: border-box;
}

.lds-ellipsis div {
  position: absolute;
  width: calc(var(--ellipsis-size) * var(--multiplier));
  height: calc(var(--ellipsis-size) * var(--multiplier));
  border-radius: 50%;
  background: currentColor;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis div:nth-child(1) {
  left: calc(var(--animation-base) * var(--multiplier) * 1);
  animation: lds-ellipsis1 0.6s infinite;
}

.lds-ellipsis div:nth-child(2) {
  left: calc(var(--animation-base) * var(--multiplier) * 1);
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(3) {
  left: calc(var(--animation-base) * var(--multiplier) * 4);
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(4) {
  left: calc(var(--animation-base) * var(--multiplier) * 7);
  animation: lds-ellipsis3 0.6s infinite;
}

@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}

@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(calc(var(--animation-base) * var(--multiplier) * 3), 0);
  }
}
</style>
