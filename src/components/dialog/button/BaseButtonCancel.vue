<template>
  <button type="button" class="swal2-cancel btn btn-label-secondary" :class="{ 'me-3': combo }" @click="closeDialog">
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  name: 'BaseButtonCancel',
  props: {
    buttonText: {
      type: String,
      default: '取消',
    },
    combo: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeDialog() {
      this.$store.commit('SET_DIALOG_CLOSE');
    },
  },
};
</script>
