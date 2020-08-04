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

        <div class="app-menu-body" :style="bodyStyle">
            <v-list class="pl-0" v-if="! loadingItems && items.length > 0" shaped nav>
                <app-menu-item v-for="(item, i) in items"
                               :key="item.id"
                               :icon="item.icon"
                               :name="item.name"
                               :id="item.id"/>
            </v-list>

            <div class="no-items" v-if="itemsLoaded && items.length <= 0">
                <p>Create Your First {{ this.currentListObjectType }}</p>
                <v-icon>{{ $icons.byName('arrow-down-bold') }}</v-icon>
            </div>

            <div class="loader" v-if="loadingItems">
                LOADING
            </div>

        </div>

        <div class="app-menu-footer" ref="menuFooter">
            <v-btn color="primary"
                   @click="createObject"
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
                footerHeight: 0
            };
        },

        mounted() {
            this.$root.$on('menuGoBack', this.goBack);
        },

        methods: {

            createObject() {

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
        },

        asyncComputed: {
            items: {
                async get() {
                    if(this.currentObject) {
                        return await this.currentObject[this.currentListObjectType+'s']()
                    }

                    return [];
                },
                default () {
                    return []
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
