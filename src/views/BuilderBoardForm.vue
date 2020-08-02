<template>

  <builder-form class="builder-board-form">
    <template v-slot:default="{ form, onInput }">
      <v-text-field v-model="form.id" label="ID" readonly required />
      <v-text-field v-model="form.name" label="Name" required />

      <form-section-input label="Background">
        <builder-background-control v-model="form.background" />
      </form-section-input>

    </template>
  </builder-form>

</template>

<script>
  import BuilderBackgroundControl from "../components/BuilderBackgroundControl";
  import ConfirmButton from "../components/ConfirmButton";
  import BuilderForm from "../components/BuilderForm";
  import FormSectionInput from "../components/FormSectionInput";

  export default {
    name: 'builder-board-form',

    props: {},

    data() {
      return {

      }
    },

    methods: {
    },

    computed: {

    },

    components: {FormSectionInput, BuilderForm, ConfirmButton, BuilderBackgroundControl},
  };

</script>

<style lang="scss" scoped>

  .builder-board-form {

  }

</style>
