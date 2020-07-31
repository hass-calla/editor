<template>

  <v-tooltip :disabled="! clickedOnce" top>
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="{disabled, loading, block, small, light, elevation, depressed, tile}"
             :dark="clickedOnce || dark"
             :outlined="! clickedOnce && outlined"
             :light="! clickedOnce || light"
             v-on="on"
             @click="onClick"
             :color="computedColor">
        <template v-if="! clickedOnce">
          <slot></slot>
        </template>
        <template v-else>
          {{ confirmText }}
        </template>
      </v-btn>
    </template>
    <span>{{ confirmTooltip }}</span>
  </v-tooltip>

</template>

<script>

  export default {
    name: 'confirm-button',

    props: {
      disabled: Boolean,
      loading: Boolean,
      block: Boolean,
      elevation: Number,
      depressed: Boolean,
      small: Boolean,
      outlined: Boolean,
      tile: Boolean,
      dark: Boolean,
      light: Boolean,
      color: String,
      confirmColor: {
        type: String,
        default: "error"
      },
      confirmText: {
        type: [String],
        default: "Confirm",
      },
      confirmTooltip: {
        type: [String],
        default: "Click Again To Confirm",
      }
    },

    data: () => ({
      clickedOnce: false,
      timer: null,
    }),

    methods: {

      onClick() {
        if(! this.clickedOnce) {
          this.clickedOnce = true;

          this.timer = setTimeout(() => {
            this.timer = null;
            this.clickedOnce = false;
          }, 1500);

          return;
        }

        if(this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }

        this.$emit('click');
      }

    },

    computed: {
      computedColor() {
        if(this.clickedOnce) {
          return this.confirmColor;
        }

        return this.color;
      }
    }

  };

</script>

<style lang="scss" scoped>

  .confirm-button {

  }

</style>
