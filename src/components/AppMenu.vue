<template>

  <div class="app-menu">

    <div class="app-menu-header" ref="menuHeader">
      <v-toolbar color="primary" dark flat dense>
        <v-btn class="back-button" @click="goBack" v-if="backButtonIsActive" icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <div class="breadcrumbs">
          <v-breadcrumbs class="pa-0" :items="breadcrumbs" dark>
            <template v-slot:item="{ item }">
              <v-breadcrumbs-item :to="item.to" ripple exact>
              <span class="text--lighten-2">
                {{ item.text }}
              </span>
              </v-breadcrumbs-item>
            </template>
          </v-breadcrumbs>
        </div>
      </v-toolbar>
      <v-toolbar color="primary" dark flat dense>
        <v-toolbar-title>Title</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="back-button" icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-toolbar>
    </div>

    <div class="app-menu-body" :style="bodyStyle">
      <v-list shaped flat>
        <app-menu-item v-for="(item, i) in items"
                       :key="item.id"
                       :name="item.name"
                       :id="item.id"/>
      </v-list>
    </div>

    <div class="app-menu-footer" ref="menuFooter">
      <v-btn color="primary" large depressed tile block>
        <v-icon left>mdi-plus</v-icon>
        New Device
      </v-btn>
    </div>
  </div>

</template>

<script>
  import AppMenuItem from "./AppMenuItem";

  export default {
    name: 'app-menu',

    components: {AppMenuItem},

    props: {},

    data: () => ({
      headerHeight: 0,
      footerHeight: 0,
    }),

    mounted() {
      this.$root.$on('menuGoBack', this.goBack);
    },

    methods: {

      goBack() {
        if(this.builderTypes.indexOf(this.currentBuilderType) <= 0) {
          this.$router.replace({
            name: 'builder',
          });

          return;
        }

        this.$router.replace({
          name: this.builderTypes[this.builderTypes.indexOf(this.currentBuilderType) - 1],
          params: {
            ...this.$store.params
          }
        });
      }

    },

    computed: {
      backButtonIsActive() {
        return this.builderTypes.indexOf(this.currentBuilderType) >= 0;
      },

      bodyStyle() {
        return {
          height: `calc(100% - ${(this.headerHeight + this.footerHeight)}px)`,
        };
      },

      breadcrumbs() {
        let items = [
          {
            text: 'Builder',
            disabled: this.builderTypes.indexOf(this.currentBuilderType) < 0,
            to: {
              name: 'builder',
              params: {}
            },
          }
        ];

        if(this.builderTypes.indexOf(this.currentBuilderType) < 0) {
          return items;
        }

        for(let type of this.builderTypes) {
          items.push({
            text: type,
            disabled: type === this.currentBuilderType,
            to: {
              name: type,
              params: this.$route.params
            }
          });

          if(type === this.currentBuilderType) {
            break;
          }
        }

        return items;
      },

      items() {
        switch(this.currentBuilderType) {
          case "group":
          case "tile":
            return this.$store.getters.tiles;
          case "page":
            return this.$store.getters.groups;
          case "device":
            return this.$store.getters.pages;
          default:
            return this.$store.getters.devices;
        }
      }
    }

  };

</script>

<style lang="scss" scoped>

  .app-menu {
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    &-body {
      flex-grow: 1;
      overflow: auto;
      height: 100%;
    }

  }

  .breadcrumbs {
    ::v-deep {
      a {
        color: var(--v-gray-lighten5);
      }
    }
  }

</style>
