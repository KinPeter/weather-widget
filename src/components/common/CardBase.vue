<template>
  <div class="card-base">
    <slot></slot>
  </div>
</template>

<style scoped>
.card-base {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.5rem;
  background-color: var(--color-bg-lighter);
  margin-bottom: 0.5rem;
  font-size: 0.9rem;

  a {
    color: var(--color-text-accent);
    text-decoration: none;
  }
}
</style>
