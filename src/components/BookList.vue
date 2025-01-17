<template>
  <div class="wrapper">
    <div class="bookList">
      <BookItem />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

import Button from './Button.vue'
import BookItem from './BookItem.vue'

export default {
  name: 'BookList',
  components: {
    Button,
    BookItem,
  },
  setup() {
    const store = useStore()
    console.log(store)

    const removeBook = (id) => store.dispatch('removeBook', store.getters.findBookIndex(id))

    const addBookToComplete = (id) =>
      store.dispatch('addBookToComplete', store.getters.findBookIndex(id))

    const addBookToInComplete = (id) =>
      store.dispatch('addBookToInComplete', store.getters.findBookIndex(id))

    return {
      inCompleteBooks: computed(() => store.getters.inCompleteBooks),
      completeBooks: computed(() => store.getters.completeBooks),
      getSearchStatus: computed(() => store.getters.getSearchStatus),
      findBookTitle: computed(() => store.getters.findBookTitle),
      removeBook,
      addBookToComplete,
      addBookToInComplete,
    }
  },
}
</script>
