<script setup>
import { RouterLink, RouterView } from "vue-router";
import RndImage from "./components/RndImage.vue";
</script>

<template>
  <div>
    <h1>Grid Items</h1>
    <div class="grid">
      <RndImage v-for="n in 25" v-bind:key="n" v-bind:imageId=n />
    </div>
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

div.grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
}
</style>
