<template>
  <div class="item">
    <div class="itemHeader">
      <h2>{{ 'book name' }}</h2>
      <button>
        <img src="../public/edit.png" alt="" />
      </button>
    </div>
    <div class="itemInfo">
      <p>{{ 'author' }}</p>
      <p>{{ '2020' }}</p>
      <p>{{ 'category' }}</p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BookItem',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    // const store = useStore()
    // const query = ref('')
    // const showInput = ref(false)
  },
}
</script>

<style lang="scss"></style>
