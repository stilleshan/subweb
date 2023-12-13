<template>
  <base-button buttonStyle="btn-success" :buttonText="buttonText" />
</template>

<script>
import BaseButton from './BaseButton.vue';
export default {
  name: 'ButtonSuccess',
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
