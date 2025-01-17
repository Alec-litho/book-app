<template>
  <button :class="btnClass" @click="customClick">
    <img
      :src="`../../public/${type === 'add' ? 'add.png' : type === 'notAdded' ? 'notAdded.png' : 'added.png'}`"
      class="icon"
    />
    {{
      type === 'add'
        ? 'Добавить книгу'
        : type === 'notAdded'
          ? 'Книга не добавлена'
          : 'Книга добавлена в список'
    }}
  </button>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  name: 'Button',
  props: {
    buttonClass: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  emits: ['click-event'],
  setup(props, { emit }) {
    const btn = reactive({
      btnClass: props.buttonClass,
    })

    const customClick = async (event) => await emit('click-event', event.target.value)

    return {
      ...toRefs(btn),
      customClick,
    }
  },
}
</script>
