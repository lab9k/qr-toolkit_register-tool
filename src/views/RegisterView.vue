<template>
  <div class="container">
    <h1 class="title">Register Qr-code</h1>
    <p>{{ result }}</p>
    <b-field label="Category">
      <b-select placeholder="Select a category"
                :loading="loading"
                expanded
                v-model="selectedCategory"
      >
        <option
          v-for="cat in categories"
          :value="cat"
          :key="cat.id">
          {{ cat.name }}
        </option>
      </b-select>
    </b-field>
    <b-field label="Values" />
    <p>These are the pre-filled values for the qr-code, only fill in the ones that never change.</p>
    <value-to-fill v-for="(val, it) in valuesToFill"
                   :key="val.id"
                   @input="updateFilledValue($event, it)"
                   :val="val" />
    <b-button v-if="selectedCategory" type="submit" @click="submitCode">Submit code</b-button>
  </div>
</template>

<script>
import ValueToFill from '@/components/ValueToFill.vue';

export default {
  name: 'RegisterView',
  components: { ValueToFill },
  props: {
    result: {
      type: String,
      default: process.env.NODE_ENV === 'development' ? 'http://localhost:8000/roads-google-form' : undefined,
    },
  },
  data() {
    return {
      categories: [],
      loading: true,
      selectedCategory: null,
      valuesToFill: [],
      filled_results: [],
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      const { data } = await this.$axios.get('/category');
      this.categories = [...data];
      this.loading = false;
    },
    buildValues(category) {
      this.valuesToFill = [...category.values_to_fill];
    },
    updateFilledValue(value, it) {
      this.filled_results[it] = value;
    },
    submitCode() {
      const values = this.filled_results;
      const identifier = new URL(this.result).pathname;

      console.log({ values, identifier, category: this.selectedCategory });
    },
  },
  watch: {
    selectedCategory: {
      handler(newValue) {
        this.buildValues(newValue);
      },
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 1rem;
}
</style>
