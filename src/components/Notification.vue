<template>
  <div :class="props.type === 'error' ? 'errorNotification' : 'successNotification'">
    <img
      :src="`../../public/${type === 'error' ? 'notAdded.png' : type === 'success' ? 'added.png' : 'remove.png'}`"
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
    <img src="../../public/close.png" alt="" class="close" @click="emit('hideNotification')" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  type: String,
})
const emit = defineEmits(['hideNotification'])
</script>

<style lang="scss">
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
  background-color: rgba(144, 11, 9, 1);
}
.successNotification {
  background-color: rgba(31, 139, 72, 1);
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
