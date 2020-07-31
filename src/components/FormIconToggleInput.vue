<template>

  <v-tooltip :disabled="! tooltip" top class="form-icon-toggle-input">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on" @click="toggle">
        <v-icon>{{ newValue ? onIcon : offIcon }}</v-icon>
      </v-btn>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>

</template>

<script>
  import FormInput from "../mixins/FormInput";

  export default {
    name: 'form-icon-toggle-input',

    mixins: [FormInput],

    props: {
      onIcon: String,
      offIcon: String,
      tooltip: String,
      value: Boolean
    },

    data: () => ({

    }),

    methods: {
      toggle() {
        this.newValue = ! this.newValue;
        this.onChange();
      }
    },

    computed: {}

  };

</script>

<style lang="scss" scoped>

  .form-icon-toggle-input {

  }

</style>
