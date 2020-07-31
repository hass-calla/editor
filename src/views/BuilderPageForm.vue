<template>

  <builder-form class="builder-page-form">
    <template v-slot:default="{ form, onInput }">
      <v-text-field v-model="form.id" label="ID" readonly required />
      <v-text-field v-model="form.name" label="Name" required />
      <form-icon-input v-model="form.icon"></form-icon-input>

      <form-section-input label="Background"
                          message="The page background will override the device background"
                          v-model="form.background.active" has-toggle>
        <builder-background-control v-model="form.background" />
      </form-section-input>
    </template>
  </builder-form>

</template>

<script>
  import BuilderBackgroundControl from "../components/BuilderBackgroundControl";
  import ConfirmButton from "../components/ConfirmButton";
  import BuilderForm from "../components/BuilderForm";
  import FormIconInput from "../components/FormIconInput";
  import FormSectionInput from "../components/FormSectionInput";

  export default {
    name: 'builder-page-form',

    props: {},

    data() {
      return {

      }
    },

    methods: {
    },

    computed: {

    },

    components: {FormSectionInput, FormIconInput, BuilderForm, ConfirmButton, BuilderBackgroundControl},
  };

</script>

<style lang="scss" scoped>

  .builder-page-form {

  }

</style>
