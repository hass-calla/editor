import Vue from 'vue';

const globalMixin = {
  data: () => ({
    builderTypes: ["device", "page", "group", "tile"],
    currentBuilderType: "builder"
  }),

  watch: {
    $route() {
      this.updateCurrentBuilderType();
    }
  },

  mounted() {
    this.updateCurrentBuilderType();
  },

  methods: {
    updateCurrentBuilderType() {
      if(! this.$route) {
        return;
      }

      if(this.builderTypes.indexOf(this.$route.name) >= 0) {
        this.currentBuilderType = this.$route.name;
        return;
      }

      this.currentBuilderType = "builder";
    }
  },

  computed: {
    currentObjectId() {
      if(this.builderTypes.indexOf(this.currentBuilderType) < 0) {
        return null;
      }

      return this.$route.params[`${this.currentBuilderType}Id`];
    },

    currentObject() {
      if(! this.currentObjectId) {
        return null;
      }

      return this.$store.getters[this.currentBuilderType](this.currentObjectId);
    },

  }
};

Vue.mixin(globalMixin);
