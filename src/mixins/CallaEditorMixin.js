import Vue from 'vue';

const globalMixin = {
  data: () => ({
    builderTypes: ["board", "page", "group", "tile"],
    currentObjectType: "builder"
  }),

  watch: {
    $route() {
      this.updatecurrentObjectType();
    }
  },

  mounted() {
    this.updatecurrentObjectType();
  },

  methods: {
    updatecurrentObjectType() {
      this.currentObjectType = (this.$route.meta || {}).objectType;
    }
  },

  computed: {
    currentObjectId() {
      if(this.builderTypes.indexOf(this.currentObjectType) < 0) {
        return null;
      }

      return this.$route.params[`${this.currentObjectType}Id`];
    },

    currentObject() {
      if(! this.currentObjectId) {
        return null;
      }

      return this.$store.getters[this.currentObjectType](this.currentObjectId);
    },

    currentItemType() {
      switch(this.currentObjectType) {
        case "group":
        case "tile":
          return "tile";
        case "page":
          return "group";
        case "board":
          return "page";
        default:
          return "board";
      }
    },

  }
};

Vue.mixin(globalMixin);
