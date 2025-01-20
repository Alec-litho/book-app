<template>
  <div class="bg">
    <div class="modal">
      <div class="headerModal">
        <div class="leftSide">
          <h1>{{ props.type === 'add' ? 'Добавить книгу' : 'Редактировать книгу' }}</h1>
          <p>
            {{
              props.type === 'add'
                ? 'Заполните все поля и добавьте книгу в список'
                : 'Внесите изменение в карточке'
            }}
          </p>
        </div>
        <div class="rightSide">
          <img src="../../public/close.png" alt="" class="cursor" @click="emit('closeModal')" />
        </div>
      </div>
      <div class="bodyModal">
        <div class="field">
          <label for="name">Название</label>
          <input
            @blur="onBlur(bookTitle)"
            type="text"
            name="name"
            placeholder="Название произведения"
            v-model="initialState.title"
            ref="bookTitle"
          />
          <p>Это поле не должно быть пустым</p>
        </div>
        <div class="field">
          <label for="author">Автор</label>
          <input
            @blur="onBlur(bookAuthor)"
            type="text"
            name="author"
            placeholder="Имя и фамилия автора"
            v-model="initialState.author"
            ref="bookAuthor"
          />
          <p>Это поле не должно быть пустым</p>
        </div>
        <div class="field">
          <label for="year">Год</label>
          <input
            @blur="onBlur(bookYear)"
            type="text"
            name="yaer"
            placeholder="Год выпуска"
            v-model="initialState.year"
            ref="bookYear"
          />
          <p>Это поле не должно быть пустым</p>
        </div>
        <div class="field">
          <label for="category">Жанр</label>
          <input
            @blur="onBlur(bookCategory)"
            type="text"
            name="category"
            placeholder="Добавьте жанр произведения"
            v-model="initialState.category"
            ref="bookCategory"
          />
          <p>Это поле не должно быть пустым</p>
        </div>
      </div>
      <div class="acceptField">
        <input type="radio" />
        <p>
          Я согласен с условиями <span><a href="#">Политики конфиденциальности</a></span>
        </p>
      </div>
      <div class="finish">
        <button class="addBook" @click="handleClick">
          <img :src="'../../public/' + props.type + '.png'" alt="" />
          <p>{{ props.type === 'edit' ? 'Сохранить' : 'Добавить' }}</p>
        </button>
        <button v-if="props.type === 'edit'">
          <img src="../../public/remove.png" alt="" @click="deleteBook" />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import '../assets/main.css'
import { useStore } from 'vuex'
import { PropType, reactive, useTemplateRef } from 'vue'
import { IBook } from '@/types'

const props = defineProps({
  type: String,
  initialData: Object as PropType<IBook>,
})
const emit = defineEmits(['closeModal', 'showNotification'])
const store = useStore()
let bookTitle = useTemplateRef('bookTitle')
let bookAuthor = useTemplateRef('bookAuthor')
let bookYear = useTemplateRef('bookYear')
let bookCategory = useTemplateRef('bookCategory')

const initialState = reactive({
  title: props.initialData.title,
  author: props.initialData.author,
  year: props.initialData.year,
  category: props.initialData.category,
  id: props.initialData.id,
})
function checkInputs() {
  return Object.values(initialState).every((value) => value !== '')
}
const onBlur = (input: HTMLInputElement) => {
  let parent = input.parentElement
  input.value.length === 0 ? parent.classList.add('err') : parent.classList.remove('err')
}
const handleClick = async () => {
  if (checkInputs()) {
    store.commit(props.type === 'add' ? 'setBook' : 'update', initialState)
    emit('showNotification', 'success')
  } else {
    emit('showNotification', 'error')
  }
  emit('closeModal')
}
const deleteBook = () => {
  store.commit('delete', initialState.id)
  emit('closeModal')
  emit('showNotification', 'deleted')
}
</script>
<style lang="scss">
.bg {
  z-index: 100;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.156);
  .modal {
    z-index: 101;
    display: flex;
    flex-direction: column;
    gap: 30px;
    background-color: white;
    width: 65%;
    max-width: 465px;
    height: auto;
    padding: 20px;
    border-radius: 16px;
    .headerModal {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .leftSide {
        h1 {
          font-size: 20px;
          color: rgba(15, 23, 42, 1);
        }
        p {
          font-size: 14px;
          color: rgba(112, 119, 134, 1);
        }
      }
      .rightSide {
        cursor: pointer;
      }
    }
    .bodyModal {
      .field {
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        label {
          font-size: 14px;
          font-weight: bold;
        }
        input {
          height: 41px;
          background-color: rgba(245, 246, 246, 1);
          border-radius: 8px;
          padding-left: 20px;
          margin-top: 10px;
        }
        p {
          display: none;
        }
      }
      .field.err {
        input {
          border: 1px solid red;
          background-color: rgba(255, 0, 0, 0.162);
        }
        p {
          display: block;
          color: red;
          font-size: 14px;
        }
      }
    }
    .acceptField {
      display: flex;
      align-items: center;
      p {
        margin-left: 15px;
      }
      p,
      a {
        font-size: 10px;
        color: rgba(112, 119, 134, 1);
      }
    }
    .finish {
      display: flex;
      justify-content: flex-end;
      p {
        color: white;
      }
    }
  }
  @media screen and (max-width: 480px) {
    .modal {
      width: 100%;
      height: 100%;
    }
    .addBook {
      width: 100%;
    }
  }
}
</style>
