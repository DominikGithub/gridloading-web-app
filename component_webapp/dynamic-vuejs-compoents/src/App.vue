<script setup>
import { RouterLink, RouterView } from "vue-router";
import Grid from "./components/Grid.vue";
</script>

<template>
  <div>
    <h1>Grid Items</h1>
    <Grid />
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
}

h1 {
  font-size: 35px;
  font-weight: bold;
}
</style>
