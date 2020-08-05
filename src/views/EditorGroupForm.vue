<template>

  <builder-form class="editor-group-form">
    <template v-if="groupModel">
      <v-text-field v-model="groupModel.id" label="ID" readonly required />
      <v-text-field v-model="groupModel.name" label="Name" required>
        <template v-slot:append-outer>
          <form-icon-toggle-input v-model="groupModel.name_visible"
                                  on-icon="mdi-eye"
                                  off-icon="mdi-eye-off"
                                  :tooltip="`The group name is ${(groupModel.name_visible ? 'visible' : 'hidden')}`" />
        </template>
      </v-text-field>
      <form-icon-input v-model="groupModel.icon"></form-icon-input>
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
