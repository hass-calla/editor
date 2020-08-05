<template>

  <v-list-item class="app-menu-item" :to="item.link()">
    <v-list-item-content>
      <v-list-item-title>{{ item.name || "NO NAME" }}</v-list-item-title>
    </v-list-item-content>
    <v-list-item-action>
      <v-icon color="grey lighten-1">
        mdi-chevron-right
      </v-icon>
    </v-list-item-action>
  </v-list-item>

</template>

<script>

  export default {
    name: 'app-menu-item',

    props: {
      item: Object,
      id: [String, Number]
    },

    data() {
      return {

      }
    },

    methods: {},

    computed: {

    }

  };

</script>

<style lang="scss" scoped>

  .app-menu-item {

  }

</style>
