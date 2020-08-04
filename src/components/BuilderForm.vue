<template>

  <v-form class="builder-form">

    <div class="pa-4 pb-16 builder-form-content">
      <slot></slot>
    </div>

    <v-container fluid class="py-1 builder-form-footer elevation-24">

      <v-row dense class="object-actions" justify="end">
        <v-col cols="auto">
          <confirm-button outlined small color="error" tile @click="deleteObject">
            Delete
          </confirm-button>
        </v-col>

        <slot name="actions"></slot>
      </v-row>
    </v-container>
  </v-form>

</template>

<script>
  import ConfirmButton from "./ConfirmButton";

  export default {
    name: 'builder-form',
    components: {ConfirmButton},
    props: {

    },

    data() {
      return {

      }
    },

    methods: {
      deleteObject() {
        this.$emit('delete');
        this.$root.$emit('menuGoBack');
      }
    },

    computed: {}

  };

</script>

<style lang="scss" scoped>

  .builder-form {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: hidden;

    &-content {
      flex-grow: 1;
      overflow: auto;
    }

  }

</style>
