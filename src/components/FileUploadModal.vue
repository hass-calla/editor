<template>

  <v-dialog class="file-upload-modal"
            max-width="450px"
            persistent
            v-model="dialog">
    <v-card>
      <v-card-title class="headline">Upload Image OR Enter Image URL</v-card-title>
      <v-card-text>
        <v-form>
          <v-file-input v-model="file"
                        label="Upload"
                        prepend-icon="mdi-upload"
                        @change="fileSelected"
                        clearable />

          <v-subheader>OR</v-subheader>

          <v-text-field label="URL"
                        v-model="url"
                        prepend-icon="mdi-link"
                        autofocus
                        @input="urlChanged"
                        clearable />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="close" :disabled="loading">Cancel</v-btn>
        <v-btn color="success" text @click="save" :loading="loading" :disabled="saveDisabled">Done</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>

  export default {
    name: 'file-upload-modal',

    props: {},

    data: () => ({
      loading: false,
      file: null,
      url: "",
      dialog: false,
      openResolve: null,
      openReject: null,
    }),

    methods: {

      fileSelected() {
        if(! this.file) {
          return;
        }

        this.url = "";
      },

      urlChanged() {
        if(! this.url) {
          return;
        }

        this.file = null;
      },

      open() {
        this.dialog = true;

        if(typeof this.openResolve === 'function') {
          if(typeof this.openReject === 'function') {
            this.openReject(new Error("Dialog Already Open"));
          }

          this.openResolve = null;
          this.openReject = null;
        }

        const promise = new Promise((resolve, reject) => {
          this.openResolve = resolve;
          this.openReject = reject;
        });

        this.$emit('open', promise);

        return promise;
      },

      close(resolve = true) {
        this.dialog = false;
        this.closed(resolve);
      },

      closed(resolve = true) {
        if(resolve && this.openResolve) {
          this.openResolve();
        }

        this.openResolve = null;
        this.openReject = null;
        this.file = null;
        this.url = null;
      },

      async save() {
        if(! this.file && ! this.url) {
          return;
        }

        this.loading = true;
        let url = this.url;

        if(this.file) {
          url = await this.upload();
        }

        this.$emit('saved', url);
        this.openResolve(url);

        this.close(false);

        this.loading = false;
      },

      upload() {
        return new Promise(resolve => {
          setTimeout(() => resolve("/path/to/image.jpg"), 2300);
        })
      }

    },

    computed: {
      saveDisabled() {
        return (! this.file && ! this.url) || this.loading;
      }
    }

  };

</script>

<style lang="scss" scoped>

  .file-upload-modal {

  }

</style>
