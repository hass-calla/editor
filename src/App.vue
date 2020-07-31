<template>
  <v-app>
    <v-app-bar class="app-header" flat app>
      <logo></logo>
    </v-app-bar>

    <v-main class="application-main" app>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  import Logo from "./components/Logo";
  export default {
    name: 'App',

    data: () => ({

    }),

    components: {
      Logo

    },

  }
</script>

<style lang="scss" scoped>

  .application-main {
    display: flex;
    flex-direction: column;
  }

  .app-header {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
  }

</style>
