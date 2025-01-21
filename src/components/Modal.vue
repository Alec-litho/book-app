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
          <img src="../../public/close.png" alt="" class="close" @click="emit('closeModal')" />
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
        <input type="radio" class="acceptInput" />
        <p>
          Я согласен с условиями <span><a href="#">Политики конфиденциальности</a></span>
        </p>
      </div>
      <div class="finish">
        <button class="addBook" @click="handleClick">
          <AddSvg class="addIcon" />
          <p>{{ props.type === 'edit' ? 'Сохранить' : 'Добавить' }}</p>
        </button>
        <button v-if="props.type === 'edit'" class="removeBtn">
          <DeleteSvg @click="deleteBook" />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import '../assets/main.scss'
import { useStore } from 'vuex'
import { PropType, reactive, useTemplateRef } from 'vue'
import { IBook } from '@/types'
import DeleteSvg from '@/assets/svgs/DeleteSvg.vue'
import AddSvg from '@/assets/svgs/AddSvg.vue'

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
@import '../assets/variables.scss';
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
        }
        p {
          font-size: 14px;
        }
      }
      .rightSide {
        cursor: pointer;
        .close {
          color: $default-color;
        }
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
          background-color: $input-color;
          border-radius: 8px;
          padding-left: 20px;
          margin-top: 10px;
          border: 1px solid $input-color;
        }
        input:focus {
          border: 1px solid $success-color;
        }
        p {
          display: none;
        }
      }
      .field.err {
        input {
          border: 1px solid $error-color;
          background-color: rgba(255, 0, 0, 0.162);
        }
        p {
          display: block;
          color: $error-color;
          font-size: 14px;
        }
      }
    }
    .acceptField {
      display: flex;
      align-items: center;
      p,
      a {
        font-size: 10px;
        color: rgba(112, 119, 134, 1);
      }
      p {
        margin-left: 15px;
      }
      a {
        text-decoration: underline;
      }
      input[type='radio'] {
        cursor: pointer;
        appearance: none;
        color: $default-color;
        width: 16px;
        height: 16px;
        border: 0.15em solid $default-color;
        border-radius: 15%;
      }
      input[type='radio']:checked {
        border-color: $success-color;
        background-color: $success-color;
        color: #fff;
        border-color: transparent;
        background: #fff
          url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><polyline points="0.15,0.5 0.4,0.75 0.85,0.25" style="fill:none;stroke:%2314bf8b;stroke-linecap:round;stroke-width:0.15;"/></svg>')
          no-repeat 50% / 1rem;
      }
    }
    .finish {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 10px;
      p {
        color: white;
      }
      .removeBtn {
        background-color: rgba(245, 246, 246, 1);
        width: 41px;
        height: 41px;
        border-radius: 8px;
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
