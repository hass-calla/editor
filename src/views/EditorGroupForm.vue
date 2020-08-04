<template>

  <builder-form class="editor-group-form">
    <template v-slot:default="{ form, onInput }">
      <v-text-field v-model="form.id" label="ID" readonly required />
      <v-text-field v-model="form.name" label="Name" required>
        <template v-slot:append-outer>
          <form-icon-toggle-input v-model="form.nameVisible"
                                  on-icon="mdi-eye"
                                  off-icon="mdi-eye-off"
                                  :tooltip="`The group name is ${(form.nameVisible ? 'visible' : 'hidden')}`" />
        </template>
      </v-text-field>
      <form-icon-input v-model="form.icon"></form-icon-input>
    </template>
  </builder-form>

</template>

<script>
  import BuilderForm from "../components/BuilderForm";
  import FormIconInput from "../components/FormIconInput";
  import FormIconToggleInput from "../components/FormIconToggleInput";

  export default {
    name: 'editor-page-form',

    props: {},

    data() {
      return {

      }
    },

    methods: {
      toggleHeaderVisibility() {

      }
    },

    computed: {

    },

    components: {FormIconToggleInput, FormIconInput, BuilderForm},
  };

</script>

<style lang="scss" scoped>

  .editor-page-form {

  }

</style>
