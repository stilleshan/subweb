<template>
  <base-button buttonStyle="btn-danger" :buttonText="buttonText" />
</template>

<script>
import BaseButton from './BaseButton.vue';
export default {
  name: 'ButtonError',
  data() {
    return {
      buttonText: this.$store.state.app.dialog.buttonText.confirmText || 'OK',
    };
  },
  components: {
    BaseButton,
  },
};
</script>
