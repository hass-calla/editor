<template>

  <div class="form-section-input pt-4">
    <div class="form-section-input-header mb-4">
      <div class="text">
        <h3 class="label">{{ label }}</h3>
        <p class="message" v-if="message">{{ message }}</p>
      </div>

      <div class="toggle" v-if="hasToggle">
        <v-switch v-model="newValue"
                  @change="onChange"
                  class="mt-0 pt-0"
                  hide-details />
      </div>
    </div>

    <div class="form-section-input-body" v-if="contentIsActive">
      <slot></slot>
    </div>
  </div>

</template>

<script>

  import FormInput from "../mixins/FormInput";

  export default {
    name: 'form-section-input',

    mixins: [FormInput],

    props: {
      value: Boolean,
      hasToggle: Boolean,
      label: String,
      message: String,
    },

    data: () => ({

    }),

    methods: {},

    computed: {

      contentIsActive() {
        return (! this.hasToggle) || this.value;
      }

    }

  };

</script>

<style lang="scss" scoped>

  .form-section-input {
    min-height: 48px;
    border-top: 1px solid rgba(0, 0, 0, 0.12);
    flex-grow: 1;

    &-header {
      display: flex;
      font-size: 0.8em;
      align-items: center;

      .text {
        flex-grow: 1;
      }

      .label {
        font-weight: 500;
      }

      .toggle {
        flex-shrink: 0;
        flex-grow: 0;
      }

      .message {
        margin-bottom: 0;
        line-height: 1.1;
        color: rgba(0, 0, 0, 0.5);
      }

    }

  }

</style>
