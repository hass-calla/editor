<template>

    <div class="app-menu">

        <div class="app-menu-header" ref="menuHeader">
            <v-toolbar color="primary" dark flat dense>
                <v-btn class="back-button" @click="goBack" icon>
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
                    {{ currentObject.name }}
                </v-toolbar-title>
            </v-toolbar>
        </div>

        <v-progress-linear class="loader" :active="loadingItems" color="secondary" indeterminate />

        <div class="app-menu-body" :class="{'list-is-empty': itemsLoaded && items.length <= 0 || loadingItems}" :style="bodyStyle">
            <v-list class="pl-0" v-if="! loadingItems && items.length > 0" shaped nav>
                <app-menu-item v-for="(item, i) in items"
                               :key="item.id"
                               :item="item" />
            </v-list>

            <div class="no-items" v-if="itemsLoaded && items.length <= 0">
                <p class="title text-h5">No {{ this.currentListObjectType }}s Found</p>
                <p class="subtitle text-body-1">Create Your First {{ this.currentListObjectType }}</p>
                <v-icon x-large color="black">{{ $icons.byName('arrow-down-bold') }}</v-icon>
            </div>
        </div>

        <div class="app-menu-footer" ref="menuFooter">
            <v-btn color="primary"
                   @click="createObject"
                   :loading="creating"
                   :disabled="loadingItems"
                   large depressed
                   tile block>
                <v-icon left>mdi-plus</v-icon>
                Add {{ this.currentListObjectType }}
            </v-btn>
        </div>
    </div>

</template>

<script>
    import AppMenuItem from "./AppMenuItem";
    import {camelCase} from 'lodash/string';
    import Board from "../models/Board";
    import Page from "../models/Page";
    import Group from "../models/Group";
    import Tile from "../models/Tile";

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

        data() {
            return {
                headerHeight: 0,
                footerHeight: 0,
                creating: false,
                items: []
            };
        },

        mounted() {
            this.$root.$on('menuGoBack', this.goBack);
        },

        watch: {
            currentObject: {
                immediate: true,
                async handler() {
                    await this.$nextTick();
                    await this.fetchItems();
                }
            }
        },

        methods: {

            async fetchItems() {

                if(this.currentObject instanceof Board) {
                    this.items = await this.currentObject.pages();
                }

                else if(this.currentObject instanceof Page) {
                    this.items = await this.currentObject.groups();
                }

                else if(this.currentObject instanceof Group) {
                    this.items = await this.currentObject.tiles();
                }

                else if(this.currentObject instanceof Tile) {
                    this.items = await this.currentObject.parent.tiles();
                }

            },

            async createObject() {
                this.creating = true;
                const object = await this.currentObject[camelCase(`new_${this.currentListObjectType}`)]();
                this.creating = false;

                this.$router.push(object.link());
            },

            goBack() {
                if(this.displayIndex <= 0) {
                    this.$router.replace({
                        name: 'boards',
                    });

                    return;
                }

                this.$router.replace({
                    name: this.builderTypes[this.displayIndex - 1],
                    params: {
                        ...this.$route.params
                    }
                });
            }

        },

        computed: {

            bodyStyle() {
                return {
                    height: `calc(100% - ${(this.headerHeight + this.footerHeight)}px)`,
                };
            },

            breadcrumbs() {
                let items = [
                    {
                        text: 'Boards',
                        disabled: this.displayIndex < 0,
                        to: {
                            name: 'boards',
                            params: {}
                        },
                    }
                ];

                if(this.displayIndex < 0) {
                    return items;
                }

                for(let type of this.builderTypes) {
                    const isActive = type === this.displayedObjectType;

                    items.push({
                        text: breadcrumbsMap[type],
                        disabled: isActive,
                        to: {
                            name: type,
                            params: this.$route.params
                        }
                    });

                    if(isActive) {
                        break;
                    }
                }

                return items;
            },

            loadingItems() {
                return ! this.currentObject || this.currentObject.loading;
            },

            itemsLoaded() {
                return this.currentObject && this.currentObject.loaded;
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

    .list-is-empty {
        display: flex;
    }

    .no-items {
        justify-self: center;
        align-self: center;
        text-align: center;
        width: 100%;

        .subtitle,
        .title {
            text-transform: capitalize;
            margin-bottom: 0;
        }

    }

    .loader {
        width: 100%;
    }

</style>
