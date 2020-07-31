<template>

  <draggable class="form-images-input pb-4"
             v-model="newValue"
             draggable=".bg-image"
             :animation="200"
             @change="onChange"
             group="description">

    <div class="form-images-input-item bg-image pa-1" v-for="image in newValue" :key="image">
      <v-img :src="image" :aspect-ratio="aspectRatio" class="grey lighten-2" />
      <v-icon dense class="delete-button pa-2" small @click="deleteImage(image)" dark>mdi-delete</v-icon>
    </div>

    <div class="form-images-input-item pa-1">
      <v-responsive :aspect-ratio="aspectRatio">
        <v-btn class="ma-0 add-button" block color="secondary" @click="openDialog">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-responsive>
    </div>

    <file-upload-modal ref="dialog"></file-upload-modal>
  </draggable>

</template>

<script>
  import draggable from 'vuedraggable';
  import FileUploadModal from "./FileUploadModal";
  import FormInput from "../mixins/FormInput";

  export default {
    name: 'form-images-input',

    mixins: [FormInput],

    props: {
      value: Array
    },

    data() {
      return {
        aspectRatio: 19/9,
      }
    },

    methods: {

      openDialog() {
        this.$refs.dialog.open().then(url => {
          if(! url || this.newValue.indexOf(url) >= 0) {
            return;
          }

          this.newValue.push(url);
        });
      },

      deleteImage(image) {
        const index = this.newValue.indexOf(image);

        if(index < 0) {
          return;
        }

        this.newValue.splice(index, 1);

        this.onChange();
      }

    },

    computed: {},

    components: {FileUploadModal, draggable}

  };

</script>

<style lang="scss" scoped>

  .form-images-input {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 auto;

    &-item {
      flex: 0 0 33.3333333333%;
      max-width: 33.3333333333%;
      position: relative;

      .delete-button {
        position: absolute;
        left: 4px;
        top: 4px;
        background-color: var(--v-error-base);
        opacity: 0;
        cursor: pointer;
      }

      &:hover {
        .delete-button {
          opacity: 1;
        }
      }

    }

    .bg-image {
      cursor: grab;
    }

    .add-button {
      border-radius: 0;
      height: 100%;
    }

    .sortable-ghost {
      background-color: lightgray;

      .v-image {
        opacity: 0.5;
      }
    }

  }

</style>
