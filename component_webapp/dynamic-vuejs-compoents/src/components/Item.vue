<script setup >
import { watch, computed, onMounted, ref } from 'vue'
import axios from 'axios';
import ItemSeverity from "../components/ItemSeverity.vue";

//const API_SERVER_URL = 'http://127.0.0.1:3000';   // docker-compose
//const API_SERVER_URL = 'backend:3000';            // docker
const API_SERVER_URL = 'http://localhost:3000';     // local dev


// https://picsum.photos/id/1005/150/150
const image_first = 'https://picsum.photos/id/';
const image_second = '/150/150';

const nameList = ref([]);
const severity = ref([]);
const state = ref('Loading state...')

const imgProps = defineProps({
  imageId: Number,
})

watch(nameList, async (newState, oldState) => {
  /**
  * Observe when state query finished, to change loading visualization.
  */ 
  if (newState !== oldState) {
    state.value = 'Received data';
  }
})

onMounted(async () => {
  /**
  * Query component specific properties.
  */
  // Query list of names.
  await axios.get(API_SERVER_URL+'/grid/item/info_list?item_id='+imgProps.imageId,
                  {
                  method: 'get',
                  headers: {
                    'Content-Type': 'application/json; charset=utf-8;'
                  }}
  )
  .catch(e => {console.trace(e.response)})
  .then(resp => {
      nameList.value = resp.data;
      console.debug(resp.data);
  });
})


const imageURL = computed(() => {
  /**
  * Compute image URL from given propery id.
  */
  var startCounter = Math.floor(Math.random() * 800);
  return image_first + (startCounter + imgProps.imageId).toString() + image_second;
})
</script>

<template>
  <div class="grid_item">

    <!-- Icon -->
    <img v-bind:src=imageURL />

    <div class="item_property_box">
      
      <!-- Item header state -->
      <div>{{ state }}</div>

      <!-- Severity -->
      <div>
        <ItemSeverity v-bind:imageId=imgProps.imageId />
      </div>

      <!-- Name list -->
      <ul>
        <li v-for="name in nameList">{{ name }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  div.grid_item {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: center;
    padding: 3px;
    margin: 10px;  
    border: 1px solid gray;
  }
  div.item_property_box {
    display: flex;
    flex-direction: column;
  }
</style>