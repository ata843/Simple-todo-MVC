<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    totalPages: {
      type: Number,
      default: 1,
    },
  },
  emits: ['paging'],
  setup(propsm, { emit }) {
    const page = (direction:number) => {
      emit('paging', direction);
    };

    return {
      page,
    };
  },
});
</script>

<template lang="pug">
  .paginator
    button.paginator__button_left(
      @click="page(-1)"
      :disabled="currentPage < 2"
    )
      svg(width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg")
        path(d="M7.48572 0.213026L0.212994 7.48595C0.076606 7.62229 0 7.8073 0 8.00018C0 8.1931 "
          + "0.0766544 8.37807 0.213042 8.51446L7.48577 15.787C7.76979 16.071 8.23026 16.071 "
          + "8.51428 15.787C8.79825 15.503 8.7983 15.0425 8.51428 14.7585L1.75583 8.00018L8.51428 "
          + "1.24153C8.65629 1.09952 8.72727 0.913389 8.72727 0.727256C8.72727 0.541122 8.65629 "
          + "0.354989 8.51423 0.212976C8.23021 -0.0709991 7.76975 -0.0709991 7.48572 0.213026Z "
          fill="#676767")
    .separator
    button.paginator__button_right(
      @click="page(1)"
      :disabled="totalPages === currentPage"
    )
      svg(width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg")
        path(d="M1.24156 0.213026L8.51429 7.48595C8.65067 7.62229 8.72728 7.8073 8.72728 "
          + "8.00018C8.72728 8.1931 8.65063 8.37807 8.51424 8.51446L1.24151 15.787C0.957486 "
          + "16.071 0.497025 16.071 0.213 15.787C-0.0709753 15.503 -0.0710239 15.0425 0.213 "
          + "14.7585L6.97145 8.00018L0.213 1.24153C0.0709887 1.09952 6.67572e-06 0.913389 "
          + "6.67572e-06 0.727256C6.67572e-06 0.541122 0.0709887 0.354989 0.213049 "
          + "0.212976C0.497073 -0.0709991 0.957534 -0.0709991 1.24156 0.213026Z" fill="#676767")
</template>

<style lang="scss">
@import '../assets/scss/_variables.scss';
  .paginator {
    align-items: center;
    background: white;
    border: 1px solid rgba(black, 0.17);
    border-radius: 0.75em;
    box-sizing: border-box;
    display: flex;
    margin-top: 1em;

    button {
      background: transparent;
      border: 0;
      cursor: pointer;
      padding: 0.625em 0.813em 0.5em;

      &:disabled svg path {
        fill: rgba($darker-gray, 0.5);
      }
    }

    .separator {
      background-color: $medium-gray;
      height: 1.188em;
      width: 1px;
    }
  }
</style>
