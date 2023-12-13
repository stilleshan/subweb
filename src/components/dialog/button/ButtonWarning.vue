<template>
  <base-button buttonStyle="btn-warning" :buttonText="buttonText" />
</template>

<script>
import BaseButton from './BaseButton.vue';
export default {
  name: 'ButtonWarning',
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
