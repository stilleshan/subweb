<template>
  <base-button buttonStyle="btn-success" :buttonText="confirm" combo />
  <base-button-cancel :buttonText="cancel" />
</template>

<script>
import BaseButton from './BaseButton.vue';
import BaseButtonCancel from './BaseButtonCancel.vue';
export default {
  name: 'ConfirmSuccess',
  data() {
    return {
      confirm: this.$store.state.app.dialog.buttonText.confirmText || '确认',
      cancel: this.$store.state.app.dialog.buttonText.cancelText || '取消',
    };
  },
  components: {
    BaseButton,
    BaseButtonCancel,
  },
};
</script>
