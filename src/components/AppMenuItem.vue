<template>

  <v-list-item class="app-menu-item" :to="itemLink">
    <v-list-item-content>
      <v-list-item-title>{{ name }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>

</template>

<script>

  export default {
    name: 'app-menu-item',

    props: {
      name: String,
      id: [String, Number]
    },

    data: () => ({

    }),

    methods: {},

    computed: {

      itemLink() {
        let name = "device";
        const params = {
          ...this.$route.params
        };

        switch (this.currentBuilderType) {
          case "tile":
          case "group":
            name = "tile";
            params.tileId = this.id;
            break;
          case "page":
            name = "group";
            params.tileId = undefined;
            params.groupId = this.id;
            break;
          case "device":
            name = "page";
            params.tileId = undefined;
            params.groupId = undefined;
            params.pageId = this.id;
            break;
          default:
            params.tileId = undefined;
            params.groupId = undefined;
            params.pageId = undefined;
            params.deviceId = this.id;
            break;
        }

        return {
          name,
          params
        }
      }

    }

  };

</script>

<style lang="scss" scoped>

  .app-menu-item {

  }

</style>
