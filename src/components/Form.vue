<template>

</template>

<script>
import { ref, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Form',
  setup() {
    const store = useStore()

    const showInput = ref(false)

    const toggleShowInput = () =>
      showInput.value === false
        ? (showInput.value = true)
        : (showInput.value = false)

    const initialState = {
      bookTitle: '',
      bookAuthor: '',
      bookYear: null,
      bookisComplete: false,
    }

    const formState = reactive(initialState)

    const addBook = async () => {
      if (formState !== initialState) {
        await store.dispatch('addBook', formState)
        return clearForm()
      }
      return null
    }

    const clearForm = () => {
      formState.bookTitle = ''
      formState.bookAuthor = ''
      formState.bookYear = null
      formState.bookisComplete = false
      return formState
    }

    return {
      ...toRefs(formState),
      showInput,
      toggleShowInput,
      addBook,
    }
  },
}
</script>
