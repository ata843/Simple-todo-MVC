<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    error: {
      type: String,
      default: '',
    },
  },
});
</script>

<template lang="pug">
.error_message {{ error }}
</template>

<style lang="scss">
@import '../assets/scss/_variables.scss';
.error_message {
  animation: movein 1s ease-out forwards;
  background-color: rgba($error, 0.1);
  border-bottom: 1px solid $error;
  border-top: 1px solid $error;
  bottom: 20px;
  box-shadow: 0 1px 10px rgba(black, .4);
  color: $error;
  font-size: $font-small;
  letter-spacing: 1px;
  left: 0;
  padding: 5px 0;
  position: fixed;
  text-transform: uppercase;
  width: 100%;
  z-index: 10;
}
</style>
