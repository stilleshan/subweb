<template>
  <button
    type="button"
    class="btn"
    :class="[buttonStyle, { 'me-3': combo }]"
    style="display: inline-block"
    @click="submitDialog"
  >
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    buttonText: {
      type: String,
      default: 'OK',
    },
    buttonStyle: {
      type: String,
      default: 'btn-primary',
    },
    combo: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    submitDialog() {
      this.$store.commit('SET_DIALOG_CLOSE');
      if (this.$store.state.app.dialog.callbackFunction) {
        this.$store.state.app.dialog.callbackFunction(); // 执行回调函数
      }
    },
  },
};
</script>
