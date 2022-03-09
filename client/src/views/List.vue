<script lang="ts">
import {
  defineComponent,
} from '@vue/composition-api';

import Header from '../components/Header.vue';
import Item from '../components/Item.vue';

export default defineComponent({
  props: {
    todoList: {
      type: Array,
      default: () => ([]),
    },
  },
  components: {
    Header,
    Item,
  },
  setup(props, { emit }) {
    const completed = () => {
      emit('completed', null);
    };

    const error = (message:string) => {
      emit('error', message);
    };

    return {
      completed,
      error,
    };
  },
});
</script>

<template lang="pug">
.list_box
  Header.list_box__header(
    @completed="completed"
    @error="error('Error while adding new task. :(')"
  )
  ul.list_box__list(v-if="todoList && todoList.length > 0")
    li.list_box__list__list_item(v-for="item in todoList", :key="item._id")
      Item(
        :item="item"
        @completed="completed"
      )
  p.list_box__no_items(v-else) No items to display.
</template>

<style lang="scss">
@import '../assets/scss/_variables.scss';
.list_box {
  background: white;
  box-sizing: border-box;
  border-radius: 0.750em;
  width: 100%;
}

.list_box__header {
  background: rgba($light-gray, 0.1);
  border: 1px solid $light-gray;
  box-sizing: border-box;
  border-radius: 0.750em 0.750em 0 0;
}

.list_box__list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.list_box__list__list_item {
  border-bottom: 1px solid $light-gray;
  border-left: 1px solid rgba(black, 0.17);
  border-right: 1px solid rgba(black, 0.17);

  &:last-child {
    border-bottom: 1px solid rgba(black, 0.17);
    border-radius: 0 0 0.750em 0.750em;
  }

  &:hover .list_item__content__delete_button {
    display: flex;
  }
}

.list_box__no_items {
  font-weight: $font-light;
  color: $medium-gray;
}
</style>
