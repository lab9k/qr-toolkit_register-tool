<template>
  <b-field  :label="val.name">
    <b-input v-if="val.type==='txt'"
             :placeholder="val.name"
             @input="$emit('input', $event)"></b-input>
    <div class="field" v-else-if="val.type==='bool'">
      <b-checkbox @input="$emit('input', $event)">{{ val.name }}</b-checkbox>
    </div>
  </b-field>
</template>

<script>
export default {
  name: 'ValueToFill',
  props: {
    val: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    let defaultValue;
    if (this.val.type === 'txt') {
      defaultValue = '';
    }
    if (this.val.type === 'bool') {
      defaultValue = false;
    }
    this.$emit('input', defaultValue);
  },
  computed: {},
};
</script>

<style scoped>

</style>
