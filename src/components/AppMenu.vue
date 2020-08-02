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
                <span class="text--lighten-2">{{ item.text }}</span>
              </v-breadcrumbs-item>
            </template>
          </v-breadcrumbs>
        </div>
      </v-toolbar>
      <v-toolbar color="primary" dark flat dense>
        <v-toolbar-title v-if="currentObject">
          {{ currentObject.name }} <small>({{ currentObjectType }})</small>
        </v-toolbar-title>
      </v-toolbar>
    </div>

    <div class="app-menu-body" :style="bodyStyle">
      <v-list class="pl-0" shaped nav>
        <app-menu-item v-for="(item, i) in items"
                       :key="item.id"
                       :icon="item.icon"
                       :name="item.name"
                       :id="item.id"/>
      </v-list>
    </div>

    <div class="app-menu-footer" ref="menuFooter">
      <v-btn color="primary"
             @click="createObject"
             large depressed
             tile block>
        <v-icon left>mdi-plus</v-icon>
        Add {{ this.currentItemType }}
      </v-btn>
    </div>
  </div>

</template>

<script>
  import AppMenuItem from "./AppMenuItem";

  const breadcrumbsMap = {
    'editor': 'Boards',
    'board': 'Pages',
    'page': 'Groups',
    'group': 'Tiles',
    'tile': 'Tiles'
  };

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

      createObject() {
        let relatedObjectId = '';

        switch(this.currentObjectType) {
          case "tile":
          case "group":
            relatedObjectId = this.$route.params.groupId;
            break;
          case "page":
            relatedObjectId = this.$route.params.pageId;
            break;
          case "board":
            relatedObjectId = this.$route.params.boardId;
            break;
        }

        this.$emit('createClicked', {type: this.currentItemType, relatedObjectId})
      },

      goBack() {
        if(this.builderTypes.indexOf(this.currentObjectType) <= 0) {
          this.$router.replace({
            name: 'editor',
          });

          return;
        }

        this.$router.replace({
          name: this.builderTypes[this.builderTypes.indexOf(this.currentObjectType) - 1],
          params: {
            ...this.$store.params
          }
        });
      }

    },

    computed: {
      backButtonIsActive() {
        return this.builderTypes.indexOf(this.currentObjectType) >= 0;
      },

      bodyStyle() {
        return {
          height: `calc(100% - ${(this.headerHeight + this.footerHeight)}px)`,
        };
      },

      breadcrumbs() {
        let items = [
          {
            text: 'Boards',
            disabled: this.builderTypes.indexOf(this.currentObjectType) < 0,
            to: {
              name: 'editor',
              params: {}
            },
          }
        ];

        if(this.builderTypes.indexOf(this.currentObjectType) < 0) {
          return items;
        }

        for(let type of this.builderTypes) {
          items.push({
            text: breadcrumbsMap[type],
            disabled: type === this.currentObjectType,
            to: {
              name: type,
              params: this.$route.params
            }
          });

          if(type === this.currentObjectType) {
            break;
          }
        }

        return items;
      },

      items() {
        return this.$store.getters[`${this.currentItemType}s`];
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
