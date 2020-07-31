export default {

  props: {
    value: [Array, Object, String, Boolean, Number]
  },

  data() {
    return {
      newValue: this.value,
    }
  },

  watch: {
    input() {
      this.newValue = this.value;
    }
  },

  methods: {

    onChange() {
      this.$emit('input', this.newValue);
    }

  },

}
