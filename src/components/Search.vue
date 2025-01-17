<template>
  <div class="search">
    <div class="icon">
      <img src="../../public/search.png" alt="#" class="searchIcon" />
    </div>
    <input type="text" placeholder="Найти ту самую книгу" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Search',
  setup() {
    const store = useStore()
    const query = ref('')
    const showInput = ref(false)

    const addSearch = async () => {
      if (query.value !== '') {
        await store.dispatch('addSearch', {
          query: query.value,
          status: true,
        })
        return (query.value = '')
      }
      return await store.dispatch('addSearch', {
        query: '',
        status: false,
      })
    }

    const toggleShowInput = () =>
      showInput.value === false ? (showInput.value = true) : (showInput.value = false)

    return {
      showInput,
      query,
      addSearch,
      toggleShowInput,
    }
  },
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
    width: 10%;
    height: 100%;
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
