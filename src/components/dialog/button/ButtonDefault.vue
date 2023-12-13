<template>
  <base-button buttonStyle="btn-primary" :buttonText="buttonText" />
</template>

<script>
import BaseButton from './BaseButton.vue';
export default {
  name: 'ButtonDefault',
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
