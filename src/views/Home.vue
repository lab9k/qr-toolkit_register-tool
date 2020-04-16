<template>
 <div>
   <scanner @result="onResult"/>
 </div>
</template>

<script>

import Scanner from '@/components/Scanner.vue';

export default {
  name: 'Home',
  components: {
    Scanner,
  },
  data() {
    return {
    };
  },
  methods: {
    async onResult(result) {
      this.openQrModal(result);
    },
    async openQrModal(result) {
      // TODO: parse url, check if it's pointing to a correct backend
      const exists = await this.checkIfExists(result);
      if (exists) {
        this.$buefy.dialog.alert({
          title: 'Error',
          message: 'This QR-code is already registered',
          type: 'is-danger',
          hasIcon: true,
          ariaRole: 'alertdialog',
          ariaModal: true,
        });
      } else {
        await this.$router.push({ name: 'Register', params: { result } });
      }
    },
    async checkIfExists(decodedUrl) {
      const url = new URL(decodedUrl);
      const { data } = await this.$axios.get(`/exists${url.pathname}`);
      return data.exists;
    },
  },
};
</script>
