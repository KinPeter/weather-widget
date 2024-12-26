<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { IconMapPinFilled, IconArrowLeft, IconExternalLink } from '@tabler/icons-vue';
import { ref, watch } from 'vue';
import { useDebounce } from '../composables/useDebounce.ts';
import { useMainStore } from '../stores/mainStore.ts';
import { storeToRefs } from 'pinia';
import type { Location } from '../utils/location.types.ts';
import LoadingIndicator from '../components/common/LoadingIndicator.vue';

const router = useRouter();
const store = useMainStore();
const { originalLocation, loading } = storeToRefs(store);
const { searchForLocation, selectOriginalLocation, selectOtherLocation } = store;
const search = ref('');
const debouncedSearch = useDebounce(search);
const results = ref<Location[]>([]);

const selectOriginal = () => {
  selectOriginalLocation();
  router.push('/');
};

const selectOther = (item: Location) => {
  selectOtherLocation(item);
  router.push('/');
};

watch(debouncedSearch, async () => {
  const text = debouncedSearch.value.trim();
  if (text.length === 0) {
    results.value = [];
  } else if (text.length >= 3) {
    results.value = await searchForLocation(text);
  }
});
</script>

<template>
  <button v-if="originalLocation" class="original" @click="selectOriginal">
    <span class="pin-icon"><IconMapPinFilled size="14px" /></span>
    <span>{{ originalLocation.name }}</span>
  </button>

  <div class="search">
    <input type="text" v-model="search" placeholder="Search for a city" />
  </div>

  <div v-if="loading" class="loading">
    <LoadingIndicator />
  </div>
  <div v-else class="results">
    <button v-for="item of results" :key="item.name" class="list" @click="() => selectOther(item)">
      {{ item.name }}
      <span class="icon"><IconExternalLink size="14px" /></span>
    </button>
  </div>

  <RouterLink to="/" class="back">
    <IconArrowLeft />
    Back
  </RouterLink>
</template>

<style scoped>
button {
  display: flex;
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.5rem;
  text-align: left;
  gap: 0.5rem;
  line-height: 20px;

  &.list {
    margin-bottom: 0.25rem;
    justify-content: space-between;
  }

  span.icon {
    display: none;
  }

  &:hover {
    color: var(--color-primary-hover);

    span.icon {
      display: inline-block;
    }
  }
}

.search {
  padding: 0.5rem 0.25rem;
}

.results {
  max-height: 400px;
  overflow-y: auto;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
}

input {
  background-color: var(--color-bg-lighter);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-default);
  height: 2.25rem;
  width: 100%;
  padding: 0 1rem;
  margin-top: 0.25rem;
  display: block;

  &:focus {
    outline: none;
    box-shadow: var(--focus-box-shadow);
  }
}

.back {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
}
</style>
