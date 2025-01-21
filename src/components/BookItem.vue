<template>
  <div class="item">
    <div class="itemHeader">
      <div class="title">
        <h2>{{ props.title }}</h2>
      </div>
      <div class="btn">
        <button>
          <EditSvg
            class="icon"
            @click="
              () =>
                props.editBook({
                  id: props.id,
                  title: props.title,
                  author: props.author,
                  year: props.year,
                  category: props.category,
                })
            "
          />
        </button>
      </div>
    </div>
    <div class="itemInfo">
      <p>{{ props.author }}</p>
      <p>{{ props.year }}</p>
      <p>{{ props.category }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import '../assets/main.scss'
import { PropType } from 'vue'
import { IBook } from '@/types'
import EditSvg from '@/assets/svgs/EditSvg.vue'
const props = defineProps({
  id: String,
  title: String,
  author: String,
  year: String,
  category: String,
  editBook: Function as PropType<(data: IBook | void) => void>,
})
const emit = defineEmits(['openModal'])
</script>

<style lang="scss">
.item {
  width: 100%;
  height: auto;
  background-color: rgba(245, 246, 246, 1);
  border-radius: 16px;
  padding: 15px;

  .itemHeader {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 15px;
    .title {
      width: 90%;
    }
    .btn {
      height: 100%;
      width: 10%;
      display: flex;
      justify-content: flex-end;
    }
  }
  .itemInfo {
    display: flex;
    align-items: center;
    gap: 20px;
    color: rgba(112, 119, 134, 1);
  }
}
</style>
