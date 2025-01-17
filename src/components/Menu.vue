<template>
  <div class="wrapper">
    <div class="bookInfo">
      <h1>Книги в каталоге {{ num }}</h1>
      <Button buttonClass="addBook" type="add" />
    </div>
  </div>
</template>

<script setup>
import Button from './Button.vue'
import '../assets/main.css'

const props = defineProps({
  bookNum: Number,
})
</script>

<style lang="scss">
// @import '../assets/main.scss';

.bookInfo {
  width: 80%;
  height: 41px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px;
}
</style>
