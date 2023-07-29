<script setup >
import Item from "../components/Item.vue";
import { watch, computed, onMounted, ref } from 'vue'
import axios from 'axios';

//const API_SERVER_URL = 'http://127.0.0.1:3000';   // docker-compose
//const API_SERVER_URL = 'backend:3000';         // docker
const API_SERVER_URL = 'http://localhost:3000';  // local dev

const num_items = ref(0)
const num_item_loading_text = ref("Loading number of items to initialize...")

watch(num_items, async (newState, oldState) => {
  /**
  * Observe when custom state query finished, to change loading visualization.
  */ 
  if (newState !== oldState) {
    num_items.value = newState;
    num_item_loading_text.value = "Found " + newState +" items to show on the grid";
  }
})

onMounted(async () => {
  /**
  * Query number of cells to populate the grid.
  */
  await axios.post(API_SERVER_URL+'/grid',
                  {
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/json; charset=utf-8;'
                  }}
  )
  .catch(e => {console.trace(e.response)})
  .then(resp => {
      console.log(resp.data);
      num_items.value = resp.data.num_items;
  });
})
</script>

<template>
  <div class="infobox">{{ num_item_loading_text }}</div>
  <div class="grid">
    <Item v-for="n in num_items" v-bind:key="n" v-bind:imageId=n />
  </div>
</template>

<style scoped>
  div.infobox {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: center;
    padding: 3px;
    margin: 10px;  
    border: 0px solid gray;
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