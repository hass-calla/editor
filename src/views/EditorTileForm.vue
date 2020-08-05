<template>

  <builder-form class="editor-tile-form">
    <template v-if="tileModel">
      <v-text-field v-model="tileModel.id" label="ID" readonly required />

      <v-combobox :items="components"
                  v-model="tileModel.type"
                  :return-object="false"
                  :loading="loading"
                  @change="switchType($event)"
                  label="Tile Type" />

      <template v-if="! loading && component">
        <v-combobox v-model="tileModel.entity_id"
                    :items="entities"
                    label="Entity ID"
                    :return-object="false"
                    :multiple="component.multipleEntities"
                    :chips="component.multipleEntities" />

        <v-text-field v-model="tileModel.name" label="Name" :readonly="tileModel.sync_friendly_name" required>
          <template v-slot:append-outer>
            <form-icon-toggle-input v-model="tileModel.sync_friendly_name"
                                    :on-icon="$icons.byName(tileModel.hasEntity ? 'sync' : 'sync-alert')"
                                    :off-icon="$icons.byName('sync-off')"
                                    :tooltip="`Friendly Name Sync Is ${tileModel.sync_friendly_name ? 'On' : 'Off'}`" />
          </template>
        </v-text-field>

        <component :is="componentForm" v-model="tileModel"></component>

      </template>

    </template>
  </builder-form>

</template>

<script>
  import BuilderForm from "../components/BuilderForm";
  import FormIconInput from "../components/FormIconInput";
  import FormIconToggleInput from "../components/FormIconToggleInput";

  import {upperFirst} from 'lodash/string';

  export default {
    name: 'editor-tile-form',

    props: {},

    data() {
      return {
        loading: false
      }
    },

    mounted() {
      this.loadComponents();
    },

    methods: {
      async loadComponents() {
        this.loading = true;

        await this.$store.dispatch('loadComponents');

        this.loading = false;
      },

      toggleHeaderVisibility() {

      },

      switchType(type) {
        const component = this.$store.getters.component(type);

        if(! type || ! component) {
          return;
        }

        this.loading = true;

        this.tileModel.syncComponentForm({
          ...component.form
        })

        this.$nextTick(() => this.loading = false);
      }
    },

    computed: {

      components() {
        return this.$store.getters.components.map((c) => ({
          text: upperFirst((c.name || "").replace(/-/g, " ")),
          value: c.name
        }))
      },

      component() {
        if(! this.tileModel || ! this.tileModel.type) {
          return null;
        }

        return this.$store.getters.component(this.tileModel.type);
      },

      componentForm() {
        if(! this.tileModel || ! this.tileModel.type) {
          return null;
        }

        const name = `${this.tileModel.type}-tile-form`;

        if(! this.$options.components[name]) {
          return null;
        }

        return name;
      },

      entities() {
        const entities = this.$store.getters.entityNames.sort();
        let bucket = [];
        let lastDomain = "";

        for(let entity of entities) {
          const domain = entity.split(".")[0];

          if(lastDomain !== domain) {
            bucket.push({
              divider: true,
              header: (domain || "").replace(/_/g, " ")
            });

            lastDomain = domain;
          }

          bucket.push(entity);
        }

        return bucket;
      }
    },

    components: {FormIconToggleInput, FormIconInput, BuilderForm},
  };

</script>

<style lang="scss" scoped>

  .editor-tile-form {

  }

</style>
