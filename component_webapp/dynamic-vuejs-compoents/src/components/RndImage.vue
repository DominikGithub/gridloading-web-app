<script setup >
import { watch, computed, onMounted, ref } from 'vue'
import axios from 'axios';

// const API_SERVER_URL = process.env.VUE_APP_API_URL;
//const API_SERVER_URL = 'http://127.0.0.1:3000';     // docker-compose
//const API_SERVER_URL = 'backend:3000';            // docker
const API_SERVER_URL = 'http://localhost:3000';  // local dev


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
  * Observe when custom state query finished, to change loading visualization.
  */ 
  if (newState !== oldState) {
    state.value = 'Received report';
  }
})


onMounted(async () => {
  /**
  * Query status properties from custom API.
  */
  // 1) Query name list
  const resNames = await axios.get(API_SERVER_URL+'/info_list?device_id='+imgProps.imageId,
                                {
                                method: 'get',
                                headers: {
                                  'Content-Type': 'application/json; charset=utf-8;'
                                }}
  )
  .catch(e => {console.trace(e.response)})
  .then(resp => {
      nameList.value = resp.data;
      console.log(resp.data);
  });

  // 2) Query status
  const resState = await axios.get(API_SERVER_URL+'/status?device_id='+imgProps.imageId,
                                {
                                method: 'get',
                                headers: {
                                  'Content-Type': 'application/json; charset=utf-8;'
                                }}
  )
  .catch(e => {console.trace(e.response)})
  .then(resp => {
    severity.value = resp.data.severity;
    console.log(resp.data);
  });
})


const imageURL = computed(() => {
  /**
  * Compute image URL from given propery id.
  */
  var startCounter = Math.floor(Math.random() * 100);
  // 800
  return image_first + (startCounter + imgProps.imageId).toString() + image_second;
})
</script>

<template>
  <div class="item">

    <!-- Icon -->
    <img v-bind:src=imageURL />

    <div class="response_container">
      
      <!-- Response -->
      <div>{{ state }}</div>

      <!-- Severity -->
      <div v-if="severity === 0" class="severity_normal severity">
        Normal
      </div>
      <div v-else-if="severity === 1" class="severity_warning severity">
        Warning
      </div>
      <div v-else-if="severity === 2" class="severity_alarm severity">
        Alarm
      </div>
      <div v-else  class="severity_unkown severity">
        Unkown
      </div>

      <!-- Name list -->
      <ul>
        <li v-for="name in nameList">{{ name }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  div.item {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: center;

    padding: 3px;
    margin: 10px;  
    border: 1px solid gray;
  }
  div.response_container {
    display: flex;
    flex-direction: column;
  }

  div.severity {
    margin-left:10px;
    margin-right:10px;
    text-align: center;
    border-radius : 4px;
  }
  div.severity_normal {
    background-color: green;
  }
  div.severity_warning {
        background-color: yellow;
  }
  div.severity_alarm {
    background-color: red;
    font-style: bold;
  }
  div.severity_unkown {
    background-color: gray;
  }

</style>