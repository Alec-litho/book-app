<template>
  <div class="app">
    <Header />
    <div class="wrapper">
      <div class="bookshelfInfo">
        <h1>
          Книги в каталоге <span>{{ bookNum }}</span>
        </h1>
        <button class="addBook" @click="() => openModal()"><AddSvg /> Добавить книгу</button>
      </div>
    </div>
    <div class="body">
      <BookList @openModal="openModal" />
    </div>
    <Modal
      v-if="isModal"
      @close-modal="closeModal"
      @show-notification="showNotification"
      :type="modalData.type"
      :initialData="modalData.initialData"
    />
    <Notification
      v-if="isNotification"
      @hide-notification="hideNotification"
      :type="notificationType"
    />
  </div>
</template>

<script lang="ts" setup>
import Header from './components/Header.vue'
import BookList from './components/BookList.vue'
import Modal from './components/Modal.vue'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { IBook } from './types'
import Notification from './components/Notification.vue'
import AddSvg from './assets/svgs/AddSvg.vue'
const store = useStore()
let modalData = {
  type: 'add',
  initialData: {
    title: '',
    author: '',
    year: '',
    category: '',
    id: null,
  },
}
let isModal = ref(false)
let isNotification = ref(false)
let notificationType = ref(null)
let bookNum = computed(() => store.getters.getBookshelf.length)
const openModal = (data: IBook | void) => {
  isModal.value = true
  if (data) {
    modalData.type = 'edit'
    modalData.initialData = data
  }
}
const closeModal = () => {
  isModal.value = false
  modalData.type = 'add'
  modalData.initialData = {
    title: '',
    author: '',
    year: '',
    category: '',
    id: null,
  }
}
const hideNotification = (type) => {
  isNotification.value = false
  notificationType.value = type
}
const showNotification = (type) => {
  isNotification.value = true
  notificationType.value = type
}
</script>

<style lang="scss">
.app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(245, 246, 246, 1);

  display: flex;
  align-items: center;
  justify-content: center;
  .bookshelfInfo {
    width: 80%;
    height: 41px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 16px;
    span {
      color: rgba(112, 119, 134, 1);
      font-weight: bold;
    }
    @media screen and (max-width: 480px) {
      .addBook {
        position: absolute;
        bottom: 2.5%;
        left: 5%;
        right: 5%;
      }
    }
  }
  .body {
    width: 100%;
    min-height: 100%;
    background-color: white;
  }
}
</style>
