<template>
  <div class="app">
    <Header />
    <Menu :bookNum="{ bookNum }" />
    <div class="body">
      <Form />
      <BookList />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Form from './components/Form.vue'
import Search from './components/Search.vue'
import BookList from './components/BookList.vue'
import Menu from './components/Menu.vue'
let bookNum = 0
export default {
  name: 'App',
  components: {
    Header,
    Form,
    BookList,
    Search,
    Menu,
  },
}
</script>

<style lang="scss">
.app {
  width: 100%;
  height: auto;
  background-color: rgba(245, 246, 246, 1);

  .body {
    width: 100%;
    min-height: 100vh;
    background-color: white;
  }
}
</style>
