<script setup>
import { ref } from 'vue'
import { on, off, publish } from '../utils/PubSub.js'

  const messageArr = ref([])
  const renderData = (masName, data) => {
    messageArr.value.push(data.data)
  }

  on('httpRequest', renderData)
</script>

<template>
  <div v-for="(item, index) in messageArr" :key="index">
    <json-viewer
      :value="item"
      :expand-depth="1"
      boxed
      :show-array-index="false"
    >
    </json-viewer>
    <div style="width: 100; height: 20px"></div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
