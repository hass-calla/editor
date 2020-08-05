<template>

  <builder-form class="editor-page-form">
    <template v-if="pageModel">
      <v-text-field v-model="pageModel.id" label="ID" readonly required />
      <v-text-field v-model="pageModel.name" label="Name" required />
      <form-icon-input v-model="pageModel.icon"></form-icon-input>

      <form-section-input label="Background"
                          message="The page background will override the device background"
                          v-model="pageModel.background.active" has-toggle>
        <builder-background-control v-model="pageModel.background" />
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
    name: 'editor-page-form',

    props: {},

    data() {
      return {

      }
    },

    mounted() {
      console.log(this.pageModel);
    },

    methods: {
    },

    computed: {

    },

    components: {FormSectionInput, FormIconInput, BuilderForm, ConfirmButton, BuilderBackgroundControl},
  };

</script>

<style lang="scss" scoped>

  .editor-page-form {

  }

</style>
