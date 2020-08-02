<template>

  <builder-form class="builder-tile-form" ref="builderForm">
    <template v-slot:default="{ form, onInput }">
      <v-text-field v-model="form.id" label="ID" readonly required />

      <v-combobox :items="components"
                  v-model="form.type"
                  :return-object="false"
                  :loading="loading"
                  @change="switchType($event, form)"
                  label="Tile Type" />

      <template v-if="! loading && component">
        <v-combobox v-model="form.entityId"
                    :items="entities"
                    label="Entity ID"
                    :return-object="false"
                    :multiple="component.multipleEntities"
                    :chips="component.multipleEntities" />

        <v-text-field v-model="form.name" label="Name" required />

        <component :is="componentForm" v-model="form"></component>

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
    name: 'builder-tile-form',

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

        this.$refs.builderForm.update({
          ...component.form,
          id: this.form.id,
          style: this.form.style,
          name: this.form.name
        });

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

      form() {
        return (this.$refs.builderForm || {}).form;
      },

      component() {
        if(! this.form || ! this.form.type) {
          return null;
        }

        return this.$store.getters.component(this.form.type);
      },

      componentForm() {
        if(! this.form || ! this.form.type) {
          return null;
        }

        const name = `${this.form.type}-tile-form`;

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

  .builder-tile-form {

  }

</style>
