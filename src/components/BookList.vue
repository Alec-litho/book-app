<template>
  <div class="wrapper">
    <div class="bookList" v-if="books.length > 0">
      <BookItem
        v-for="book in books"
        :author="book.author"
        :title="book.title"
        :category="book.category"
        :year="book.year"
        :key="book.id"
        :id="book.id"
        :editBook="editBook"
      />
    </div>
    <div class="notFound" v-else>По вашему запросу ничего не найдено</div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import BookItem from './BookItem.vue'
import { IBook } from '@/types'
const emit = defineEmits(['openModal'])
const store = useStore()

const editBook = (data: IBook) => emit('openModal', data)
let books = computed(() => store.getters.getBooksByQuery)
</script>

<style lang="scss">
@import '../assets/variables.scss';
.bookList {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 16px;
  width: 80%;
}
.notFound {
  padding-top: 15px;
  color: $default-color;
}
</style>
