import { ref, watch, onUnmounted, type Ref } from 'vue';

export function useDebounce(value: Ref<string>, delay: number = 800) {
  const debouncedValue = ref(value.value);
  let timeout: ReturnType<typeof setTimeout>;

  watch(value, newValue => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      debouncedValue.value = newValue;
    }, delay);
  });

  onUnmounted(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
  });

  return debouncedValue;
}
