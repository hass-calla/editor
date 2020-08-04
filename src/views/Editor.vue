<template>
  <div class="editor">

    <template v-if="! loading">
      <div class="menu-section">
        <app-menu />
      </div>

      <div class="form-section">
        <router-view />
      </div>

      <div class="preview-section">PREVIEW</div>
    </template>

    <div class="loader" v-else>
      LOADING
    </div>

  </div>
</template>

<script>
  import AppMenu from "../components/AppMenu";

  export default {
    name: 'editor',

    data() {
      return {

      }
    },

    async mounted() {

    },

    methods: {

    },

    computed: {
      loading() {
        return ! this.$store.state.ready || ! this.$store.state.boardsLoaded;
      }
    },

    components: {AppMenu}
  };
</script>

<style lang="scss" scoped>

  .editor {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    height: calc(100vh - 64px);
    width: 100%;
    overflow: hidden;
  }

  .preview-section,
  .form-section,
  .menu-section {
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 100%;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 25%;
  }

  .form-section {
    border-left: 1px solid rgba(0, 0, 0, 0.12);
    border-right: 1px solid rgba(0, 0, 0, 0.12);
    background-color: rgba(0, 0, 0, 0.05);
  }

  .preview-section {
    flex-basis: 50%;
  }

</style>
