<script async setup>
import { ref, reactive, computed, onMounted} from 'vue'
//import axios from 'axios';

import RndImage from "./RndImage.vue";

/**const gridProps = defineProps({
  cats: Array
})

const users = ref([]);

onMounted(async () => {
  const cats = await axios.get('https://cataas.com/api/cats?tags=cute');
  users.values = cats.data;
  //console.log(gridProps.cats);

  return {
    users,
  }
})

const catNames = computed(() => {
  console.log(users); //gridProps.cats);
  return users; //gridProps.cats;
})*/
</script>

<template>
  <RndImage v-for="n in 50" v-bind:key="n" v-bind:imageId=n />
</template>
