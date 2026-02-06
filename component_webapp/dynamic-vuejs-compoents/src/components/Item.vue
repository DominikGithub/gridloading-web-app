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
const imageLoadError = ref(false);

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

const handleImageError = () => {
  imageLoadError.value = true;
}

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
    <div v-if="imageLoadError" class="image-placeholder">
      <div class="placeholder-text">🖼</div>
    </div>
    <img v-else v-bind:src=imageURL @error="handleImageError" />

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
    padding: 8px;
    border: 1px solid gray;
    border-radius: 4px;
    background-color: #f5f5f5;
    gap: 8px;
    height: auto;
    width: 100%;
  }
  
  img {
    width: 140px;
    height: 140px;
    object-fit: cover;
    flex-shrink: 0;
    border-radius: 2px;
  }
  
  div.image-placeholder {
    width: 140px;
    height: 140px;
    flex-shrink: 0;
    border-radius: 2px;
    background: #d0d0d0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    font-size: 56px;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  div.placeholder-text {
    text-align: center;
  }
  
  div.item_property_box {
    display: flex;
    flex-direction: column;
    overflow: auto;
    flex: 1;
    font-size: 9px;
    text-align: left;
    gap: 4px;
  }
  
  div.item_property_box div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
    line-height: 1.4;
    padding: 6px 8px;
    border-radius: 3px;
    color: inherit;
    margin-right: 2px;
  }
  
  div.item_property_box div > * {
    font-weight: bold;
  }
  
  div.item_property_box ul {
    margin: 2px 0;
    padding-left: 16px;
    list-style: disc inside;
    font-size: 10px;
    list-style-position: inside;
  }
  
  div.item_property_box li {
    margin: 1px 0;
    padding: 0px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.2;
    color: #555;
  }
</style>