<template>

  <v-list-item class="app-menu-item" :to="itemLink">
    <v-list-item-content>
      <v-list-item-title>{{ name }}</v-list-item-title>
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
      name: String,
      id: [String, Number]
    },

    data: () => ({

    }),

    methods: {},

    computed: {

      itemLink() {
        let name = "board";
        const params = {
          ...this.$route.params
        };

        switch (this.currentObjectType) {
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
          case "board":
            name = "page";
            params.tileId = undefined;
            params.groupId = undefined;
            params.pageId = this.id;
            break;
          default:
            params.tileId = undefined;
            params.groupId = undefined;
            params.pageId = undefined;
            params.boardId = this.id;
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
