<script lang="ts">
import { defineComponent, ref, Ref } from '@vue/composition-api';

import { Tasks, Task } from '../models/Task';
import DataService from '../services/dataservice';

export default defineComponent({
  emits: ['error', 'results', 'completed'],
  props: {
    itemCount: {
      type: Number,
      default: 100,
    },
  },
  setup(props, { emit }) {
    const searchTerm:Ref<string> = ref('');
    const fullList: Ref<Task[]> = ref([]);
    const searchCount: Ref<number> = ref(0);

    const search = () => {
      if (searchTerm.value.length > 2) {
        DataService.getAll(props.itemCount, 0)
          .then((list: Tasks) => {
            const rawList = list;

            fullList.value = rawList.data.items;
            const results = fullList.value.filter(
              (item) => item.description.indexOf(searchTerm.value) > -1,
            );

            searchCount.value = results.length;

            emit('results', results);
          })
          .catch(() => {
            emit('error', 'Error while added note. :(');
          });
      } else {
        searchCount.value = 0;
        emit('completed', null);
      }
    };

    return {
      search,
      searchCount,
      searchTerm,
    };
  },
});
</script>

<template lang="pug">
  .search
    svg.search__search_icon(width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg")
      path(d="M13.8289 13.0043L9.84772 9.023C10.6189 8.07043 11.0832 6.86 11.0832 5.54168C11.0832 "
        + "2.48618 8.59705 0 5.54159 0C2.48612 0 0 2.48615 0 5.54165C0 8.59715 2.48615 11.0833 "
        + "5.54162 11.0833C6.85992 11.0833 8.07034 10.619 9.0229 9.84783L13.0041 13.8291C13.1179 "
        + "13.9428 13.2672 14 13.4165 14C13.5659 14 13.7152 13.9428 13.8289 13.8291C14.057 13.601 "
        + "14.057 13.2323 13.8289 13.0043ZM5.54162 9.91665C3.12897 9.91665 1.16666 7.95432 "
        + "1.16666 5.54165C1.16666 3.12897 3.12897 1.16665 5.54162 1.16665C7.95426 1.16665 "
        + "9.91657 3.12897 9.91657 5.54165C9.91657 7.95432 7.95424 9.91665 5.54162 9.91665Z"
        fill="#676767")
    input.search__search_input(
      @input="search()"
      v-model="searchTerm"
      placeholder="Search"
    )
    span.search__search_counter(v-if="searchCount > 0") {{ searchCount }} result
      span(v-if="searchCount > 1") s
</template>

<style lang="scss">
@import '../assets/scss/_variables.scss';
.search {
  align-items: center;
  background: $lighter-gray;
  border-radius: 0.75em;
  display: flex;
  margin-bottom: 1em;
  width: 100%;

  .search__search_icon {
    margin: 9px 6px 9px 9px;
  }

  .search__search_input {
    border: 0;
    background: transparent;
    color: $dark-gray;
    flex-grow: 1;
    font-size: $font-base;
    font-weight: $font-light;
    padding: 2px;

    &:focus {
      color: $dark-gray;
      font-weight: $font-light;
      outline: none;
    }
  }

  .search__search_counter {
    font-size: 0.688em;
    color: $darker-gray;
    margin-right: 0.563em;
  }
}
</style>
