<template>
  <el-dialog v-model="isShow" top="30vh" width="40%">
    <span>
      <p style="text-align: center">{{ message }}</p>
    </span>
  </el-dialog>
</template>

<script>
import { ElDialog } from 'element-plus';
import 'element-plus/theme-chalk/index.css';

export default {
  name: 'DialogLayOut',
  components: {
    ElDialog,
  },
  data() {
    return {
      isShow: false,
      message: '',
    };
  },
  created() {
    this.emitter.on('DialogLayOut', (DialogLayOut) => {
      this.isShow = true;
      this.message = DialogLayOut;
    });
  },
};
</script>

<style scoped></style>
