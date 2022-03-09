<script lang="ts">
import { defineComponent, ref, Ref } from '@vue/composition-api';

// eslint-disable-next-line import/no-unresolved
import DataService from '../services/dataservice';

export default defineComponent({
  emits: ['completed', 'error'],
  setup(props, { emit }) {
    const noteToAdd: Ref<string> = ref('');

    const addNote = () => {
      if (noteToAdd.value.length > 0) {
        DataService.createItem(noteToAdd.value)
          .then(() => {
            noteToAdd.value = '';
            emit('completed', null);
          })
          .catch(() => {
            emit('error', 'Error while added note. :(');
          });
      }
    };

    return {
      addNote,
      noteToAdd,
    };
  },
});
</script>

<template lang="pug">
.header
  input.header__input(placeholder="Take a note", v-model="noteToAdd")
  button.header__button_add_note_button(@click="addNote", :disabled="noteToAdd.length === 0")
    svg(
      width="16",
      height="16",
      viewBox="0 0 16 16",
      fill="none",
      xmlns="http://www.w3.org/2000/svg"
    )
      line(
        x1="7.57715",
        y1="15.3625",
        x2="7.57715",
        y2="0.434816",
        stroke="#A3A3A3"
      )
      line(
        x1="0.0771484",
        y1="7.93481",
        x2="14.9432",
        y2="7.93481",
        stroke="#A3A3A3"
      )
</template>

<style lang="scss">
@import '../assets/scss/_variables.scss';
.header {
  align-items: center;
  display: flex;
  flex-direction: row;

  .header__input {
    background: transparent;
    border: 0;
    color: $medium-gray;
    flex-grow: 1;
    font-size: $font-base;
    line-height: 1.188em;
    padding: 1.25em 0 1.188em 1.875em;

    &::placeholder {
      color: $medium-gray;
    }

    &:focus {
      outline: none;
    }
  }

  .header__button_add_note_button {
    align-items: center;
    background: transparent;
    border: 0;
    border-radius: 100%;
    cursor: pointer;
    display: flex;
    height: 24px;
    justify-content: center;
    margin-right: 1.313em;
    padding: 0;
    width: 24px;

    &:hover {
      box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  }
  }
}
</style>
