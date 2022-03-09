<script lang="ts">
import {
  defineComponent, onMounted, ref, Ref,
} from '@vue/composition-api';

import Error from './components/Error.vue';
import Paginator from './components/Paginator.vue';
import Search from './components/Search.vue';
import { Tasks, Task, Metadata } from './models/Task';
import DataService from './services/dataservice';
import List from './views/List.vue';

export default defineComponent({
  name: 'App',
  components: {
    Error,
    List,
    Paginator,
    Search,
  },
  setup() {
    const error: Ref<string> = ref('');
    const todoList: Ref<Task[]> = ref([]);
    const searchResults: Ref<Task[]> = ref([]);
    const searchOn: Ref<boolean> = ref(false);
    const searchPage: Ref<number> = ref(1);
    const searchPages: Ref<number> = ref(0);
    const metadata: Ref<Metadata> = ref({
      hasNextPage: false,
      hasPrevPage: false,
      itemCount: 0,
      limit: 0,
      nextPage: null,
      offset: 0,
      page: 0,
      pageCount: 0,
      prevPage: null,
    });
    const pageSize = 20;

    const displayError = (errorMessage: string) => {
      error.value = errorMessage;
    };

    const updateList = (pagesize:number, offset: number) => {
      searchOn.value = false;
      DataService.getAll(pagesize, offset)
        .then((list: Tasks) => {
          error.value = '';
          const rawList = list;

          console.log('rawlist', rawList);
          metadata.value = rawList.data.meta;
          todoList.value = rawList.data.items;
          if (metadata.value.page > metadata.value.pageCount) {
            updateList(pagesize, (metadata.value.pageCount * pagesize - pagesize));
          }
        })
        .catch(() => {
          displayError('Something is wrong with the server. :(');
        });
    };

    const paging = (direction:number) => {
      if (searchOn.value) {
        searchPage.value += direction;
        const from = direction > 0
          ? (searchPage.value - 1) * pageSize
          : searchPage.value * pageSize - pageSize;

        todoList.value = searchResults.value.slice(from, from + pageSize);
      } else {
        updateList(
          pageSize, direction > 0
            ? metadata.value.page * pageSize
            : metadata.value.offset - pageSize,
        );
      }
    };

    const showResults = (results:Task[]) => {
      searchOn.value = true;
      searchResults.value = results;
      searchPages.value = Math.ceil(results.length / pageSize);
      todoList.value = searchResults.value.slice(0, pageSize);
    };

    onMounted(() => {
      updateList(pageSize, 0);
    });

    return {
      displayError,
      error,
      metadata,
      pageSize,
      paging,
      searchOn,
      searchPage,
      searchPages,
      showResults,
      todoList,
      updateList,
    };
  },
});
</script>

<template lang="pug">
#app.todo_app
  Search(
    @completed="updateList(pageSize, metadata.offset)"
    @results="showResults"
  )
  List(
    @completed="updateList(pageSize, metadata.offset)"
    @error="displayError"
    :todoList="todoList"
  )
  Paginator(
    :currentPage="searchOn ? searchPage : metadata.page"
    :totalPages="searchOn ? searchPages : metadata.pageCount"
    @paging="paging"
  )
  Error(
    v-if="error.length > 0"
    :error="error"
  )
</template>

<style lang="scss">
@import '../node_modules/typeface-roboto/index.css';
@keyframes movein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

body {
  background-color: #e5e5e5;
  font-family: 'Roboto', sans-serif;
  font-size: 1em;
  margin: 0;
  padding: 0.625em;
}

.todo_app {
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  max-width: 36.813em;
  margin: auto;
  text-align: center;
  width: 100%;
}
</style>
