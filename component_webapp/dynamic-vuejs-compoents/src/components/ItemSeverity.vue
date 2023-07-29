<script setup >
import { watch, computed, onMounted, ref } from 'vue'
import axios from 'axios';

//const API_SERVER_URL = 'http://127.0.0.1:3000';   // docker-compose
//const API_SERVER_URL = 'backend:3000';            // docker
const API_SERVER_URL = 'http://localhost:3000';     // local dev


const severity = ref([]);
const state = ref('Loading state...')

const imgProps = defineProps({
  imageId: Number,
})

onMounted(async () => {
  /**
  * Query component specific properties.
  */
  // Query severity.
  await axios.get(API_SERVER_URL+'/grid/item/status?item_id='+imgProps.imageId,
                {
                method: 'get',
                headers: {
                  'Content-Type': 'application/json; charset=utf-8;'
                }}
  )
  .catch(e => {console.trace(e.response)})
  .then(resp => {
    severity.value = resp.data.severity;
    console.debug(resp.data);
  });
})
</script>

<template>
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
</template>

<style scoped>
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