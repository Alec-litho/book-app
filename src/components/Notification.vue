<template>
  <div :class="props.type === 'error' ? 'errorNotification' : 'successNotification'">
    <img
      :src="`../../public/${type === 'error' ? 'notAdded.png' : type === 'success' ? 'added.png' : 'delete-w.png'}`"
      class="icon"
    />
    <p>
      {{
        type === 'error'
          ? 'Книга не добавлена'
          : type === 'success'
            ? 'Книга добавлена в список'
            : 'Книга удалена. Вернуть её'
      }}
    </p>
    <img src="../../public/close-t.png" alt="" class="close" @click="emit('hideNotification')" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  type: String,
})
const emit = defineEmits(['hideNotification'])
</script>

<style lang="scss">
@import '../assets/variables.scss';

.errorNotification,
.successNotification {
  position: absolute;
  bottom: 2.5%;
  width: auto;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  color: white;
  border-radius: 8px;
  padding: 0 15px;
  .close {
    color: white;
    cursor: pointer;
  }
  p {
    color: white;
  }
}
.errorNotification {
  background-color: $error-color;
}
.successNotification {
  background-color: $success-color;
}
@media screen and (max-width: 480px) {
  .successNotification,
  .errorNotification {
    bottom: 10%;
    left: 5%;
    right: 5%;
  }
}
</style>
