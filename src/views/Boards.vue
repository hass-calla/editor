<template>

    <v-container class="grey lighten-5">
        <v-row no-gutters>
            <template v-for="n in 8">
                <v-col :key="n">
                    <v-card class="pa-2" outlined tile>Column</v-card>
                </v-col>
                <v-responsive v-if="n === 4" :key="`width-${n}`" width="100%">

                </v-responsive>
            </template>
        </v-row>
    </v-container>

</template>

<script>

    export default {
        name: 'boards',

        props: {},

        data: () => ({

        }),

        methods: {},

        computed: {}

    };

</script>

<style lang="scss" scoped>

    .boards {

    }

</style>