<template>
  <div class="wrapper">
    <div class="bookList" v-if="true">
      <BookItem
        v-for="book in getBooks"
        :author="book.author"
        :title="book.title"
        :category="book.category"
        :year="book.year"
        :key="book.id"
        :id="book.id"
        :editBook="editBook"
      />
    </div>
    <div class="notFound" v-else>Ничего не найдено</div>
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
let getBooks = computed(() => store.getters.getBooksByQuery)
</script>

<style>
.bookList {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 16px;
  width: 80%;
}
</style>
