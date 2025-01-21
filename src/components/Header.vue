<template>
  <div class="wrapper">
    <div class="content">
      <div class="logo">
        <img src="../../public/Frame 2.png" alt="#" />
      </div>
      <Search></Search>
    </div>
  </div>
</template>

<script setup>
import Search from './Search.vue'
import '../assets/main.scss'
</script>

<style lang="scss">
.content {
  height: 41px;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 16px 0;
  .searchBar {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
