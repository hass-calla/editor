<template>

  <v-autocomplete
    v-model="newValue"
    :items="icons"
    :loading="loading"
    :readonly="loading"
    item-text="name"
    item-value="name"
    label="Icon"
    :filter="filter"
    :allow-overflow="false"
    clearable
    :prepend-inner-icon="`mdi-${(newValue || 'square')}`">

    <template v-slot:item="{item}">
      <v-list-item-avatar>
        <v-icon>mdi-{{ item.name }}</v-icon>
      </v-list-item-avatar>
      <v-list-item-content :title="(item.aliases || []).join(', ')">
        <v-list-item-title>{{ item.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ (item.aliases || []).join(", ") }}</v-list-item-subtitle>
      </v-list-item-content>
    </template>

  </v-autocomplete>

</template>

<script>

  import FormInput from "../mixins/FormInput";

  export default {
    name: 'form-icon-input',

    mixins: [FormInput],

    props: {
      value: String
    },

    data: () => ({
      loading: false,
      icons: []
    }),

    mounted() {
      this.fetch();
    },

    methods: {

      filter(item, queryText, itemText) {
        const name = item.name.toLowerCase();
        const aliases = (item.aliases || []).join(" ").toLowerCase();
        const searchText = queryText.toLowerCase();

        return name.indexOf(searchText) > -1 ||
          aliases.indexOf(searchText) > -1;
      },

      async fetch() {
        this.loading = true;

        const res = await fetch("/api/v1/icons", {
          "headers": {
            "accept": "application/json",
          },
          "body": null,
          "method": "GET",
          "mode": "cors"
        });

        this.icons = await res.json();
        this.loading = false;
      },

    },

    computed: {}

  };

</script>

<style lang="scss" scoped>

  .form-icon-input {

  }

  .v-list-item__content {
    max-width: 400px;
  }

</style>
