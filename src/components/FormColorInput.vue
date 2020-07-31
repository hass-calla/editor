<template>

  <div class="form-color-input" v-resize="updateSize">
    <v-menu :close-on-content-click="false">

      <template v-slot:activator="{ on, attrs }">
        <v-text-field v-model="newValue" :label="label" ref="input" v-on="on">
          <template v-slot:append>
            <div class="dot" :style="{'background-color': newValue}"></div>
          </template>
        </v-text-field>
      </template>

      <v-color-picker v-model="newValue"
                      :width="width"
                      v-if="showColor"
                      flat
                      @input="onChange"></v-color-picker>

    </v-menu>
  </div>

</template>

<script>

  export default {
    name: 'form-color-input',

    props: {
      value: [String, Object],
      label: {
        type: String,
        default: "Color"
      },
      fixedSize: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        showColor: false,
        width: 300,
        newValue: this.value,
      }
    },

    watch: {
      input() {
          this.newValue = this.value;
      }
    },

    methods: {
      updateSize() {
        this.showColor = false;

        this.$nextTick(() => {
          if(! this.$refs.input) {
            return;
          }

          if(! this.fixedSize) {
            this.width = this.$refs.input.$el.getBoundingClientRect().width;
          }
          this.showColor = true;
        });
      },

      onChange() {
        this.$emit('input', this.newValue);
      }

    },

    computed: {}

  };

</script>

<style lang="scss" scoped>

  .form-color-input {
    .dot {
      border-radius: 100%;
      width: 1.5em;
      height: 1.5em;
    }
  }

</style>
