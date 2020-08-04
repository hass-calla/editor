<template>

  <builder-form class="editor-board-form">
    <template v-if="boardModel">
      <v-text-field v-model="boardModel.id" label="ID" readonly required />
      <v-text-field v-model="boardModel.name" label="Name" required />

      <form-section-input label="Background">
        <builder-background-control v-model="boardModel.background" />
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
    name: 'editor-board-form',

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

  .editor-board-form {

  }

</style>
