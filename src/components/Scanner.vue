<template>
  <div id="scanner-wrapper">
    <qrcode-stream @decode="onDecode" @init="onInit">
      <div v-if="loading" class="loading-indicator">
        Loading...
      </div>
      <div v-if="error" class="error-indicator has-text-danger">
        {{ error }}
      </div>
    </qrcode-stream>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader';

export default {
  name: 'Scanner',
  components: { QrcodeStream },
  data() {
    return {
      loading: false,
      error: '',
      result: null,
    };
  },
  methods: {
    onDecode(result) {
      this.result = result;
      this.$emit('result', result);
    },
    async onInit(promise) {
      this.loading = true;
      try {
        await promise;
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: you need to grant camera access permisson';
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: no camera on this device';
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: secure context required (HTTPS, localhost)';
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is the camera already in use?';
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: installed cameras are not suitable';
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: Stream API is not supported in this browser';
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
  #scanner-wrapper {
    width: 90%;
    margin: 0 auto;
    height: 100vh;
    overflow: hidden;
  }
</style>
