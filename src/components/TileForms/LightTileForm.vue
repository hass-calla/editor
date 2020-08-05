<template>

    <div class="light-tile-form">

        <form-section-input label="State Style" message="You can change the content and visibility for each state">

            <v-expansion-panels>
                <v-expansion-panel v-for="(state, index) in form.state_style" :key="index">
                    <v-expansion-panel-header>{{ state.state }}</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-text-field v-model="state.state" label="State" />
                        <form-icon-input v-model="state.icon" />
                        <form-color-input v-model="state.color" label="Color" fixed-size />
                        <form-color-input v-model="state.background" label="Background" fixed-size />

                        <div class="actions mt-2">
                            <confirm-button small outlined tile color="error" @click="deleteState(index)">
                                Delete
                            </confirm-button>
                        </div>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>

            <div class="actions mt-4">
                <v-btn small color="primary" @click="addState">
                    Add State
                </v-btn>
            </div>

        </form-section-input>

    </div>

</template>

<script>
    import TileForm from "../../mixins/TileForm";
    import FormSectionInput from "../FormSectionInput";
    import FormIconInput from "../FormIconInput";
    import FormColorInput from "../FormColorInput";
    import ConfirmButton from "../ConfirmButton";

    export default {
        name: 'light-tile-form',
        components: {ConfirmButton, FormColorInput, FormIconInput, FormSectionInput},
        mixins: [TileForm],

        data: () => ({

        }),

        methods: {
            addState() {
                this.form.stateStyle.push({
                    state: "",
                    color: "",
                    background: "",
                    icon: ""
                })
            },
            deleteState(index) {
                this.form.stateStyle.splice(index, 1);
            }
        },

        computed: {}

    };

</script>

<style lang="scss" scoped>

    .light-tile-form {

    }

    .actions {
        display: flex;
        justify-content: flex-end;
    }

</style>