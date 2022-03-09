<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import DataService from '../services/dataservice';
import CheckCircle from './CheckCircle.vue';

export default defineComponent({
  components: {
    CheckCircle,
  },
  props: {
    item: {
      type: Object,
      default: () => ({
        _id: '',
        description: '',
        done: false,
        createdAt: '',
        updatedAt: '',
      }),
    },
  },
  emits: ['completed', 'error'],
  setup(props, { emit }) {
    const now = new Date().getTime();
    const created = new Date(props.item.createdAt).getTime();
    const ago = Math.round((now - created) / 60 / 60 / 60);
    const deleteItem = (id: string) => {
      if (id) {
        DataService.deleteItem(id)
          .then(() => {
            emit('completed', null);
          })
          .catch(() => {
            emit('error', 'Error while tried to delete an item. :(');
          });
      }
    };

    const completed = () => {
      emit('completed', null);
    };

    return {
      ago,
      deleteItem,
      completed,
    };
  },
});
</script>

<template lang="pug">
.list_item__content
  CheckCircle.list_item__content__check_circle(
    @completed="completed"
    :id="item._id"
    :status="item.done"
  )
  .list_item__content__description(
    :class="{ 'checked_item': item.done }"
  )
    span {{ item.description }}
    small.list_item__content__description__elapsed_time - {{ ago }} minutes
  button.list_item__content__delete_button(@click="deleteItem(item._id)")
    svg(
      width="12",
      height="12",
      viewBox="0 0 12 12",
      fill="none",
      xmlns="http://www.w3.org/2000/svg"
    )
      line(
        x1="0.715217",
        y1="1.01405",
        x2="11.2707",
        y2="11.5695",
        stroke="#A3A3A3"
      )
      line(
        x1="0.646447",
        y1="11.5695",
        x2="11.2019",
        y2="1.01405",
        stroke="#A3A3A3"
      )
</template>

<style lang="scss">
@import '../assets/scss/_variables.scss';
.list_item__content {
  display: flex;
  flex-direction: row;
  align-items: center;

  &:hover .list_item__content__delete_button {
    display: flex;
  }
}

.list_item__content__check_circle {
  margin: 10px 8px 10px 18px;
}

.list_item__content__delete_button {
  align-items: center;
  background: none;
  border: 0;
  border-radius: 100%;
  cursor: pointer;
  display: none;
  height: 24px;
  justify-content: center;
  margin-right: 15px;
  padding: 2px;
  width: 24px;

  &:hover {
    box-shadow: 1px 1px 10px rgba(black, 0.1);
  }
}

.list_item__content__description {
  cursor: default;
  flex-grow: 1;
  text-align: left;

  span {
    color: black;
    font-weight: $font-light;
  }

  &.checked_item span {
    color: $medium-gray;
    text-decoration: line-through;
  }

  .list_item__content__description__elapsed_time {
    color: $darkest-gray;
    font-size: $font-small;
    font-weight: $font-light;
    line-height: 0.750em;
    margin-left: 0.375em;
  }
}
</style>

function dayjs() {
  throw new Error('Function not implemented.');
}
