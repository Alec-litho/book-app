<template>
  <div class="search">
    <div class="icon">
      <img src="../../public/search.png" alt="#" class="searchIcon" />
    </div>
    <input type="text" placeholder="Найти ту самую книгу" v-model="query" @input="search" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const query = ref('')

const search = async () => {
  await store.dispatch('addSearch', {
    query: query.value,
    status: true,
  })
}
</script>

<style lang="scss">
.search {
  width: 100%;
  height: 100%;
  position: relative;

  .icon {
    position: absolute;
    left: 1%;
    top: 20%;
  }
  input {
    width: 90%;
    height: 100%;
    background-color: white;
    border-radius: 8px;
    padding-left: 40px;
  }
}
</style>
