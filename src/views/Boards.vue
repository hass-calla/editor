<template>

    <v-container class="boards grey lighten-5">

        <div class="welcome my-10 text-center">

            <h1 class="text-h2">
                Welcome To The
                <span class="logo-style">Calla<span>Editor</span></span>
            </h1>

            <h2 class="text-h5">
                Start Creating Beautiful
                <span class="logo-style">Calla<span>Boards</span></span>
            </h2>

            <div class="action my-10" v-if="boards.length <= 0">
                <v-btn rounded large
                       color="secondary"
                       @click="createBoard"
                       :loading="creating">
                    Create Your First Board
                </v-btn>
            </div>

        </div>

        <v-row v-if="boards.length > 0">
            <template v-for="board in boards">
                <v-col :key="board.id" :cols="6" :md="4" :lg="3">
                    <v-hover>
                        <template v-slot="{ hover }">
                            <v-card class="pa-0 board transition-swing"
                                    dark
                                    :style="boardStyle(board)"
                                    @click="goToBoard(board)"
                                    :elevation="hover ? 24 : 6">
                                <v-responsive :aspect-ratio="16/9">
                                    <v-card-text class="board-body">
                                        <p class="board-name body-1">
                                            {{ board.name }}
                                        </p>

                                        <div class="statistics">
                                            <div class="item">
                                                <span class="value">4</span>
                                                <span class="label">Pages</span>
                                            </div>

                                            <div class="item">
                                                <span class="value">15</span>
                                                <span class="label">Groups</span>
                                            </div>

                                            <div class="item">
                                                <span class="value">150</span>
                                                <span class="label">Tiles</span>
                                            </div>
                                        </div>

                                    </v-card-text>
                                </v-responsive>
                            </v-card>
                        </template>
                    </v-hover>
                </v-col>
            </template>

            <v-col :cols="6" :md="4" :lg="3">
                <v-btn block
                       height="100%"
                       dark
                       class="create-button"
                       @click="createBoard"
                       :loading="creating"
                       color="secondary">
                    <v-icon class="mb-4" x-large>{{ $icons.byName('plus-box') }}</v-icon>
                    <span class="body-1 ma-0">New Board</span>
                </v-btn>
            </v-col>

        </v-row>
    </v-container>

</template>

<script>

    import Board from "../models/Board";

    export default {
        name: 'boards',

        props: {},

        data() {
            return {
                creating: false,
            }
        },

        methods: {

            goToBoard(board) {
                this.$router.replace({
                    name: 'board',
                    params: {boardId: board.id}
                });
            },

            async createBoard() {
                this.creating = true;

                const board = await Board.create();

                this.$store.commit('pushBoard', board);
                this.goToBoard(board);

                this.creating = false;
            },

            boardStyle(board) {
                if(board.background.type === 'solid' || board.background.images.length <= 0) {
                    return {
                        backgroundColor: board.background.color
                    }
                }

                return {
                    backgroundImage: `url(${board.background.images[0]})`
                }
            }

        },

        computed: {
            boards() {
                return this.$store.getters.boards;
            }
        }

    };

</script>

<style lang="scss" scoped>

    .boards {

        .welcome {
            .text-h5,
            .text-h2 {
                font-family: "MuseoModerno", "Roboto", sans-serif !important;
            }

            .text-h2 {
                font-weight: 200;
            }

            .logo-style {
                white-space: nowrap;

                span {
                    color: var(--v-primary-base);
                }
            }

        }

    }

    .create-button ::v-deep .v-btn__content {
        flex-direction: column;
    }

    .board {
        cursor: pointer;
        background-position: center;
        background-size: cover;

        .board-body {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background: rgb(0,0,0);
            background: linear-gradient(0deg, rgba(0,0,0,0.4) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.4) 100%);
        }

        .statistics {
            display: flex;
            justify-content: space-between;

            .item {
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;

                .value {
                    font-size: 2em;
                }

                .label {
                    font-size: 0.8em;
                    font-weight: 300;
                }

            }

        }

    }

</style>