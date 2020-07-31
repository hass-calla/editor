<template>
  <div class="builder">

    <div class="menu-section">
      <app-menu></app-menu>
    </div>

    <div class="form-section">
      <router-view></router-view>
    </div>

    <div class="preview-section">
      PREVIEW
    </div>
  </div>
</template>

<script>
  import AppMenu from "../components/AppMenu";

  export default {
    name: 'Builder',

    data: () => ({



    }),

    components: {AppMenu}
  };
</script>

<style lang="scss" scoped>

  .builder {
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
