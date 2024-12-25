<script setup lang="ts"></script>

<template>
  <div>
    <h1>Oops...</h1>
    <h2>Unable to determine location</h2>
    <h2>Please set it up <RouterLink to="/location">here</RouterLink>.</h2>
  </div>
</template>

<style scoped>
div {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 1.2rem;
  }

  h2 {
    font-size: 0.8rem;
  }
}
</style>
