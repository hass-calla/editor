<template>

  <div class="builder-background-control">
    <v-select :items="types"
              v-model="form.type"
              label="Background Type" />

    <form-color-input v-model="form.color" v-if="form.type === 'solid'"></form-color-input>

    <form-images-input v-model="form.images" v-else></form-images-input>

  </div>

</template>

<script>

  import FormColorInput from "./FormColorInput";
  import FormImagesInput from "./FormImagesInput";
  export default {
    name: 'builder-background-control',
    components: {FormImagesInput, FormColorInput},
    props: {
      value: Object
    },

    data() {
      return {
        form: this.value,
        types: [
          {
            text: "Solid Color",
            value: "solid"
          },
          {
            text: "Images",
            value: "images"
          }
        ]
      }
    },

    watch: {
      value() {
        this.form = this.value
      }
    },

    methods: {
      onChange() {
        this.$emit('input', this.form);
      }
    },

    computed: {}

  };

</script>

<style lang="scss" scoped>

  .builder-background-control {


  }

</style>
