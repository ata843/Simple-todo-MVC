<script lang="ts">
import { defineComponent } from '@vue/composition-api';

// eslint-disable-next-line import/no-unresolved
import DataService from '../services/dataservice';

export default defineComponent({
  props: {
    id: {
      type: String,
      default: '',
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['completed', 'error'],
  setup(props, { emit }) {
    const toggleStatus = (id: string, done: boolean) => {
      if (id) {
        DataService.updateItem(id, !done)
          .then(() => {
            emit('completed', null);
          })
          .catch(() => {
            emit('error', 'Error when tried to change status. :(');
          });
      }
    };

    return {
      toggleStatus,
    };
  },
});
</script>

<template lang="pug">
.check_circle(
  @click="toggleStatus(id, status)"
  :style="`borderColor: ${ status ? '#BDDAD5' : '#E5E5E5' }`"
)
  svg(
    v-if="status",
    width="17",
    height="18",
    viewBox="0 0 17 18",
    fill="none",
    xmlns="http://www.w3.org/2000/svg"
  )
    path(
      d='M15.4815 0.740738L6.59258 14.3704L2.14814 9.92592L0.962952 11.1111L6.88888'
        + ' 17.037L16.963 1.62963L15.4815 0.740738Z',
      fill="#5DC2AF"
    )
</template>

<style lang="scss">
@import '../assets/scss/_variables.scss';
.check_circle {
  align-items: center;
  border: 0.888889px solid $lightest-gray;
  border-radius: 100%;
  cursor: pointer;
  display: flex;
  height: 29.63px;
  justify-content: center;
  width: 29.63px;
}
</style>
