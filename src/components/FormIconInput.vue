<template>

  <v-autocomplete
    v-model="newValue"
    :items="icons"
    item-text="name"
    item-value="name"
    label="Icon"
    :filter="filter"
    :allow-overflow="false"
    clearable
    :prepend-inner-icon="$icons.byName((newValue || 'square'))">

    <template v-slot:item="{item}">
      <v-list-item-icon>
        <v-icon>{{ $icons.byName(item.name) }}</v-icon>
      </v-list-item-icon>
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

    data() {
      return {}
    },

    mounted() {
    },

    methods: {

      filter(item, queryText, itemText) {
        const name = item.name.toLowerCase();
        const aliases = (item.aliases || []).join(" ").toLowerCase();
        const searchText = queryText.toLowerCase();

        return name.indexOf(searchText) > -1 ||
          aliases.indexOf(searchText) > -1;
      }

    },

    computed: {

      icons() {
        return this.$icons.all();
      }

    }

  };

</script>

<style lang="scss" scoped>

  .form-icon-input {

  }

  .v-list-item__content {
    max-width: 400px;
  }

</style>
